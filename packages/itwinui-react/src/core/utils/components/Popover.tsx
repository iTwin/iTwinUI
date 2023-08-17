/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
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
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import ReactDOM from 'react-dom';
import {
  Box,
  getDocument,
  useMergedRefs,
  useUncontrolledState,
} from '../index.js';
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
  reference?: HTMLElement;
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
      middleware.size
        ? size()
        : size({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apply({ rects, elements }: any) {
              Object.assign(elements.floating.style, {
                minWidth: `${rects.reference.width}px`,
              });
            },
          }),
      ,
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const context = data.context;

  const hover = useHover(context, {
    enabled: hoverOption || controlledOpen === null,
    delay: {
      open: 50,
      close: 250,
    },
    handleClose: safePolygon({ buffer: -Infinity }),
  });

  const click = useClick(context, {
    enabled: controlledOpen === null,
  });

  const dismiss = useDismiss(context, {
    outsidePress: onClickOutsideClose,
  });
  const role = useRole(context);

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

  const [triggerElement, setTriggerElement] = useUncontrolledState(reference);

  const popover = usePopover({
    placement,
    visible,
    onToggleVisible,
    onClickOutsideClose,
    hover,
    reference: reference ? triggerElement : undefined,
  });

  const contentBox = (
    <Box
      className={cx('iui-popover', className)}
      data-iui-apply-background={applyBackground ? true : undefined}
      style={{ ...popover.floatingStyles, ...style }}
      {...popover.getFloatingProps(rest)}
      ref={useMergedRefs(popover.refs.setFloating, forwardedRef)}
    >
      {content}
    </Box>
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
        ? React.cloneElement(
            children,
            popover.getReferenceProps({
              ref: setTriggerElement,
              ...(children as JSX.Element).props,
            }),
          )
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
