/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { mergeRefs, useMergedRefs } from '../hooks/useMergedRefs.js';
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
};

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
const OverflowContainerComponent = React.forwardRef((props, ref) => {
  const { items, children, overflowOrientation, ...rest } = props;

  const [containerRef, visibleCount] = useOverflow(
    items,
    false,
    overflowOrientation,
  );

  return (
    <OverflowContainerContext.Provider
      value={{ visibleCount, itemCount: items.length }}
    >
      <Box ref={useMergedRefs(ref, containerRef)} {...rest}>
        {children}
      </Box>
    </OverflowContainerContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;

// ----------------------------------------------------------------------------

const OverflowContainerOverflowNode = React.forwardRef((props, ref) => {
  const overflowContainerContext = React.useContext(OverflowContainerContext);
  const isOverflowing =
    overflowContainerContext != null &&
    overflowContainerContext.visibleCount < overflowContainerContext.itemCount;

  return isOverflowing && <Box ref={mergeRefs(ref)} {...props} />;
});

// ----------------------------------------------------------------------------

export const OverflowContainer = Object.assign(OverflowContainerComponent, {
  OverflowNode: OverflowContainerOverflowNode,
});

// ----------------------------------------------------------------------------

export const OverflowContainerContext = React.createContext<
  | {
      visibleCount: number;
      itemCount: number;
    }
  | undefined
>(undefined);
