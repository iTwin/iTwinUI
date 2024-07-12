import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import { useOverflow } from '../hooks/useOverflow.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';

type OverflowContainerProps = {
  /**
   * // TODO: What happens with overflowDisabled=true and children=function?
   * If the overflow detection is disabled, visibleCount stays.
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

  const [containerRef, visibleCount] = useOverflow(
    typeof children === 'function' ? itemsLength ?? 0 : children.length + 1,
    overflowDisabled,
    overflowOrientation,
  );

  /**
   * - `visibleCount === children.length + 1` means that we show all children and no overflow tag.
   * - `visibleCount <= children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const itemsToRender = React.useMemo(() => {
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
      {typeof children === 'function' ? children(visibleCount) : itemsToRender}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;
