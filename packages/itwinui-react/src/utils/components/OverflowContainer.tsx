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

  return isOverflowing && children;
};

// ----------------------------------------------------------------------------

export const OverflowContainer = Object.assign(OverflowContainerComponent, {
  /**
   * Wrap overflow content in this component to conditionally render it when overflowing.
   */
  OverflowNode: OverflowContainerOverflowNode,
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

export const useOverflowContainerContext = () => {
  const overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
};
