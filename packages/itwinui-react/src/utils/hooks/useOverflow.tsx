/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useMergedRefs } from './useMergedRefs.js';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';
import { Box } from '../components/Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
// import usePrevious from './usePrevious.js';
import { useLatestRef } from './useLatestRef.js';
// import usePrevious from './usePrevious.js';

/** `[number, number]` means that we're still guessing. `null` means that we got the correct `visibleCount`. */
type GuessRange = [number, number] | null;

/** First guess of the number of items that overflows. We refine this guess with subsequent renders. */
const STARTING_MAX_ITEMS_COUNT = 2;

/**
 * Hook that returns the number of items that should be visible based on the size of the container element.
 *
 * The returned number should be used to render the element with fewer items.
 *
 * This hook does not observe the size of an element. To listen to container size changes, consider `OverflowContainer`.
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
export const useOverflow = (
  // TODO: Try more to remove this prop, if possible.
  itemsLength: number,
  disabled = false,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  containerRefProp: React.RefObject<HTMLElement> | undefined,
) => {
  // const fallbackContainerRef = React.useRef<T>(null);
  const _containerRef = containerRefProp;
  const containerRef = useLatestRef(_containerRef?.current);

  const initialVisibleCount = Math.min(itemsLength, STARTING_MAX_ITEMS_COUNT);

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

  const [visibleCountGuessRange, setVisibleCountGuessRange] =
    React.useState<GuessRange>(disabled ? null : [0, initialVisibleCount]);

  /**
   * Call this function to guess the new `visibleCount`.
   * The `visibleCount` is not changed if the correct `visibleCount` has already been found.
   */
  const isGuessing = React.useRef(false);
  const guessVisibleCount = React.useCallback(() => {
    // If disabled or already stabilized
    if (disabled || visibleCountGuessRange == null || isGuessing.current) {
      return;
    }

    isGuessing.current = true;

    // We need to wait for the ref to be attached so that we can measure available and required sizes.
    if (containerRef?.current == null) {
      return;
    }

    try {
      const dimension = orientation === 'horizontal' ? 'Width' : 'Height';
      const availableSize = containerRef.current[`offset${dimension}`];
      const requiredSize = containerRef.current[`scroll${dimension}`];

      const isOverflowing = availableSize < requiredSize;

      console.log('RUNNING', {
        visibleCountGuessRange: visibleCountGuessRange.toString(),
        myRef: containerRef.current,
        // isOverflowing,
        visibleCount,
        availableSize,
        requiredSize,
      });

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

        // console.log('DOUBLING', {
        //   visibleCountGuessRange: visibleCountGuessRange.toString(),
        //   isOverflowing,
        //   visibleCount,
        //   availableSize,
        //   requiredSize,
        //   newRange: [visibleCount, doubleOfMaxGuess],
        //   newVisibleCount: doubleOfMaxGuess,
        // });
        console.log(
          'doubling',
          [visibleCount, doubleOfMaxGuess],
          doubleOfMaxGuess,
        );
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

    // queueMicrotask(() => {
    //   guessVisibleCount();
    // })
  }, [
    containerRef,
    disabled,
    itemsLength,
    orientation,
    setVisibleCount,
    visibleCount,
    visibleCountGuessRange,
  ]);

  // const previousVisibleCount = usePrevious(visibleCount);
  // const previousVisibleCountGuessRange = usePrevious(visibleCountGuessRange);
  // const previousContainerRef = usePrevious(containerRef);

  // useLayoutEffect(() => {
  //   if (disabled) {
  //     return;
  //   }

  //   console.log(
  //     'CHECKING',
  //     visibleCount !== previousVisibleCount,
  //     containerRef !== previousContainerRef,
  //     visibleCount,
  //     previousVisibleCount,
  //     containerRef,
  //     previousContainerRef,
  //   );

  //   if (
  //     visibleCount !== previousVisibleCount ||
  //     containerRef !== previousContainerRef
  //     // ||
  //     // !!visibleCountGuessRange != !!previousVisibleCountGuessRange ||
  //     // (visibleCountGuessRange != null &&
  //     //   previousVisibleCountGuessRange != null &&
  //     //   (visibleCountGuessRange[0] !== previousVisibleCountGuessRange[0] ||
  //     //     visibleCountGuessRange[1] !== previousVisibleCountGuessRange[1]))
  //   ) {
  //     guessVisibleCount();
  //   }
  // }, [
  //   containerRef,
  //   disabled,
  //   guessVisibleCount,
  //   previousContainerRef,
  //   previousVisibleCount,
  //   previousVisibleCountGuessRange,
  //   visibleCount,
  //   visibleCountGuessRange,
  // ]);

  // const guessVisibleCountCalled = React.useRef(false);

  // TODO: Replace eslint-disable with proper listening to containerRef resize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    // if (disabled || guessVisibleCountCalled.current) {
    //   return;
    // }
    // guessVisibleCountCalled.current = true;
    if (disabled) {
      return;
    }

    guessVisibleCount();
    // }, [disabled, guessVisibleCount]);
  });

  const mergedRefs = useMergedRefs(containerRef);

  return [mergedRefs, visibleCount] as const;
};

// ----------------------------------------------------------------------------

type OverflowContainerProps = {
  overflowTag: (visibleCount: number) => React.ReactNode;
  /**
   * Where the overflowTag is placed. Values:
   * - end: At the end
   * - center: After the first item
   * @default 'end'
   */
  overflowTagLocation?: 'center' | 'end';
  children: React.ReactNode[];
  /**
   * Use this optional prop when the `OverflowContainer` is not the overflowing container.
   */
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * The number of items will always be >= `minVisibleCount`
   * @default 1
   */
  minVisibleCount?: number;
};

export const OverflowContainer = React.forwardRef((props, ref) => {
  const {
    overflowTag,
    overflowTagLocation = 'end',
    children,
    containerRef: containerRefProp,
    minVisibleCount = 1,
    ...rest
  } = props;

  // const containerRef = React.useContext(OverflowContainerContext)?.containerRef;
  const containerRef = containerRefProp;

  // TODO: Should this be children.length + 1?
  // Because if there are 10 items and visibleCount is 10,
  // how do we know whether to display 10 items vs 9 items and 1 overflow tag?
  const [overflowContainerRef, _visibleCount] = useOverflow(
    children.length + 1,
    undefined,
    undefined,
    containerRef,
  );
  const visibleCount = Math.max(_visibleCount, minVisibleCount);

  // console.log('children', children.length, visibleCount);

  /**
   * - `visibleCount === children.length + 1` means that we show all children and no overflow tag.
   * - `visibleCount <= children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const itemsToRender = React.useMemo(() => {
    if (visibleCount > children.length) {
      return [children, [], []];
    }

    // TODO: Fix some off by one errors. It is visible when visibleCount = children.length - 1
    if (overflowTagLocation === 'center') {
      return visibleCount >= 3
        ? [
            children[0],
            overflowTag(visibleCount - 1),
            children.slice(children.length - (visibleCount - 2)),
          ]
        : visibleCount === 2
          ? [
              [
                [],
                overflowTag(2 - 1),
                children.slice(children.length - (visibleCount - 1)),
              ],
            ]
          : [
              [],
              overflowTag(1 - 1),
              children.slice(children.length - (visibleCount - 1)),
            ];
    }
    return [children.slice(0, visibleCount - 1), [], overflowTag(visibleCount)];
  }, [children, overflowTag, overflowTagLocation, visibleCount]);

  return (
    <Box
      ref={useMergedRefs(
        ref,
        containerRef == null ? overflowContainerRef : undefined,
      )}
      {...rest}
    >
      {itemsToRender[0]}
      {itemsToRender[1]}
      {itemsToRender[2]}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;

// ----------------------------------------------------------------------------

// export const OverflowContainerContext = React.createContext<{
//   containerRef: React.RefObject<HTMLElement>;
// } | null>(null);
