/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { useLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useSafeContext } from '../hooks/useSafeContext.js';
import { isUnitTest } from '../functions/dev.js';
import { useResizeObserver } from '../hooks/useResizeObserver.js';

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
  /**
   * Value of the `justify-content` property.
   * Useful for aligning items to the right when overflowOrientation is 'horizontal'.
   * @default 'flex-start'
   */
  justifyContent?: React.CSSProperties['justifyContent'];
};

/**
 * Useful to handle overflow of items in a container.
 * Also listens to resize changes along the overflowOrientation.
 *
 * API:
 * - Use `OverflowContainer.useContext()` to get overflow related properties.
 * - Wrap overflow content in `OverflowContainer.OverflowNode` to conditionally render it when overflowing.
 *
 * @example
 * const items = Array(10)
 *   .fill(null)
 *   .map((_, i) => <span>Item {i}</span>);
 *
 * return (
 *   <OverflowContainer itemsCount={items.length}>
 *     <MyOverflowContainerContent />
 *   </OverflowContainer>
 * );
 *
 * const MyOverflowContainerContent = () => {
 *   const { visibleCount, itemsCount } = OverflowContainer.useContext();
 *
 *   return (
 *     <>
 *       {items.slice(0, visibleCount)}
 *       <OverflowContainer.OverflowNode>
 *         <span>+{itemsCount - visibleCount} more...</span>
 *       </OverflowContainer.OverflowNode>
 *     </>
 *   );
 * };
 */
const OverflowContainerMain = React.forwardRef((props, forwardedRef) => {
  const { itemsCount, children, overflowOrientation, justifyContent, ...rest } =
    props;

  const [containerRef, visibleCount, isStabilized] = useOverflow(
    itemsCount,
    overflowOrientation,
  );

  const overflowContainerContextValue = React.useMemo(
    () => ({ visibleCount, itemsCount }),
    [itemsCount, visibleCount],
  );

  // Only apply justifyContent after overflow detection is stabilized
  // to avoid interfering with the measurement algorithm
  const appliedJustifyContent = isStabilized ? justifyContent : undefined;

  return (
    <OverflowContainerContext.Provider value={overflowContainerContextValue}>
      <Box
        ref={useMergedRefs(forwardedRef, containerRef)}
        {...rest}
        style={
          {
            ...rest.style,
            justifyContent: appliedJustifyContent,
          } as React.CSSProperties
        }
      >
        {children}
      </Box>
    </OverflowContainerContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  OverflowContainerProps & {
    overflowOrientation: Required<OverflowContainerProps>['overflowOrientation'];
  }
>;

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

const OverflowContainerComponent = React.forwardRef((props, forwardedRef) => {
  const {
    itemsCount,
    overflowOrientation = 'horizontal',
    justifyContent,
    ...rest
  } = props;

  const [size, setSize] = React.useState<DOMRectReadOnly | null>(null);
  const [resizeRef] = useResizeObserver(setSize);

  const ref = useMergedRefs(resizeRef, forwardedRef);

  const key =
    `${itemsCount}` +
    `${overflowOrientation === 'vertical' ? size?.height : size?.width}`;

  return (
    <OverflowContainerMain
      {...rest}
      key={key}
      ref={ref}
      itemsCount={itemsCount}
      overflowOrientation={overflowOrientation}
      justifyContent={justifyContent}
    />
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;

// ----------------------------------------------------------------------------

/**
 * @private
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
 * @private
 * Hook that returns the number of items that should be visible based on the size of the container element.
 *
 * The returned number should be used to render the element with fewer items.
 *
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

  const containerRef = React.useRef(null);
  const isGuessing = React.useRef(false);

  // Guess the visible count until stabilized.
  // To prevent flicking, use useLayoutEffect to paint only after stabilized.
  useLayoutEffect(() => {
    const { minGuess, maxGuess, isStabilized, visibleCount } = guessState;

    if (isStabilized) {
      return;
    }

    guessVisibleCount();

    /**
     * Call this function to guess the new `visibleCount`.
     * The `visibleCount` is not changed if the correct `visibleCount` has already been found.
     *
     * The logic of finding the correct `visibleCount` is similar to binary search.
     * Logic (without all edge cases):
     * - Have a guess range for `visibleCount` of `(0, x]` (0 is exclusive and x is inclusive)
     *   - 0 is exclusive as the minimum `visibleItems` always has to be 1.
     *     - The only exception is when the `itemsCount` is itself 0.
     *   - x can be an any arbitrary number ≤ `itemsCount`.
     * - Initial `visibleCount` = max guess.
     * - We NEED an overflow in the beginning for the algorithm to work.
     *   - Because the max guess should always be `≥` the correct `visibleCount`.
     * - So, if not overflow, shift the guess range forward by:
     *   - doubling the max guess: since we need to overflow
     *   - setting min guess to current visibleCount: since not overflow means correct visibleCount ≥ current visibleCount
     *   - setting visible count to the new max guess
     * - Shift the guess range forward repeatedly until the container overflows.
     * - After the first overflow, `visibleCount` = average of the two guesses.
     * - Repeat the following (`guessVisibleCount()`):
     *   - If container overflows, new max guess = current `visibleCount`.
     *   - If container does not overflow, new min guess = current `visibleCount`.
     *   - new `visibleCount` = the average of the new min and max guesses.
     * - Stop when the average of the two guesses is the min guess itself. i.e. no more averaging possible.
     * - The min guess is then the correct `visibleCount`.
     */
    function guessVisibleCount() {
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
          // there are no items
          itemsCount === 0 ||
          // overflowing when even 1 item is present
          (visibleCount === 1 && isOverflowing) ||
          // no overflow when rendering all items
          (visibleCount === itemsCount && !isOverflowing) ||
          // if the new average of the guess range will never change the visibleCount anymore (infinite loop)
          (maxGuess - minGuess === 1 && visibleCount === minGuess)
        ) {
          dispatch({ type: 'stabilize' });
          return;
        }

        // Before the main logic, the max guess MUST be ≥ the correct visibleCount for the algorithm to work.
        // If not, should shift the guess range forward to induce the first overflow.
        if (maxGuess === visibleCount && !isOverflowing) {
          dispatch({ type: 'shiftGuessRangeForward' });
          return;
        }

        if (isOverflowing) {
          // overflowing = we guessed too high. So, decrease max guess
          dispatch({ type: 'decreaseMaxGuess', currentState: guessState });
        } else {
          // not overflowing = maybe we guessed too low? So, increase min guess
          dispatch({ type: 'increaseMinGuess', currentState: guessState });
        }
      } finally {
        isGuessing.current = false;
      }
    }
  }, [guessState, itemsCount, orientation]);

  return [
    containerRef,
    guessState.visibleCount,
    guessState.isStabilized,
  ] as const;
};

// ----------------------------------------------------------------------------

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
       * - `"decreaseMaxGuess"`: When overflowing, do the following:
       *   - New `maxGuess` = current `visibleCount`.
       *   - New `visibleCount` = average of the `minGuess` and new `maxGuess`.
       */
      type: 'decreaseMaxGuess';
      /**
       * Needed to prevent using stale state in the reducer function when in `StrictMode`.
       *
       * @see https://github.com/iTwin/iTwinUI/pull/2340
       */
      currentState: GuessState;
    }
  | {
      /**
       * - `"increaseMinGuess"`: When not overflowing, do the following:
       *   - New `minGuess` = current `visibleCount`.
       *   - New `visibleCount` = average of the `maxGuess` and new `minGuess`.
       */
      type: 'increaseMinGuess';
      /**
       * Needed to prevent using stale state in the reducer function when in `StrictMode`.
       *
       * @see https://github.com/iTwin/iTwinUI/pull/2340
       */
      currentState: GuessState;
    }
  | {
      /**
       * - `"shiftGuessRangeForward"`: Useful to induce the first overflow to start guessing.
       *   - Shift the guess range forward by:
       *     - doubling the max guess: since we need to overflow
       *     - setting min guess to current visibleCount: since underflow means correct visibleCount ≥ current
       *       visibleCount
       *     - setting visible count to the new max guess
       */
      type: 'shiftGuessRangeForward';
    }
  | {
      /**
       * - `"stabilize"`: Stop guessing as `visibleCount` is the correct value.
       */
      type: 'stabilize';
    };

/** Arbitrary initial max guess for `visibleCount`. We refine this max guess with subsequent renders. */
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
  /** Ensure that the `visibleCount` is always ≤ `itemsCount` */
  const getSafeVisibleCount = ({
    visibleCount,
    itemsCount,
  }: {
    visibleCount: number;
    itemsCount: number;
  }) => Math.min(itemsCount, visibleCount);

  switch (action.type) {
    case 'decreaseMaxGuess':
    case 'increaseMinGuess':
      if (state.isStabilized) {
        return state;
      }

      let newMinGuess = state.minGuess;
      let newMaxGuess = state.maxGuess;

      // Using `action.currentState` instead of `state` to prevent stale visibleCount when in StrictMode
      // @see https://github.com/iTwin/iTwinUI/pull/2340
      if (action.type === 'decreaseMaxGuess') {
        newMaxGuess = action.currentState.visibleCount;
      } else {
        newMinGuess = action.currentState.visibleCount;
      }

      // Next guess is always the middle of the new guess range
      const newVisibleCount = Math.floor((newMinGuess + newMaxGuess) / 2);

      return {
        ...state,
        isStabilized: false,
        minGuess: newMinGuess,
        maxGuess: newMaxGuess,
        visibleCount: getSafeVisibleCount({
          visibleCount: newVisibleCount,
          itemsCount: state.itemsCount,
        }),
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
        visibleCount: getSafeVisibleCount({
          visibleCount: doubleOfMaxGuess,
          itemsCount: state.itemsCount,
        }),
      };
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
