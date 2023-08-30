/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  size,
  autoUpdate,
  offset,
  flip,
  shift,
  autoPlacement,
  inline,
  hide,
  FloatingFocusManager,
} from '@floating-ui/react';
import type { SizeOptions, Placement } from '@floating-ui/react';
import {
  Box,
  cloneElementWithRef,
  useControlledState,
  useMergedRefs,
} from '../index.js';
import type { PolymorphicForwardRefComponent } from '../index.js';
import { Portal } from './Portal.js';
import type { PortalProps } from './Portal.js';
import { Surface } from '../../Surface/index.js';

type PopoverOptions = {
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   */
  placement?: Placement;
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;

  /**
   * Callback invoked every time the tooltip visibility changes as a result
   * of internal logic. Should be used alongside `visible` prop.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * If true, the popover will close when clicking outside it.
   */
  closeOnOutsideClick?: boolean;
  /**
   * autoUpdate options that recalculates position
   * to ensure the floating element remains anchored
   * to its reference element, such as when scrolling
   * and resizing the screen
   *
   * https://floating-ui.com/docs/autoUpdate#options
   */
  autoUpdateOptions?: {
    ancestorScroll?: boolean;
    ancestorResize?: boolean;
    elementResize?: boolean;
    /**
     * Use this if you want Tooltip to follow moving trigger element
     */
    animationFrame?: boolean;
    layoutShift?: boolean;
  };
  /**
   * Tooltip middleware options.
   * https://floating-ui.com/docs/offset
   */
  middleware?: {
    offset?: number;
    flip?: boolean;
    shift?: boolean;
    // size?: boolean; // TODO: decide if it makes sense to expose
    autoPlacement?: boolean;
    hide?: boolean;
    inline?: boolean;
  };
  /**
   * Use an external element (stored in state) as the trigger.
   */
  reference?: HTMLElement | null;
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
};

type PopoverOwnProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  applyBackground?: boolean;
} & PortalProps;

// ----------------------------------------------------------------------------

export const usePopover = (options: PopoverOptions) => {
  const {
    reference,
    closeOnOutsideClick: onClickOutsideClose,
    placement = 'bottom-start',
    visible,
    onVisibleChange,
    autoUpdateOptions,
    middleware = { flip: true, shift: true },
    matchWidth,
  } = options;

  const [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange,
  );

  const floating = useFloating({
    placement,
    open,
    onOpenChange,
    whileElementsMounted: (...args) => autoUpdate(...args, autoUpdateOptions),
    ...(reference && { elements: { reference } }),
    middleware: [
      middleware.offset !== undefined && offset(middleware.offset),
      middleware.flip && flip(),
      middleware.shift && shift(),
      matchWidth &&
        size({
          apply: ({ rects, elements }) => {
            Object.assign(elements.floating.style, {
              minInlineSize: `${rects.reference.width}px`,
              maxInlineSize: `min(${rects.reference.width * 2}px, 90vw)`,
            });
          },
        } as SizeOptions),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const interactions = useInteractions([
    useClick(floating.context),
    useDismiss(floating.context, { outsidePress: onClickOutsideClose }),
  ]);

  const getFloatingProps = React.useCallback(
    (userProps?: React.HTMLProps<HTMLElement>) =>
      interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          ...userProps?.style,
        },
      }),
    [floating.floatingStyles, interactions],
  );

  return React.useMemo(
    () => ({
      open,
      onOpenChange,
      ...interactions,
      getFloatingProps,
      ...floating,
    }),
    [open, onOpenChange, interactions, getFloatingProps, floating],
  );
};

// ----------------------------------------------------------------------------

/**
 * A utility component to help with positioning of floating content.
 * Built on top of [`floating-ui`](https://floating-ui.com/)
 */
export const Popover = React.forwardRef((props, forwardedRef) => {
  const {
    portal = true,
    //
    // popover options
    visible,
    placement,
    onVisibleChange,
    reference,
    matchWidth,
    middleware,
    autoUpdateOptions,
    closeOnOutsideClick,
    //
    // dom props
    children,
    content,
    applyBackground,
    ...rest
  } = props;

  const popover = usePopover({
    visible,
    placement,
    onVisibleChange,
    reference,
    matchWidth,
    middleware,
    autoUpdateOptions,
    closeOnOutsideClick: closeOnOutsideClick,
  });
  const popoverRef = useMergedRefs(popover.refs.setFloating, forwardedRef);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...popover.getReferenceProps(children.props),
        ref: popover.refs.setReference,
      }))}

      {popover.open ? (
        <Portal portal={portal}>
          <FloatingFocusManager
            context={popover.context}
            modal={false}
            initialFocus={-1}
            returnFocus
          >
            <Box
              as={(applyBackground ? Surface : 'div') as 'div'}
              {...popover.getFloatingProps(rest)}
              ref={popoverRef}
            >
              {content}
            </Box>
          </FloatingFocusManager>
        </Portal>
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;

export default Popover;
