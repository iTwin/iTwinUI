/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useMergedRefs } from './useMergedRefs.js';
import { useResizeObserver } from './useResizeObserver.js';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';
import usePrevious from './usePrevious.js';

/** `[number, number]` means that we're still guessing. `null` means that we got the correct `visibleCount`. */
type GuessRange = [number, number] | null;

/** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
const STARTING_MAX_ITEMS_COUNT = 2;

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
  // TODO: Try more to remove this prop, if possible.
  itemsLength: number,
  disabled = false,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  const containerRef = React.useRef<T>(null);
  const initialVisibleCount = Math.min(itemsLength, STARTING_MAX_ITEMS_COUNT);

  const [visibleCount, _setVisibleCount] = React.useState<number>(() =>
    disabled ? itemsLength : initialVisibleCount,
  );
  const setVisibleCount = React.useCallback(
    (newVisibleCount: React.SetStateAction<typeof visibleCount>) => {
      _setVisibleCount((prev) => {
        const safeVisibleCount = Math.min(
          typeof newVisibleCount === 'function'
            ? newVisibleCount(prev)
            : newVisibleCount,
          itemsLength,
        );

        return safeVisibleCount;
      });
    },
    [itemsLength],
  );

  const [containerSize, setContainerSize] = React.useState<number>(-1);
  const previousContainerSize = usePrevious(containerSize);
  previousContainerSize;

  const updateContainerSize = React.useCallback(
    ({ width, height }: DOMRectReadOnly) =>
      setContainerSize(orientation === 'horizontal' ? width : height),
    [orientation],
  );

  const [resizeRef, observer] = useResizeObserver<T>(updateContainerSize);
  const resizeObserverRef = React.useRef(observer);

  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>(disabled ? null : [0, initialVisibleCount]);

  /**
   * Call this function to guess the new `visibleCount`.
   * The `visibleCount` is not changed if the correct `visibleCount` has already been found.
   */
  const guessVisibleCount = React.useCallback(() => {
    // If disabled or already stabilized
    if (disabled || visibleCountGuessRange == null) {
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
      availableSize,
      requiredSize,
    });

    // We have already found the correct visibleCount
    if (
      (visibleCount === itemsLength && !isOverflowing) ||
      visibleCountGuessRange[1] - visibleCountGuessRange[0] === 1
    ) {
      console.log('STABILIZED');
      setVisibleCountGuessRange(null);
      return;
    }

    // Before the main logic, the max guess MUST be above the correct visibleCount for the algorithm to work.
    // If not:
    // - double the max guess and visibleCount: since we need to overflow.
    // - set min guess to current visibleCount: since underflow means correct visibleCount >= current visibleCount.
    if (visibleCountGuessRange[1] === visibleCount && !isOverflowing) {
      const doubleOfMaxGuess = visibleCountGuessRange[1] * 2;

      setVisibleCountGuessRange([visibleCount, doubleOfMaxGuess]);
      setVisibleCount(doubleOfMaxGuess);
      return;
    }

    let newVisibleCountGuessRange = visibleCountGuessRange;

    if (isOverflowing) {
      // overflowing = we guessed too high. So, new max guess = half the current guess
      newVisibleCountGuessRange = [visibleCountGuessRange[0], visibleCount];
    } else {
      // not overflowing = maybe we guessed too low? So, new min guess = half of current guess
      newVisibleCountGuessRange = [visibleCount, visibleCountGuessRange[1]];
    }

    setVisibleCountGuessRange(newVisibleCountGuessRange);

    // Next guess is always the middle of the new guess range
    setVisibleCount(
      Math.floor(
        (newVisibleCountGuessRange[0] + newVisibleCountGuessRange[1]) / 2,
      ),
    );
  }, [
    disabled,
    itemsLength,
    orientation,
    setVisibleCount,
    visibleCount,
    visibleCountGuessRange,
  ]);

  // TODO: Replace eslint-disable with proper listening to containerRef resize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (disabled || !containerRef.current) {
      resizeObserverRef.current?.disconnect();
      return;
    }

    guessVisibleCount();
  });

  // TODO: Better way to listen to containerSize changes instead of having containerSize in dep array.
  useLayoutEffect(() => {
    if (
      // No need to listen to resizes since we're already in the process of finding the correct visibleCount
      visibleCountGuessRange != null ||
      // Only start re-guessing if containerSize changes *after* the containerSize is first set.
      // This prevents unnecessary renders
      containerSize === previousContainerSize ||
      previousContainerSize === -1
    ) {
      return;
    }

    // Set the visibleCountGuessRange to again find the correct visibleCount;
    setVisibleCountGuessRange([0, visibleCount]);

    // TODO: Have better optimizations on resizing.
    // const growing = containerSize > (previousContainerSize ?? 0);
    // if (growing) {
    //  setVisibleCountGuessRange([visibleCount, visibleCount + 1]);
    // } else {
    //  setVisibleCountGuessRange([visibleCount - 2, visibleCount]);
    // }
    // guessVisibleCount();
  }, [
    containerSize,
    guessVisibleCount,
    previousContainerSize,
    visibleCount,
    visibleCountGuessRange,
  ]);

  const mergedRefs = useMergedRefs(containerRef, resizeRef);

  return [mergedRefs, visibleCount] as const;
};
