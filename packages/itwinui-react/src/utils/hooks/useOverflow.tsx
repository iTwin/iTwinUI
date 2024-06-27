/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useMergedRefs } from './useMergedRefs.js';
import { useResizeObserver } from './useResizeObserver.js';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';
import usePrevious from './usePrevious.js';
import { useLatestRef } from './useLatestRef.js';

type GuessRange = [number, number] | null;

/** First guess of the number of items that overflows. We refine this guess with subsequent renders */
const STARTING_MAX_ITEMS_COUNT = 32;

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
  const initialVisibleCount = Math.min(items.length, STARTING_MAX_ITEMS_COUNT);
  const [visibleCount, setVisibleCount] = React.useState(() =>
    disabled ? items.length : initialVisibleCount,
  );

  const [containerSize, setContainerSize] = React.useState<number>(0);
  const previousContainerSize = usePrevious(containerSize);
  previousContainerSize;

  const updateContainerSize = React.useCallback(
    ({ width, height }: DOMRectReadOnly) =>
      setContainerSize(orientation === 'horizontal' ? width : height),
    [orientation],
  );

  const [resizeRef, observer] = useResizeObserver<T>(updateContainerSize);
  const resizeObserverRef = useLatestRef(observer);
  resizeObserverRef;

  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>([0, initialVisibleCount]);

  // TODO: Replace eslint-disable with proper listening to containerRef resize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    // TODO: Handle the case where there is a resize after we've stabilized on a visibleCount
    // if (searchIndexes == null) {
    //   setSearchIndexes
    // }
    // (() => {
    // Already stabilized
    if (visibleCountGuessRange == null) {
      return;
    }

    // We have already found the correct visibleCount
    if (visibleCountGuessRange[1] - visibleCountGuessRange[0] === 1) {
      setVisibleCountGuessRange(null);
      return;
    }

    const dimension = orientation === 'horizontal' ? 'Width' : 'Height';
    const availableSize = containerRef.current?.[`offset${dimension}`] ?? 0;
    const requiredSize = containerRef.current?.[`scroll${dimension}`] ?? 0;

    const isOverflowing = availableSize < requiredSize;

    console.log('RUNNING', {
      visibleCountGuessRange: visibleCountGuessRange.toString(),
      isOverflowing,
      visibleCount,
    });

    let newVisibleCountGuessRange = visibleCountGuessRange;

    // overflowing = we guessed too high. So, new max guess = half the current guess
    if (isOverflowing) {
      newVisibleCountGuessRange = [visibleCountGuessRange[0], visibleCount];
    }
    // not overflowing = maybe we guessed too low. So, new min guess = half of current guess
    else {
      newVisibleCountGuessRange = [visibleCount, visibleCountGuessRange[1]];
    }

    setVisibleCountGuessRange(newVisibleCountGuessRange);

    // Always guess that the correct visibleCount is in the middle of the range
    setVisibleCount(
      Math.floor(
        (newVisibleCountGuessRange[0] + newVisibleCountGuessRange[1]) / 2,
      ),
    );

    // // We have found the correct visibleCount
    // if (visibleCountGuessRange[1] - visibleCountGuessRange[0] === 1) {
    //   setVisibleCountGuessRange(null);
    // }
    // // overflowing = we guessed too high. So, new max guess = half the current guess
    // else if (isOverflowing) {
    //   setVisibleCountGuessRange([visibleCountGuessRange[0], newGuess]);
    // }
    // // not overflowing = maybe we guessed too low. So, new min guess = half of current guess
    // else {
    //   setVisibleCountGuessRange([newGuess, visibleCountGuessRange[1]]);
    // }
    // })();
  });

  const mergedRefs = useMergedRefs(containerRef, resizeRef);

  return [mergedRefs, visibleCount] as const;
};
