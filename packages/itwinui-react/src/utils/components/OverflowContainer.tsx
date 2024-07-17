import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { useResizeObserver } from '../hooks/useResizeObserver.js';
import { useLatestRef } from '../hooks/useLatestRef.js';
import { useLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';

type OverflowContainerProps = {
  /**
   * If the overflow detection is disabled, all items will be displayed.
   * @default false
   */
  overflowDisabled?: boolean;
  /**
   * The orientation of the overflow in container.
   * @default 'horizontal'
   */
  overflowOrientation?: 'horizontal' | 'vertical';
} & (
  | {
      children: React.ReactNode[];
      /**
       * Number of items to display. Since overflow detection considers *all* children, `itemsLength` may need to
       * account for the `overflowTag` depending on your implementation to prevent off-by-one errors.
       *
       * Required if `children: React.ReactNode[]`.
       */
      itemsLength?: undefined;
      /**
       * What is rendered at `overflowLocation` when `OverflowContainer` starts overflowing.
       *
       * Required if `children: React.ReactNode[]`.
       */
      overflowTag: (visibleCount: number) => React.ReactNode;
      /**
       * Where the overflowTag is placed. Values:
       * - start: At the start
       * - end: At the end
       * @default 'end'
       */
      overflowLocation?: 'start' | 'end';
    }
  | {
      children: (visibleCount: number) => React.ReactNode;
      itemsLength: number;
      overflowTag?: undefined;
      overflowLocation?: undefined;
    }
);

/**
 * Renders fewer children + an `overflowTag` when it starts overflowing. When not overflowing, it renders all children.
 * This component listens to resize events and updates the rendered content accordingly.
 *
 * Two forms of usage:
 * 1. `children: React.ReactNode[]`: Pass all the children and an `overflowTag` and this component handles when to show
 * what, depending on whether the component is overflowing.
 * 2. `children: (visibleCount: number) => React.ReactNode`: For more customization, pass a function to get the
 * `visibleCount` and then render custom content based on that.
 *
 * @example
 * <OverflowContainer
 *   as={MyComponent}
 *   overflowTag={(visibleCount) => (
 *     <Text>+${tags.length - (visibleCount - 1)} item(s)</Text> // -1 to account for the overflowTag
 *   )}
 *   overflowLocation='start'
 * >
 *   {items}
 * </OverflowContainer>
 *
 * @example
 * <OverflowContainer
 *   as={MyComponent}
 *   itemsLength={text.length}
 * >
 *   {(visibleCount) => {
 *     // Custom content dependent on visibleCount
 *     return (
 *       <>
 *         itemsLeft(visibleCount)
 *         overflowButton(visibleCount)
 *         itemsRight(visibleCount)
 *       </>
 *     );
 *   }
 * </OverflowContainer>
 */
export const OverflowContainer = React.forwardRef((props, ref) => {
  const {
    overflowTag,
    overflowLocation = 'end',
    children,
    itemsLength,
    overflowDisabled = false,
    overflowOrientation,
    ...rest
  } = props;

  const [containerRef, _visibleCount] = useOverflow(
    typeof children === 'function' ? itemsLength ?? 0 : children.length + 1,
    overflowDisabled,
    overflowOrientation,
  );

  // Minimum visibleCount of 1 since we always at least show the `overflowTag` in small sizes.
  const visibleCount = Math.max(_visibleCount, 1);

  /**
   * - `visibleCount === children.length + 1` means that we show all children and no overflow tag.
   * - `visibleCount <= children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const visibleItems = React.useMemo(() => {
    // User wants complete control over what items are rendered.
    if (typeof children === 'function' || overflowTag == null) {
      return null;
    }

    if (visibleCount > children.length) {
      return children;
    }

    if (overflowLocation === 'start') {
      return (
        <>
          {overflowTag(visibleCount - 2)}
          {children.slice(children.length - (visibleCount - 1))}
        </>
      );
    }

    return (
      <>
        {children.slice(0, visibleCount - 1)}
        {overflowTag(visibleCount)}
      </>
    );
  }, [children, overflowTag, overflowLocation, visibleCount]);

  return (
    <Box ref={useMergedRefs(ref, containerRef)} {...rest}>
      {typeof children === 'function' ? children(visibleCount) : visibleItems}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;

// ----------------------------------------------------------------------------

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
const useOverflow = <T extends HTMLElement>(
  itemsLength: number,
  disabled = false,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  /** `[number, number]` means that we're still guessing. `null` means that we got the correct `visibleCount`. */
  type GuessRange = [number, number] | null;

  /** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
  const STARTING_MAX_ITEMS_COUNT = 32;

  const containerRef = React.useRef<T>(null);

  const initialVisibleCount = React.useMemo(
    () =>
      disabled ? itemsLength : Math.min(itemsLength, STARTING_MAX_ITEMS_COUNT),
    [disabled, itemsLength],
  );
  const initialVisibleCountGuessRange = React.useMemo(
    () => (disabled ? null : ([0, initialVisibleCount] satisfies GuessRange)),
    [disabled, initialVisibleCount],
  );

  const [visibleCount, _setVisibleCount] =
    React.useState<number>(initialVisibleCount);
  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>(initialVisibleCountGuessRange);

  const isStabilized = visibleCountGuessRange == null;

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

  // Guess each time any of the following changes:
  // - `visibleCount`
  // - `visibleCountGuessRange`
  // - `containerRef`
  useLayoutEffect(() => {
    if (disabled || isStabilized) {
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
