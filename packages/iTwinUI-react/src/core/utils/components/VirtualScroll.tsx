/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';

const getScrollableParent = (
  element: HTMLElement | null,
  ownerDocument: Document = document,
): HTMLElement => {
  if (!element || element === ownerDocument.body) {
    return ownerDocument.body;
  }

  return isElementScrollable(element)
    ? element
    : getScrollableParent(element.parentElement, ownerDocument);
};

const isElementScrollable = (element: HTMLElement) => {
  return /(auto|scroll|overlay)/.test(
    getElementStyle(element, 'overflow') +
      getElementStyle(element, 'overflow-y'),
  );
};

const getElementStyle = (element: HTMLElement, prop: string) => {
  return getComputedStyle(element, null).getPropertyValue(prop);
};

const getElementHeight = (element: HTMLElement | undefined) => {
  return element?.getBoundingClientRect().height ?? 0;
};

const getNumberOfNodesInHeight = (childHeight: number, totalHeight: number) => {
  if (!childHeight) {
    return 0;
  }

  return Math.floor(totalHeight / childHeight);
};

const getTranslateValue = (childHeight: number, startIndex: number) => {
  return childHeight * startIndex;
};

const getVisibleNodeCount = (
  childHeight: number,
  startIndex: number,
  childrenLength: number,
  scrollContainer: HTMLElement,
) => {
  return Math.min(
    childrenLength - startIndex,
    getNumberOfNodesInHeight(childHeight, getElementHeight(scrollContainer)),
  );
};

export type VirtualScrollProps = {
  /**
   * Length of the items to virtualize.
   */
  itemsLength: number;
  /**
   * Single item render function, which gives index of the item (0 based) in the data array
   * and expects to get the JSX of that element to render.
   * Recommended to memoize the reference of the function.
   */
  itemRenderer: (index: number) => JSX.Element;
  /**
   * Number of items to be rendered at the start and the end.
   * Not recommended to go lower than the visible items in viewport.
   * @default 10
   */
  bufferSize?: number;
} & React.ComponentPropsWithRef<'div'>;

/**
 * `VirtualScroll` component is used to render a huge amount of items in the DOM. It renders only the ones which are visible
 * and the amount provided through `bufferSize` prop at the start and the end. Can be used inside other components like `Table`.
 *
 * It has two wrapper elements, so DOM will be changed. One is used for setting full expected height in the scrollable container
 * and other is for transformation (translateY) to show the correct part of the list.
 *
 * Currently it works only with the direct vertically scrollable parent element. It does not work with body scroll.
 * It supports only static (same) height rows virtualization. Expect some issues, if list consists of different height elements.
 * @example
 * const itemRenderer = React.useCallback(() => (
 *  <div key={index}>
 *    This is my item #{index}
 *  </div>
 * ), [])
 * <VirtualScroll
 *  itemsLength={1000}
 *  itemRenderer={itemRenderer}
 * />
 * @private
 */
export const VirtualScroll = React.forwardRef<
  HTMLDivElement,
  VirtualScrollProps
>(({ itemsLength, itemRenderer, bufferSize = 10, style, ...rest }, ref) => {
  const [startNode, setStartNode] = React.useState(0);
  const [visibleNodeCount, setVisibleNodeCount] = React.useState(0);
  const scrollContainer = React.useRef<HTMLElement>();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childHeight = React.useRef(0);
  const onScrollRef = React.useRef<(e: Event) => void>();
  // Used only to recalculate on resize
  const [scrollContainerHeight, setScrollContainerHeight] = React.useState(0);

  const onResize = React.useCallback(({ height }) => {
    setScrollContainerHeight(height);
  }, []);
  const [resizeRef] = useResizeObserver(onResize);

  // Find scrollable parent
  // Needed only on init
  React.useLayoutEffect(() => {
    const scrollableParent = getScrollableParent(
      parentRef.current,
      parentRef.current?.ownerDocument,
    );
    scrollContainer.current = scrollableParent;

    resizeRef(scrollableParent);
  }, [resizeRef]);

  const visibleChildren = React.useMemo(() => {
    const arr = [];
    const endIndex = Math.min(
      itemsLength,
      startNode + visibleNodeCount + bufferSize * 2,
    );
    for (let i = startNode; i < endIndex; i++) {
      arr.push(itemRenderer(i));
    }
    return arr;
  }, [itemsLength, itemRenderer, bufferSize, startNode, visibleNodeCount]);

  // Get child height when children available
  React.useLayoutEffect(() => {
    if (!parentRef.current || !visibleChildren.length) {
      return;
    }

    const firstChild = parentRef.current.children.item(0) as HTMLElement;
    childHeight.current = Number(getElementHeight(firstChild).toFixed(2));
  }, [visibleChildren.length]);

  const updateVirtualScroll = React.useCallback(() => {
    const scrollableContainer =
      scrollContainer.current ??
      (parentRef.current?.ownerDocument.scrollingElement as HTMLElement);
    if (!scrollableContainer) {
      return;
    }
    const start = getNumberOfNodesInHeight(
      childHeight.current,
      scrollableContainer.scrollTop,
    );
    const startIndex = Math.max(0, start - bufferSize);
    setStartNode(startIndex);
    setVisibleNodeCount(
      getVisibleNodeCount(
        childHeight.current,
        start,
        itemsLength,
        scrollableContainer,
      ),
    );

    if (!parentRef.current) {
      return;
    }
    parentRef.current.style.transform = `translateY(${getTranslateValue(
      childHeight.current,
      startIndex,
    )}px)`;
  }, [bufferSize, itemsLength]);

  const removeScrollListener = React.useCallback(() => {
    if (!onScrollRef.current) {
      return;
    }
    !scrollContainer.current ||
    scrollContainer.current === parentRef.current?.ownerDocument.body
      ? parentRef.current?.ownerDocument.removeEventListener(
          'scroll',
          onScrollRef.current,
        )
      : scrollContainer.current.removeEventListener(
          'scroll',
          onScrollRef.current,
        );
  }, []);

  // Add event listener to the scrollable container.
  React.useLayoutEffect(() => {
    removeScrollListener();
    onScrollRef.current = updateVirtualScroll;
    if (
      !scrollContainer.current ||
      scrollContainer.current === parentRef.current?.ownerDocument.body
    ) {
      parentRef.current?.ownerDocument.addEventListener(
        'scroll',
        updateVirtualScroll,
      );
    } else {
      scrollContainer.current.addEventListener('scroll', updateVirtualScroll);
    }
    return removeScrollListener;
  }, [updateVirtualScroll, removeScrollListener]);

  React.useLayoutEffect(() => {
    updateVirtualScroll();
  }, [scrollContainerHeight, itemsLength, updateVirtualScroll]);

  return (
    <div
      style={{
        overflow: 'hidden',
        minHeight: itemsLength * childHeight.current,
        width: '100%',
        ...style,
      }}
      ref={ref}
      {...rest}
    >
      <div
        style={{
          willChange: 'transform',
        }}
        ref={parentRef}
      >
        {visibleChildren}
      </div>
    </div>
  );
});

export default VirtualScroll;
