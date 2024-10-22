/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
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
 * Useful to handle overflow of items in a container.
 *
 * The listen to resize changes, pass a new `key` to reset the overflow calculations.
 *
 * Notes:
 * - Use `OverflowContainer.useContext()` to get overflow related properties.
 * - Wrap overflow content in `OverflowContainer.OverflowNode` to conditionally render it when overflowing.
 *
 * @example
 * const items = Array(10)
 *   .fill()
 *   .map((_, i) => <span>Item {i}</span>);
 *
 * const [size, setSize] = React.useState<DOMRectReadOnly | null>(null);
 * const [resizeRef] = useResizeObserver(setSize);
 *
 * return (
 *   <OverflowContainer
 *     key={size?.width}
 *     ref={resizeRef}
 *     itemsCount={items.length}
 *   >
 *     {items}
 *     <MyOverflowContainerContent />
 *   </OverflowContainer>
 * );
 *
 * const MyOverflowContainerContent = () => {
 *   const { visibleCount, itemsCount } = OverflowContainer.useContext();
 *
 *   return (
 *     <OverflowContainer.OverflowNode>
 *       <span>And {itemsCount - visibleCount} more...</span>
 *     </OverflowContainer.OverflowNode>
 *   );
 * };
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
 * @param itemsCount Number of items that this element contains.
 * @param orientation 'horizontal' (default) or 'vertical'
 * @returns [callback ref to set on container, stateful count of visible items]
 *
 * @example
 * const items = Array(10).fill().map((_, i) => <span>Item {i}</span>);
 * const [ref, visibleCount] = useOverflow(items.count);
 * ...
 * return (
 *   <div ref={ref}>
 *     {items.slice(0, visibleCount)}
 *   </div>
 * );
 */
const useOverflow = (
  itemsCount: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  const [guessState, dispatch] = React.useReducer(
    overflowGuessReducer,
    { itemsCount },
    overflowGuessReducerInitialState,
  );

  const { minGuess, maxGuess, isStabilized, visibleCount } = guessState;

  const containerRef = React.useRef(null);
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

      // If there are no items, stabilize immediately.
      if (itemsCount === 0) {
        dispatch({ type: 'stabilize' });
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
        (maxGuess - minGuess === 1 && visibleCount === minGuess)
      ) {
        dispatch({ type: 'stabilize' });
        return;
      }

      // Before the main logic, the max guess MUST be >= the correct visibleCount for the algorithm to work.
      // If not:
      // - double the max guess and visibleCount: since we need to overflow.
      // - set min guess to current visibleCount: since underflow means correct visibleCount >= current visibleCount.
      if (maxGuess === visibleCount && !isOverflowing) {
        dispatch({ type: 'shiftGuessRangeForward' });
        return;
      }

      let newMinGuess = minGuess;
      let newMaxGuess = maxGuess;

      if (isOverflowing) {
        // overflowing = we guessed too high. So, new max guess = half the current guess
        newMaxGuess = visibleCount;
      } else {
        // not overflowing = maybe we guessed too low? So, new min guess = half of current guess
        newMinGuess = visibleCount;
      }

      // Next guess is always the middle of the new guess range
      const newVisibleCount = Math.floor((minGuess + maxGuess) / 2);

      // If newVisibleCount is 0 (impossible state as min is 1), end guessing
      if (newVisibleCount === 0) {
        dispatch({ type: 'stabilize' });
        return;
      }

      dispatch({
        type: 'update',
        guessRange: { minGuess: newMinGuess, maxGuess: newMaxGuess },
        visibleCount: newVisibleCount,
      });
    } finally {
      isGuessing.current = false;
    }
  }, [isStabilized, itemsCount, maxGuess, minGuess, orientation, visibleCount]);

  const previousMinGuess = useLatestRef(minGuess);
  const previousMaxGuess = useLatestRef(maxGuess);
  const previousItemsCount = useLatestRef(itemsCount);
  const previousVisibleCount = useLatestRef(visibleCount);
  const previousContainer = useLatestRef(containerRef.current);

  useLayoutEffect(() => {
    // If itemsCount changes, we have to restart guessing.
    if (itemsCount !== previousItemsCount.current) {
      dispatch({ type: 'itemCountChanged', itemsCount });
      return;
    }

    // If stabilized, do not guess.
    if (isStabilized) {
      return;
    }

    // If not stabilized, guess each time any of the guess related values or the container changes.
    if (
      visibleCount !== previousVisibleCount.current ||
      minGuess !== previousMinGuess.current ||
      maxGuess !== previousMaxGuess.current ||
      containerRef.current !== previousContainer.current
    ) {
      previousVisibleCount.current = visibleCount;
      previousMinGuess.current = minGuess;
      previousMaxGuess.current = maxGuess;
      previousContainer.current = containerRef.current;

      guessVisibleCount();
    }
  }, [
    guessVisibleCount,
    isStabilized,
    itemsCount,
    maxGuess,
    minGuess,
    previousContainer,
    previousItemsCount,
    previousMaxGuess,
    previousMinGuess,
    previousVisibleCount,
    visibleCount,
  ]);

  return [containerRef, visibleCount] as const;
};

// ----------------------------------------------------------------------------

type GuessRange = { minGuess: number; maxGuess: number };

type GuessState = (
  | {
      isStabilized: true;
      minGuess: null;
      maxGuess: null;
    }
  | {
      isStabilized: false;
      minGuess: number;
      maxGuess: number;
    }
) & {
  itemsCount: number;
  visibleCount: number;
};

type GuessAction =
  | {
      /**
       * - `"update"`: Update the guess range and visible count.
       */
      type: 'update';
      guessRange: GuessRange;
      visibleCount: number;
    }
  | {
      /**
       * - `"shiftGuessRangeForward"`
       *   - Shift the guess range forward by:
       *     - doubling the max guess
       *     - setting min guess to the current max guess
       *     - setting visible count to the new max guess
       *   - Useful to induce the first overflow to start guessing.
       */
      type: 'shiftGuessRangeForward';
    }
  | {
      /**
       * - `"stabilize"`: Stop guessing as `visibleCount` is the correct value.
       */
      type: 'stabilize';
    }
  | {
      /**
       * - `"itemCountChanged"`: Restart guess from the beginning as the itemsCount has changed.
       */
      type: 'itemCountChanged';
      itemsCount: number;
    };

/** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
const STARTING_MAX_ITEMS_COUNT = 32;

const overflowGuessReducerInitialState = ({
  itemsCount,
}: Pick<GuessState, 'itemsCount'>): GuessState => {
  const initialVisibleCount = Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT);

  // In unit test environments, always show all items
  return isUnitTest
    ? {
        isStabilized: true,
        minGuess: null,
        maxGuess: null,
        itemsCount,
        visibleCount: itemsCount,
      }
    : {
        isStabilized: false,
        minGuess: 0,
        maxGuess: initialVisibleCount,
        itemsCount,
        visibleCount: initialVisibleCount,
      };
};

const overflowGuessReducer = (
  state: GuessState,
  action: GuessAction,
): GuessState => {
  /** Ensure that the visibleCount is always <= itemsCount */
  const getSafeVisibleCount = (visibleCount: number) =>
    Math.min(state.itemsCount, visibleCount);

  switch (action.type) {
    case 'update':
      const { minGuess, maxGuess } = action.guessRange;

      return {
        ...state,
        isStabilized: false,
        minGuess,
        maxGuess,
        visibleCount: getSafeVisibleCount(action.visibleCount),
      };
    case 'shiftGuessRangeForward':
      if (state.isStabilized) {
        return state;
      }

      const doubleOfMaxGuess = state.maxGuess * 2;

      return {
        ...state,
        isStabilized: false,
        minGuess: state.maxGuess,
        maxGuess: doubleOfMaxGuess,
        visibleCount: getSafeVisibleCount(state.maxGuess * 2),
      };
    case 'itemCountChanged':
      if (!state.isStabilized) {
        return state;
      }

      return overflowGuessReducerInitialState({
        itemsCount: action.itemsCount,
      });
    case 'stabilize':
      return {
        ...state,
        isStabilized: true,
        minGuess: null,
        maxGuess: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------------

function useOverflowContainerContext() {
  const overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
}
