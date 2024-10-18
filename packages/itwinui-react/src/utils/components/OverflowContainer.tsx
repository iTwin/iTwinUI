/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { useResizeObserver } from '../hooks/useResizeObserver.js';
import { useLatestRef } from '../hooks/useLatestRef.js';
import { useLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useSafeContext } from '../hooks/useSafeContext.js';
import { isUnitTest } from '../functions/dev.js';

type OverflowContainerProps = {
  /**
   * The orientation of the overflow in container.
   * @default 'horizontal'
   */
  overflowOrientation?: 'horizontal' | 'vertical';
  /**
   * Count of the *original* items (i.e. when sufficient space is available).
   */
  itemsCount: number;
};

/**
 * Wrapper over `useOverflow`.
 *
 * - Use `useOverflowContainerContext` to get overflow related properties.
 * - Wrap overflow content in `OverflowContainer.OverflowNode` to conditionally render it when overflowing.
 */
const OverflowContainerComponent = React.forwardRef((props, ref) => {
  const { itemsCount, children, overflowOrientation, ...rest } = props;

  const [containerRef, visibleCount] = useOverflow(
    itemsCount,
    overflowOrientation,
  );

  const overflowContainerContextValue = React.useMemo(
    () => ({ visibleCount, itemsCount }),
    [itemsCount, visibleCount],
  );

  return (
    <OverflowContainerContext.Provider value={overflowContainerContextValue}>
      <Box ref={useMergedRefs(ref, containerRef)} {...rest}>
        {children}
      </Box>
    </OverflowContainerContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;

// ----------------------------------------------------------------------------

type OverflowContainerOverflowNodeProps = {
  children: React.ReactNode;
};

/**
 * Shows the content only when the container is overflowing.
 */
const OverflowContainerOverflowNode = (
  props: OverflowContainerOverflowNodeProps,
) => {
  const { children } = props;

  const { visibleCount, itemsCount } = useOverflowContainerContext();
  const isOverflowing = visibleCount < itemsCount;

  return isOverflowing ? children : null;
};

// ----------------------------------------------------------------------------

/**
 * Wrapper over `useOverflow`.
 *
 * - Use `OverflowContainer.useContext()` to get overflow related properties.
 * - Wrap overflow content in `OverflowContainer.OverflowNode` to conditionally render it when overflowing.
 */
export const OverflowContainer = Object.assign(OverflowContainerComponent, {
  /**
   * Wrap overflow content in this component to conditionally render it when overflowing.
   */
  OverflowNode: OverflowContainerOverflowNode,
  /**
   * Get overflow related properties of the nearest `OverflowContainer` ancestor.
   */
  useContext: useOverflowContainerContext,
});

// ----------------------------------------------------------------------------

const OverflowContainerContext = React.createContext<
  | {
      visibleCount: number;
      itemsCount: number;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  OverflowContainerContext.displayName = 'OverflowContainerContext';
}

/**
 * Hook that returns the number of items that should be visible based on the size of the container element.
 *
 * The returned number should be used to render the element with fewer items.
 *
 * @private
 * @param items Items that this element contains.
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
const useOverflow = <T extends HTMLElement>(
  itemsCount: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  /** `[number, number]` means that we're still guessing. `null` means that we got the correct `visibleCount`. */
  type GuessRange = [number, number] | null;

  /** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
  const STARTING_MAX_ITEMS_COUNT = 32;

  const containerRef = React.useRef<T>(null);

  const initialVisibleCount = React.useMemo(
    () => Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT),
    [itemsCount],
  );
  const initialVisibleCountGuessRange = React.useMemo(
    () => [0, initialVisibleCount] satisfies GuessRange,
    [initialVisibleCount],
  );

  const [visibleCount, _setVisibleCount] =
    React.useState<number>(initialVisibleCount);
  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>(initialVisibleCountGuessRange);

  const isStabilized = visibleCountGuessRange == null;

  /**
   * Ensures that `visibleCount <= itemsCount`
   */
  const setVisibleCount = React.useCallback(
    (setStateAction: React.SetStateAction<typeof visibleCount>) => {
      _setVisibleCount((prev) => {
        const newVisibleCount =
          typeof setStateAction === 'function'
            ? setStateAction(prev)
            : setStateAction;

        return Math.min(newVisibleCount, itemsCount);
      });
    },
    [itemsCount],
  );

  const [resizeRef] = useResizeObserver(
    React.useCallback(() => {
      setVisibleCount(initialVisibleCount);
      setVisibleCountGuessRange(initialVisibleCountGuessRange);
    }, [initialVisibleCount, initialVisibleCountGuessRange, setVisibleCount]),
  );

  const isGuessing = React.useRef(false);

  /**
   * Call this function to guess the new `visibleCount`.
   * The `visibleCount` is not changed if the correct `visibleCount` has already been found.
   *
   * Logic:
   * - Have a guess range for `visibleCount`. e.g. `[0, 32]` (32 is an arbitrary choice).
   * - Keep doubling the max guess until the container overflows.
   *   i.e. the max guess should always be `≥` the correct `visibleCount`.
   *   - With each such doubling, the new min guess is the current max guess (since underflow = we guessed low).
   * - Set `visibleCount` to the `maxGuess`.
   * - Repeat the following by calling `guessVisibleCount()` (keep re-rendering but not painting):
   *   - Each time the container overflows, new max guess is the average of the two guesses.
   *   - Each time the container does not overflow, new min guess is the average of the two guesses.
   * - Stop when the average of the two guesses is the min guess itself. i.e. no more averaging possible.
   * - The min guess is then the correct `visibleCount`.
   */
  const guessVisibleCount = React.useCallback(() => {
    // If already stabilized, already guessing, or in unit test, do not guess.
    if (isStabilized || isGuessing.current || isUnitTest) {
      return;
    }

    try {
      isGuessing.current = true;

      // We need to wait for the ref to be attached so that we can measure available and required sizes.
      if (containerRef.current == null) {
        return;
      }

      const dimension = orientation === 'horizontal' ? 'Width' : 'Height';
      const availableSize = containerRef.current[`offset${dimension}`];
      const requiredSize = containerRef.current[`scroll${dimension}`];

      const isOverflowing = availableSize < requiredSize;

      if (
        // We have already found the correct visibleCount
        (visibleCount === itemsCount && !isOverflowing) ||
        // if the new average of visibleCountGuessRange will never change the visibleCount anymore (infinite loop)
        (visibleCountGuessRange[1] - visibleCountGuessRange[0] === 1 &&
          visibleCount === visibleCountGuessRange[0])
      ) {
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

      // Next guess is always the middle of the new guess range
      const newVisibleCount = Math.floor(
        (newVisibleCountGuessRange[0] + newVisibleCountGuessRange[1]) / 2,
      );

      // If newVisibleCount is 0 (impossible state as min is 1), end guessing
      if (newVisibleCount === 0) {
        setVisibleCountGuessRange(null);
        return;
      }

      setVisibleCountGuessRange(newVisibleCountGuessRange);
      setVisibleCount(newVisibleCount);
    } finally {
      isGuessing.current = false;
    }
  }, [
    containerRef,
    isStabilized,
    itemsCount,
    orientation,
    setVisibleCount,
    visibleCount,
    visibleCountGuessRange,
  ]);

  const previousVisibleCount = useLatestRef(visibleCount);
  const previousVisibleCountGuessRange = useLatestRef(visibleCountGuessRange);
  const previousContainer = useLatestRef(containerRef.current);

  // Guess each time any of the following changes:
  // - `visibleCount`
  // - `visibleCountGuessRange`
  // - `containerRef`
  useLayoutEffect(() => {
    if (isStabilized || isUnitTest) {
      return;
    }

    if (
      visibleCount !== previousVisibleCount.current ||
      JSON.stringify(visibleCountGuessRange) !==
        (previousVisibleCountGuessRange.current != null
          ? JSON.stringify(previousVisibleCountGuessRange.current)
          : undefined) ||
      containerRef.current !== previousContainer.current
    ) {
      previousVisibleCount.current = visibleCount;
      previousVisibleCountGuessRange.current = visibleCountGuessRange;
      previousContainer.current = containerRef.current;

      guessVisibleCount();
    }
  }, [
    guessVisibleCount,
    isStabilized,
    previousContainer,
    previousVisibleCount,
    previousVisibleCountGuessRange,
    visibleCount,
    visibleCountGuessRange,
  ]);

  // In unit test environments, always show all items
  useLayoutEffect(() => {
    if (isUnitTest) {
      setVisibleCount(itemsCount);
      setVisibleCountGuessRange(null);
    }
  }, [itemsCount, setVisibleCount]);

  const mergedRefs = useMergedRefs(containerRef, resizeRef);
  return [mergedRefs, visibleCount] as const;
};
function useOverflowContainerContext() {
  const overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
}
