/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';
import { useResizeObserver } from './useResizeObserver.js';
import { useLatestRef } from './useLatestRef.js';
import { useMergedRefs } from './useMergedRefs.js';

/** `[number, number]` means that we're still guessing. `null` means that we got the correct `visibleCount`. */
type GuessRange = [number, number] | null;

/** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
const STARTING_MAX_ITEMS_COUNT = 2;

/**
 * Hook that returns the number of items that should be visible based on the size of the container element.
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
  // container: HTMLElement | undefined,
) => {
  const containerRef = React.useRef<T>(null);

  const initialVisibleCount = React.useMemo(
    () => Math.min(itemsLength, STARTING_MAX_ITEMS_COUNT),
    [itemsLength],
  );
  const initialVisibleCountGuessRange = React.useMemo(
    () => [0, initialVisibleCount] satisfies GuessRange,
    [initialVisibleCount],
  );

  const [visibleCount, _setVisibleCount] = React.useState<number>(() =>
    disabled ? itemsLength : initialVisibleCount,
  );

  /**
   * Ensures that `visibleCount <= itemsLength`
   */
  const setVisibleCount = React.useCallback(
    (setStateAction: React.SetStateAction<typeof visibleCount>) => {
      _setVisibleCount((prev) => {
        const newVisibleCount =
          typeof setStateAction === 'function'
            ? setStateAction(prev)
            : setStateAction;

        return Math.min(newVisibleCount, itemsLength);
      });
    },
    [itemsLength],
  );

  const [resizeRef] = useResizeObserver(
    React.useCallback(() => {
      setVisibleCount(initialVisibleCount);
      setVisibleCountGuessRange(initialVisibleCountGuessRange);
    }, [initialVisibleCount, initialVisibleCountGuessRange, setVisibleCount]),
  );

  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>(disabled ? null : initialVisibleCountGuessRange);
  const isStabilized = visibleCountGuessRange == null;

  /**
   * Call this function to guess the new `visibleCount`.
   * The `visibleCount` is not changed if the correct `visibleCount` has already been found.
   */
  const isGuessing = React.useRef(false);
  const guessVisibleCount = React.useCallback(() => {
    console.log('RUNNING', {
      visibleCountGuessRange: visibleCountGuessRange?.toString(),
      myRef: containerRef,
      // isOverflowing,
      visibleCount,
      // availableSize,
      // requiredSize,
    });

    // If disabled or already stabilized
    if (disabled || isStabilized || isGuessing.current) {
      return;
    }

    // We need to wait for the ref to be attached so that we can measure available and required sizes.
    if (containerRef.current == null) {
      return;
    }

    try {
      isGuessing.current = true;

      const dimension = orientation === 'horizontal' ? 'Width' : 'Height';
      const availableSize = containerRef.current[`offset${dimension}`];
      const requiredSize = containerRef.current[`scroll${dimension}`];

      const isOverflowing = availableSize < requiredSize;

      // We have already found the correct visibleCount
      if (
        (visibleCount === itemsLength && !isOverflowing) ||
        visibleCountGuessRange[1] - visibleCountGuessRange[0] === 1 // TODO: I think this causes issue when item count is 1 and so the initial range is [0, 1]
      ) {
        console.log('STABILIZED');
        setVisibleCountGuessRange(null);
        return;
      }

      // Before the main logic, the max guess MUST be >= the correct visibleCount for the algorithm to work.
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
    } finally {
      isGuessing.current = false;
    }
  }, [
    containerRef,
    disabled,
    isStabilized,
    itemsLength,
    orientation,
    setVisibleCount,
    visibleCount,
    visibleCountGuessRange,
  ]);

  const previousVisibleCount = useLatestRef(visibleCount);
  const previousVisibleCountGuessRange = useLatestRef(visibleCountGuessRange);
  const previousContainer = useLatestRef(containerRef.current);

  useLayoutEffect(() => {
    if (disabled || isStabilized) {
      return;
    }

    if (
      visibleCount !== previousVisibleCount.current ||
      // TODO: Better list value comparison
      visibleCountGuessRange.toString() !==
        previousVisibleCountGuessRange.current?.toString() ||
      containerRef.current !== previousContainer.current
    ) {
      previousVisibleCount.current = visibleCount;
      previousVisibleCountGuessRange.current = visibleCountGuessRange;
      previousContainer.current = containerRef.current;

      guessVisibleCount();
    }
  }, [
    disabled,
    guessVisibleCount,
    isStabilized,
    previousContainer,
    previousVisibleCount,
    previousVisibleCountGuessRange,
    visibleCount,
    visibleCountGuessRange,
  ]);

  const mergedRefs = useMergedRefs(containerRef, resizeRef);
  return [mergedRefs, visibleCount] as const;
};
