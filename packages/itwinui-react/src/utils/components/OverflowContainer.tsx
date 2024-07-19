/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { useOverflow } from '../hooks/useOverflow.js';

type OverflowContainerProps = {
  /**
   * The orientation of the overflow in container.
   * @default 'horizontal'
   */
  overflowOrientation?: 'horizontal' | 'vertical';
  /**
   * TODO: Will be removed in a later PR in the stacked PRs.
   */
  items: React.ReactNode[] | string;
} & (
  | {
      children: React.ReactNode[];
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
    items,
    children,
    overflowOrientation,
    ...rest
  } = props;

  const [containerRef, visibleCount] = useOverflow(
    items,
    false,
    overflowOrientation,
  );

  /**
   * - `visibleCount === children.length` means that we show all children and no overflow tag.
   * - `visibleCount < children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const visibleItems = React.useMemo(() => {
    // Consumer wants complete control over what items are rendered.
    if (typeof children === 'function' || overflowTag == null) {
      return null;
    }

    if (visibleCount >= children.length) {
      return children;
    }

    if (overflowLocation === 'start') {
      return (
        <>
          {overflowTag(visibleCount)}
          {children.slice(children.length - (visibleCount - 1))}
        </>
      );
    }

    return (
      <>
        {React.Children.toArray(children).slice(0, visibleCount - 1)}
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
