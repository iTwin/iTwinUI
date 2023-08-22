/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  size,
  autoUpdate,
  offset,
  flip,
  shift,
  autoPlacement,
  inline,
  hide,
  safePolygon,
  FloatingFocusManager,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { Box, getDocument, mergeRefs, useMergedRefs } from '../index.js';
import type { PolymorphicForwardRefComponent } from '../index.js';

type PopoverOptions = {
  /**
   *
   */
  placement?: Placement;
  /**
   *
   */
  visible?: boolean;
  /**
   *
   */
  onToggleVisible?: (open: boolean) => void;
  /**
   *
   */
  onClickOutsideClose?: boolean;
  /**
   *
   */
  hover?: boolean;
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
    size?: boolean;
    autoPlacement?: boolean;
    hide?: boolean;
    inline?: boolean;
  };
  reference?: HTMLElement | null;
};

type PopoverOwnProps = {
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   */
  placement?: Placement;
  content?: React.ReactNode;
  children?: React.ReactNode;
  applyBackground?: boolean;
  portal?: boolean | { to: HTMLElement };
};

/**
 * A utility component to help with positioning of floating content.
 * Built on top of [`floating-ui`](https://floating-ui.com/)
 */
export const Popover = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    content,
    className,
    style,
    portal = true,
    applyBackground = false,
    reference,
    onClickOutsideClose,
    hover: hoverProp,
    placement = 'bottom-start',
    visible: controlledOpen,
    onToggleVisible,
    autoUpdateOptions,
    middleware = { flip: true, shift: true },
    ...rest
  } = props;

  const portalTo = usePortalTo(portal);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>();
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onToggleVisible ?? setUncontrolledOpen;

  const floating = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, autoUpdateOptions),
    elements: { reference },
    middleware: [
      middleware.offset !== undefined && offset(middleware.offset),
      middleware.flip && flip(),
      middleware.shift && shift(),
      middleware.size && size(),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(floating.context),
    useDismiss(floating.context, { outsidePress: onClickOutsideClose }),
    useRole(floating.context, { enabled: false }), // TODO: Fix roles in all components,
    useHover(floating.context, {
      enabled: !!hoverProp,
      handleClose: safePolygon(),
    }),
  ]);

  const contentBox = (
    <FloatingFocusManager
      context={floating.context}
      modal={false}
      initialFocus={-1}
      returnFocus
      guards={false}
    >
      <Box
        className={cx('iui-popover', className)}
        data-iui-apply-background={applyBackground ? true : undefined}
        style={{ ...floating.floatingStyles, ...style }}
        {...getFloatingProps(rest)}
        ref={useMergedRefs(floating.refs.setFloating, forwardedRef)}
      >
        {content}
      </Box>
    </FloatingFocusManager>
  );

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children as JSX.Element, {
            ...getReferenceProps((children as JSX.Element).props),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: mergeRefs(floating.refs.setReference, (children as any).ref),
          })
        : null}
      {open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;

export default Popover;

// ----------------------------------------------------------------------------

const usePortalTo = (portal: NonNullable<PopoverOwnProps['portal']>) => {
  const themeInfo = React.useContext(ThemeContext);

  return typeof portal !== 'boolean'
    ? portal.to
    : portal
    ? themeInfo?.portalContainer ?? getDocument()?.body
    : null;
};
