/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from './useMergedRefs';
import { useResizeObserver } from './useResizeObserver';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const STARTING_MAX_ITEMS_COUNT = 20;

/**
 * Hook that observes the size of an element and returns the number of items
 * that should be visible based on the size of the container element.
 *
 * The returned number should be used to render the element with fewer items.
 *
 * @private
 * @param items Items that this element contains.
 * @param disabled Set to true to disconnect the observer.
 * @param dimension 'horizontal' (default) or 'vertical'
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
  items: React.ReactNode[] | string,
  disabled = false,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  const containerRef = React.useRef<T>(null);

  const [visibleCount, setVisibleCount] = React.useState(() =>
    disabled ? items.length : Math.min(items.length, STARTING_MAX_ITEMS_COUNT),
  );

  const needsFullRerender = React.useRef(true);

  const [containerSize, setContainerSize] = React.useState<number>(0);
  const previousContainerSize = React.useRef<number>(0);
  const updateContainerSize = React.useCallback(
    ({ width, height }: DOMRectReadOnly) =>
      setContainerSize(orientation === 'horizontal' ? width : height),
    [orientation],
  );
  const [resizeRef, observer] = useResizeObserver<T>(updateContainerSize);
  const resizeObserverRef = React.useRef(observer);

  useIsomorphicLayoutEffect(() => {
    if (disabled) {
      setVisibleCount(items.length);
    } else {
      setVisibleCount(Math.min(items.length, STARTING_MAX_ITEMS_COUNT));
      needsFullRerender.current = true;
    }
  }, [containerSize, disabled, items]);

  const mergedRefs = useMergedRefs(containerRef, resizeRef);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || disabled) {
      resizeObserverRef.current?.disconnect();
      return;
    }
    const dimension = orientation === 'horizontal' ? 'Width' : 'Height';

    const availableSize = containerRef.current[`offset${dimension}`];
    const requiredSize = containerRef.current[`scroll${dimension}`];

    if (availableSize < requiredSize) {
      const avgItemSize = requiredSize / visibleCount;
      const visibleItems = Math.floor(availableSize / avgItemSize);
      setVisibleCount(visibleItems);
    } else if (needsFullRerender.current) {
      const childrenSize = Array.from(containerRef.current.children).reduce(
        (sum: number, child: HTMLElement) => sum + child[`offset${dimension}`],
        0,
      );
      // Previous `useEffect` might have updated visible count, but we still have old one
      // If it is 0, lets try to update it with items length.
      const currentVisibleCount =
        visibleCount || Math.min(items.length, STARTING_MAX_ITEMS_COUNT);
      const avgItemSize = childrenSize / currentVisibleCount;
      const visibleItems = Math.floor(availableSize / avgItemSize);

      if (!isNaN(visibleItems)) {
        // Doubling the visible items to overflow the container. Just to be safe.
        setVisibleCount(Math.min(items.length, visibleItems * 2));
      }
    }
    needsFullRerender.current = false;
  }, [containerSize, visibleCount, disabled, items.length, orientation]);

  useIsomorphicLayoutEffect(() => {
    previousContainerSize.current = containerSize;
  }, [containerSize]);

  return [mergedRefs, visibleCount] as const;
};
