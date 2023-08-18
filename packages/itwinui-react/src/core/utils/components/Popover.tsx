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

function usePopover({
  placement = 'bottom-start',
  visible: controlledOpen,
  onToggleVisible,
  onClickOutsideClose,
  middleware = {
    flip: true,
    shift: true,
  },
  autoUpdateOptions = {},
  hover: hoverOption,
  reference,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onToggleVisible ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: autoUpdateOptions.animationFrame,
        ancestorScroll: autoUpdateOptions.ancestorScroll,
        ancestorResize: autoUpdateOptions.ancestorResize,
        elementResize: autoUpdateOptions.elementResize,
        layoutShift: autoUpdateOptions.layoutShift,
      }),
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

  const context = data.context;

  const hover = useHover(context, {
    enabled: !!(hoverOption && controlledOpen === undefined),
    handleClose: safePolygon({ buffer: -Infinity }),
  });

  const click = useClick(context, {
    enabled: controlledOpen === undefined,
  });

  const dismiss = useDismiss(context, {
    outsidePress: onClickOutsideClose,
  });
  const role = useRole(context, { enabled: false }); // TODO: Fix roles in all components

  const interactions = useInteractions([click, dismiss, role, hover]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

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
    hover,
    placement,
    visible,
    onToggleVisible,
    ...rest
  } = props;
  const themeInfo = React.useContext(ThemeContext);

  const popover = usePopover({
    placement,
    visible,
    onToggleVisible,
    onClickOutsideClose,
    hover,
    reference,
  });

  const contentBox = (
    <FloatingFocusManager
      context={popover.context}
      modal={false}
      initialFocus={-1}
      returnFocus
      guards={false}
    >
      <Box
        className={cx('iui-popover', className)}
        data-iui-apply-background={applyBackground ? true : undefined}
        style={{ ...popover.floatingStyles, ...style }}
        {...popover.getFloatingProps(rest)}
        ref={useMergedRefs(popover.refs.setFloating, forwardedRef)}
      >
        {content}
      </Box>
    </FloatingFocusManager>
  );

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? themeInfo?.portalContainer ?? getDocument()?.body
      : null;

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children as JSX.Element, {
            ...popover.getReferenceProps((children as JSX.Element).props),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: mergeRefs(popover.refs.setReference, (children as any).ref),
          })
        : null}
      {popover.open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;

export default Popover;
