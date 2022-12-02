/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  mergeRefs,
  useResizeObserver,
  useIsomorphicLayoutEffect,
} from '../hooks';

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

const getElementHeightWithMargins = (element: HTMLElement | undefined) => {
  if (!element) {
    return undefined;
  }

  const margin =
    parseFloat(getElementStyle(element, 'margin-top')) +
    parseFloat(getElementStyle(element, 'margin-bottom'));
  return getElementHeight(element) + (isNaN(margin) ? 0 : margin);
};

const getNumberOfNodesInHeight = (childHeight: number, totalHeight: number) => {
  if (!childHeight) {
    return 0;
  }

  return Math.floor(totalHeight / childHeight);
};

const getTranslateValue = (childHeight: number, startIndex: number) => {
  if (startIndex > 0) {
    return childHeight * startIndex;
  }

  return 0;
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
  /**
   * Index of the first element on initial render.
   */
  scrollToIndex?: number;
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
>((props, ref) => {
  const { innerProps, outerProps, visibleChildren } = useVirtualization(props);

  return (
    <div {...outerProps} ref={ref}>
      <div {...innerProps}>{visibleChildren}</div>
    </div>
  );
});

/**
 * `useVirtualization` is used for efficiently rendering only the visible rows from a large list.
 * It returns `outerProps` and `innerProps`, which need to be applied on 2 container elements and `visibleChildren` which is a list of virtualized items.
 * @example
 * const itemRenderer = React.useCallback((index: number) => (
 *  <li key={index}>
 *    This is my item #{index}
 *  </li>
 * ), [])
 *
 * const { outerProps, innerProps, visibleChildren } = useVirtualization({itemsLength: 1000, itemRenderer: itemRenderer});
 * return (
 *  <div {...outerProps}>
 *   <ul {...innerProps}>
 *    {visibleChildren}
 *   </ul>
 *  </div>
 * );
 * @private
 */
export const useVirtualization = (props: VirtualScrollProps) => {
  const {
    itemsLength,
    itemRenderer,
    bufferSize = 10,
    scrollToIndex,
    style,
    ...rest
  } = props;
  const [startNode, setStartNode] = React.useState(0);
  const [visibleNodeCount, setVisibleNodeCount] = React.useState(0);
  const scrollContainer = React.useRef<HTMLElement>();
  const parentRef = React.useRef<HTMLElement>(null);
  const childHeight = React.useRef({ first: 0, middle: 0, last: 0 });
  const onScrollRef = React.useRef<(e: Event) => void>();
  // Used only to recalculate on resize
  const [scrollContainerHeight, setScrollContainerHeight] = React.useState(0);
  const visibleIndex = React.useRef({ start: 0, end: 0 });
  // Used to mark when scroll container has height (updated by resize observer)
  // because before that calculations are not right
  const [isMounted, setIsMounted] = React.useState(false);

  const getScrollableContainer = () =>
    scrollContainer.current ??
    (parentRef.current?.ownerDocument.scrollingElement as HTMLElement);

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

  const updateChildHeight = React.useCallback(() => {
    if (!parentRef.current || !visibleChildren.length) {
      return;
    }

    const firstChild = parentRef.current.children.item(0) as HTMLElement;
    const secondChild = parentRef.current.children.item(1) as HTMLElement;
    const lastChild = parentRef.current.children.item(
      parentRef.current.children.length - 1,
    ) as HTMLElement;
    const firstChildHeight = Number(
      getElementHeightWithMargins(firstChild)?.toFixed(2) ?? 0,
    );

    childHeight.current = {
      first: firstChildHeight,
      middle: Number(
        getElementHeightWithMargins(secondChild)?.toFixed(2) ??
          firstChildHeight,
      ),
      last: Number(
        getElementHeightWithMargins(lastChild)?.toFixed(2) ?? firstChildHeight,
      ),
    };
  }, [visibleChildren.length]);

  const onResize = React.useCallback(
    ({ height }: DOMRectReadOnly) => {
      // Initial value returned by resize observer is 0
      // So wait for the next one
      if (height > 0) {
        setIsMounted(true);
      }
      setScrollContainerHeight(height);

      updateChildHeight();
    },
    [updateChildHeight],
  );
  const [resizeRef, resizeObserver] = useResizeObserver(onResize);

  // Find scrollable parent
  // Needed only on init
  useIsomorphicLayoutEffect(() => {
    const scrollableParent = getScrollableParent(
      parentRef.current,
      parentRef.current?.ownerDocument,
    );
    scrollContainer.current = scrollableParent;

    resizeRef(scrollableParent);
  }, [resizeRef]);

  // Stop watching resize, when virtual scroll is unmounted
  useIsomorphicLayoutEffect(() => {
    return () => resizeObserver?.disconnect();
  }, [resizeObserver]);

  // Get child height when children available
  useIsomorphicLayoutEffect(() => updateChildHeight(), [updateChildHeight]);

  const updateVirtualScroll = React.useCallback(() => {
    const scrollableContainer = getScrollableContainer();
    if (!scrollableContainer) {
      return;
    }

    const start = getNumberOfNodesInHeight(
      childHeight.current.middle,
      Math.round(scrollableContainer.scrollTop),
    );
    const visibleNodes = getVisibleNodeCount(
      childHeight.current.middle,
      start,
      itemsLength,
      scrollableContainer,
    );
    // If there are less items at the end than buffer size
    // show more items at the start.
    // Have boundaries for edge cases, e.g. 1 item length
    const startIndex = Math.min(
      Math.max(0, start - bufferSize),
      Math.max(0, itemsLength - bufferSize * 2 - visibleNodes),
    );
    visibleIndex.current = { start: start, end: start + visibleNodes };
    setStartNode(startIndex);
    setVisibleNodeCount(visibleNodes);

    if (!parentRef.current) {
      return;
    }
    parentRef.current.style.transform = `translateY(${getTranslateValue(
      childHeight.current.middle,
      startIndex,
    )}px)`;
  }, [bufferSize, itemsLength]);

  const onScroll = React.useCallback(() => {
    updateVirtualScroll();
  }, [updateVirtualScroll]);

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
  useIsomorphicLayoutEffect(() => {
    removeScrollListener();
    onScrollRef.current = onScroll;
    if (
      !scrollContainer.current ||
      scrollContainer.current === parentRef.current?.ownerDocument.body
    ) {
      parentRef.current?.ownerDocument.addEventListener('scroll', onScroll);
    } else {
      scrollContainer.current.addEventListener('scroll', onScroll);
    }
    return removeScrollListener;
  }, [onScroll, removeScrollListener]);

  useIsomorphicLayoutEffect(() => {
    if (!isMounted) {
      return;
    }

    const scrollableContainer = getScrollableContainer();

    if (!scrollableContainer || scrollToIndex == null) {
      return;
    }

    // if `scrollToIndex` is not visible, scroll to it
    if (
      scrollToIndex > visibleIndex.current.end ||
      scrollToIndex < visibleIndex.current.start
    ) {
      const indexDiff =
        scrollToIndex > visibleIndex.current.end
          ? scrollToIndex - visibleIndex.current.end
          : scrollToIndex - visibleIndex.current.start;

      if (scrollToIndex === 0) {
        scrollableContainer.scrollTo({ top: 0 });
        return;
      }
      // If go down: add to the existing scrollTop needed height
      // If go up: calculate the exact scroll top
      scrollableContainer.scrollTo({
        top:
          indexDiff > 0
            ? Math.ceil(scrollableContainer.scrollTop) +
              indexDiff * childHeight.current.middle
            : scrollToIndex * childHeight.current.middle,
      });
    }

    // if `scrollToIndex` is the first visible node
    // ensure it is fully visible
    if (scrollToIndex === visibleIndex.current.start) {
      const roundedScrollTop = Math.round(scrollableContainer.scrollTop);
      const diff = roundedScrollTop % childHeight.current.middle;
      diff > 0 &&
        scrollableContainer.scrollTo({
          top: roundedScrollTop - diff,
        });
      return;
    }

    // if `scrollToIndex` is the last visible node
    // ensure it is fully visible
    if (scrollToIndex === visibleIndex.current.end) {
      const diff =
        (scrollableContainer.offsetHeight - childHeight.current.first) %
        childHeight.current.middle;
      const roundedScrollTop = Math.ceil(scrollableContainer.scrollTop);
      const scrollTopMod = roundedScrollTop % childHeight.current.middle;

      if (diff > 0 && scrollTopMod === 0) {
        scrollableContainer.scrollTo({
          top: roundedScrollTop + childHeight.current.middle - diff,
        });
      }
    }
  }, [scrollToIndex, isMounted]);

  useIsomorphicLayoutEffect(() => {
    if (!scrollContainerHeight) {
      return;
    }

    updateVirtualScroll();
  }, [scrollContainerHeight, updateVirtualScroll]);

  return {
    outerProps: {
      style: {
        minHeight:
          itemsLength > 1
            ? Math.max(itemsLength - 2, 0) * childHeight.current.middle +
              childHeight.current.first +
              childHeight.current.last
            : childHeight.current.middle,
        minWidth: '100%',
        ...style,
      },
      ...rest,
    } as React.HTMLAttributes<HTMLElement>,
    innerProps: {
      style: { willChange: 'transform' },
      ref: mergeRefs(parentRef), // convert object ref to callback ref for better types
    } as const,
    visibleChildren,
  };
};

export default VirtualScroll;
