/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from './useMergedRefs';
import { useResizeObserver } from './useResizeObserver';

const STARTING_MAX_ITEMS_COUNT = 20;

/**
 * Hook that observes the size of an element and returns the number of items
 * that should be visible based on the width of the container element.
 *
 * The returned number should be used to render the element with fewer items.
 *
 * @private
 * @param items Items that this element contains.
 * @param disabled Set to true to disconnect the observer.
 * @returns [callback ref to set on container, stateful count of visible items]
 *
 * @example
 * const items = Array(10).fill().map((_, i) => <span>Item {i}</span>);
 * const [ref, visibleCount] = useOverflow(items);
 * ...
 * return (
 *   <div ref={ref}>
 *     {items.slice(0, visibleCount)}
 *   </div>
 * );
 */
export const useOverflow = <T extends HTMLElement>(
  items: React.ReactNode[],
  disabled = false,
) => {
  const containerRef = React.useRef<T>(null);

  const [visibleCount, setVisibleCount] = React.useState(() =>
    disabled ? items.length : Math.min(items.length, STARTING_MAX_ITEMS_COUNT),
  );

  const needsFullRerender = React.useRef(true);

  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const previousContainerWidth = React.useRef<number>(0);
  const updateContainerWidth = React.useCallback(
    ({ width }) => setContainerWidth(width),
    [],
  );
  const [resizeRef, observer] = useResizeObserver<T>(updateContainerWidth);
  const resizeObserverRef = React.useRef(observer);

  React.useLayoutEffect(() => {
    if (disabled) {
      setVisibleCount(items.length);
    } else {
      setVisibleCount(Math.min(items.length, STARTING_MAX_ITEMS_COUNT));
      needsFullRerender.current = true;
    }
  }, [containerWidth, disabled, items]);

  const mergedRefs = useMergedRefs(containerRef, resizeRef);

  React.useLayoutEffect(() => {
    if (!containerRef.current || disabled) {
      resizeObserverRef.current?.disconnect();
      return;
    }

    const availableWidth = containerRef.current.offsetWidth;
    const requiredWidth = containerRef.current.scrollWidth;

    if (availableWidth < requiredWidth) {
      const avgItemWidth = requiredWidth / visibleCount;
      const visibleItems = Math.floor(availableWidth / avgItemWidth);
      setVisibleCount(visibleItems);
    } else if (needsFullRerender.current) {
      const childrenWidth = Array.from(containerRef.current.children).reduce(
        (sum: number, child: HTMLElement) => sum + child.offsetWidth,
        0,
      );
      const avgItemWidth = childrenWidth / visibleCount;
      const visibleItems = Math.floor(availableWidth / avgItemWidth);
      // Doubling the visible items to overflow the container. Just to be safe.
      setVisibleCount(Math.min(items.length, visibleItems * 2));
    }
    needsFullRerender.current = false;
  }, [containerWidth, visibleCount, disabled, items.length]);

  React.useLayoutEffect(() => {
    previousContainerWidth.current = containerWidth;
  }, [containerWidth]);

  return [mergedRefs, visibleCount] as const;
};
