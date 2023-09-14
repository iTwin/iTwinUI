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
  useHover,
  useFocus,
  safePolygon,
  useRole,
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
import { ThemeProvider } from '../../ThemeProvider/index.js';

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
   * Callback invoked every time the popover visibility changes as a result
   * of internal logic. Should be used alongside `visible` prop.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * If true, the popover will close when clicking outside it.
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
};

// keep public api small to start with
type PopoverInternalProps = {
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
     * Use this if you want popover to follow moving trigger element
     */
    animationFrame?: boolean;
    layoutShift?: boolean;
  };
  /**
   * Middleware options.
   *
   * @see https://floating-ui.com/docs/offset
   */
  middleware?: {
    offset?: number;
    flip?: boolean;
    shift?: boolean;
    autoPlacement?: boolean;
    hide?: boolean;
    inline?: boolean;
  };
  /**
   * By default, the popover will only open on click.
   * `hover` and `focus` can be manually specified as triggers.
   */
  trigger?: Partial<Record<'hover' | 'click' | 'focus', boolean>>;
  role?: 'dialog' | 'menu' | 'listbox';
};

// ----------------------------------------------------------------------------

export const usePopover = (options: PopoverOptions & PopoverInternalProps) => {
  const {
    placement = 'bottom-start',
    visible,
    onVisibleChange,
    closeOnOutsideClick,
    autoUpdateOptions,
    middleware = { flip: true, shift: true },
    matchWidth,
    trigger = { click: true, hover: false, focus: false },
    role,
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
    middleware: [
      middleware.offset !== undefined && offset(middleware.offset),
      middleware.flip && flip(),
      middleware.shift && shift(),
      matchWidth &&
        size({
          apply: ({ rects }) => {
            setReferenceWidth(rects.reference.width);
          },
        } as SizeOptions),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const interactions = useInteractions([
    useClick(floating.context, { enabled: !!trigger.click }),
    useDismiss(floating.context, { outsidePress: closeOnOutsideClick }),
    useHover(floating.context, {
      enabled: !!trigger.hover,
      delay: 100,
      handleClose: safePolygon({ buffer: 1 }),
    }),
    useFocus(floating.context, { enabled: !!trigger.focus }),
    useRole(floating.context, { role: 'dialog', enabled: !!role }),
  ]);

  const [referenceWidth, setReferenceWidth] = React.useState<number>();

  const getFloatingProps = React.useCallback(
    (userProps?: React.HTMLProps<HTMLElement>) =>
      interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          zIndex: 9999,
          ...(matchWidth && referenceWidth
            ? {
                minInlineSize: `${referenceWidth}px`,
                maxInlineSize: `min(${referenceWidth * 2}px, 90vw)`,
              }
            : {}),
          ...userProps?.style,
        },
      }),
    [floating.floatingStyles, interactions, matchWidth, referenceWidth],
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

type PopoverPublicProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  applyBackground?: boolean;
} & PortalProps &
  PopoverOptions;

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
    closeOnOutsideClick,
    matchWidth,
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
    closeOnOutsideClick,
    matchWidth,
    role: 'dialog',
  });

  const [popoverElement, setPopoverElement] = React.useState<HTMLElement>();

  const popoverRef = useMergedRefs(
    popover.refs.setFloating,
    forwardedRef,
    setPopoverElement,
  );

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...popover.getReferenceProps(children.props),
        ref: popover.refs.setReference,
      }))}

      {popover.open ? (
        <Portal portal={portal}>
          <ThemeProvider
            portalContainer={popoverElement} // portal nested popovers into this one
          >
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
          </ThemeProvider>
        </Portal>
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverPublicProps>;

export default Popover;
