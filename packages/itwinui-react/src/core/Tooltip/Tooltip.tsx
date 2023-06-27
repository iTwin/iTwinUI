/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  size,
  autoPlacement,
  hide,
  inline,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { Box, getDocument, useGlobals, useMergedRefs } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import ReactDOM from 'react-dom';

type TooltipOptions = {
  /**
   * Placement of the Tooltip
   * @default 'top'
   */
  placement?: Placement;
  /**
   * Property for manual visibility control
   */
  visible?: boolean;
  updateOptions?: {
    ancestorScroll?: boolean;
    ancestorResize?: boolean;
    elementResize?: boolean;
    /**
     * Use this if you want Tooltip to follow moving trigger element
     * @default false;
     */
    animationFrame?: boolean;
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
};

type TooltipOwnProps = {
  /**
   * Content of the tooltip.
   */
  content: React.ReactNode;
  /**
   * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
   * If not specified, the `reference` prop should be used instead.
   */
  children?: React.ReactNode;
  /**
   * Element to portal tooltip to.
   * Portals to ThemeProvider portalContainerRef by default.
   * @default true;
   */
  portal?: boolean | { to: HTMLElement };
  /**
   *
   */
  setReference?: (setTooltipReference: (ref: HTMLElement) => void) => void;
};

const useTooltip = (options: TooltipOptions = {}) => {
  const {
    placement,
    visible: controlledOpen,
    middleware = {
      flip: true,
      shift: true,
    },
    updateOptions = {},
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setUncontrolledOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: updateOptions.animationFrame,
        ancestorScroll: updateOptions.ancestorScroll,
        ancestorResize: updateOptions.ancestorResize,
        elementResize: updateOptions.elementResize,
      }),
    middleware: [
      middleware.offset !== undefined ? offset(middleware.offset) : offset(4),
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
    enabled: controlledOpen == null,
    delay: {
      open: 50,
      close: 250,
    },
    handleClose: safePolygon({ buffer: -Infinity }),
  });

  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });

  const dismiss = useDismiss(context, {
    enabled: controlledOpen == null,
  });

  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([click, hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setUncontrolledOpen,
      ...interactions,
      ...data,
    }),
    [open, interactions, data],
  );
};

/**
 * Basic tooltip component to display informative content when an element is hovered or focused.
 * Uses [FloatingUI](https://floating-ui.com/).
 * @example
 * <Tooltip content='tooltip text' placement='top'>Hover here</Tooltip>
 */
export const Tooltip = React.forwardRef((props, forwardRef) => {
  const {
    content,
    children,
    portal = true,
    placement = 'top',
    updateOptions,
    middleware,
    style,
    className,
    visible,
    setReference,
    ...rest
  } = props;
  const tooltip = useTooltip({ placement, visible, updateOptions, middleware });
  const context = useGlobals();

  React.useEffect(() => {
    setReference && setReference(tooltip.refs.setReference);
  }, [setReference, tooltip.refs.setReference]);

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? context?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  const contentBox = (
    <Box
      className={cx('iui-tooltip', className)}
      ref={useMergedRefs(tooltip.refs.setFloating, forwardRef)}
      style={{ ...tooltip.floatingStyles, ...style }}
      {...tooltip.getFloatingProps()}
      {...rest}
    >
      {content}
    </Box>
  );

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(
            children,
            tooltip.getReferenceProps({
              ref: tooltip.refs.setReference,
              ...children.props,
            }),
          )
        : null}
      {tooltip.open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', TooltipOwnProps & TooltipOptions>;

export default Tooltip;
