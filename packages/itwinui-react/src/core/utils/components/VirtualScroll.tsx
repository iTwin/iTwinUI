import React from 'react';
import { getBoundedValue } from '../functions/numbers';

const getScrollableParent = (element: HTMLElement | null): HTMLElement => {
  if (!element || element === document.body) {
    return document.body;
  }

  return isElementScrollable(element)
    ? element
    : getScrollableParent(element.parentElement);
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

type VirtualScrollProps = {
  children: React.ReactNodeArray;
  height: string | number;
};

const VirtualScroll = ({ children, height }: VirtualScrollProps) => {
  const renderAdditional = 30;
  const [startNode, setStartNode] = React.useState(0);
  const [visibleNodeCount, setVisibleNodeCount] = React.useState(0);
  const [scrollContainer, setScrollContainer] = React.useState<HTMLElement>();
  const childrenParentRef = React.useRef<HTMLDivElement>(null);
  const [childHeight, setChildHeight] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    setScrollContainer(getScrollableParent(childrenParentRef.current));
  }, []);

  const visibleChildren = React.useMemo(() => {
    const adjustedVisibleCount =
      visibleNodeCount > 0 ? visibleNodeCount : 20 + renderAdditional;
    console.log('children count', adjustedVisibleCount);
    return children.slice(startNode, startNode + adjustedVisibleCount);
  }, [startNode, visibleNodeCount, children]);

  React.useLayoutEffect(() => {
    const childrenLength = getBoundedValue(
      visibleChildren.length,

      1,
      visibleChildren.length,
    );
    let heightSum = 0;

    for (let i = 0; i < childrenLength; i++) {
      console.log(childrenParentRef.current?.children.item(i)?.clientHeight);
      heightSum +=
        childrenParentRef.current?.children.item(i)?.clientHeight || 0;
    }

    console.log(heightSum, childrenLength);
    setChildHeight(heightSum / childrenLength);
  }, [visibleChildren]);

  const onScroll = React.useCallback(
    () =>
      requestAnimationFrame(() => {
        if (!scrollContainer) {
          return;
        }

        const top = scrollContainer.scrollTop; // : document.scrollingElement?.scrollTop) ?? 0;
        setStartNode(Math.max(0, Math.floor(top / childHeight)));
        setVisibleNodeCount(
          Math.min(
            children.length - startNode,
            Math.ceil(
              typeof height === 'string'
                ? Number.parseInt(height) / childHeight
                : height / childHeight,
            ) + renderAdditional,
          ),
        );
      }),
    [childHeight, children.length, height, scrollContainer, startNode],
  );

  React.useEffect(() => {
    if (!childHeight) {
      return;
    }

    let top = 0;
    if (!scrollContainer || scrollContainer === document.body) {
      document.addEventListener('scroll', onScroll);
      top = document.scrollingElement?.scrollTop ?? 0;
    } else {
      scrollContainer?.addEventListener('scroll', onScroll);
      top = scrollContainer.scrollTop ?? 0;
    }

    setStartNode(Math.max(0, Math.floor(top / childHeight)));
    setVisibleNodeCount(
      Math.min(
        children.length - startNode,
        Math.ceil(
          typeof height === 'string'
            ? Number.parseInt(height)
            : height / childHeight,
        ) + renderAdditional,
      ),
    );

    return () => scrollContainer?.removeEventListener('scroll', onScroll);
  }, [
    childHeight,
    children.length,
    height,
    onScroll,
    scrollContainer,
    startNode,
  ]);

  return (
    <>
      <div
        style={{
          overflow: 'hidden',

          willChange: 'transform',
          height: children.length * childHeight,
          position: 'relative',
        }}
      >
        <div
          style={{
            willChange: 'transform',
            transform: `translateY(${startNode * childHeight}px)`,
          }}
          ref={childrenParentRef}
        >
          {visibleChildren}
        </div>
      </div>
    </>
  );
};

export default VirtualScroll;
