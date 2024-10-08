/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { useOverflow } from '../hooks/useOverflow.js';
import { useSafeContext } from '../hooks/useSafeContext.js';

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

const OverflowContainerComponent = React.forwardRef((props, ref) => {
  const { itemsCount, children, overflowOrientation, ...rest } = props;

  const [containerRef, visibleCount] = useOverflow(
    itemsCount,
    false,
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

function useOverflowContainerContext() {
  const overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
}
