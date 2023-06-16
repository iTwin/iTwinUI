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
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useClick,
  safePolygon,
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

  /**
   * Use this if you want Tooltip to follow moving trigger element
   * @default false;
   */
  followTrigger?: boolean;
  /**
   *
   */
  middleware?: {
    offset?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    flip?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    shift?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    size?: any; //  eslint-disable-line @typescript-eslint/no-explicit-any
    autoPlacement?: any; //  eslint-disable-line @typescript-eslint/no-explicit-any
    hide?: any; //  eslint-disable-line @typescript-eslint/no-explicit-any
    inline?: any; //  eslint-disable-line @typescript-eslint/no-explicit-any
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
  // /**
  //  * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
  //  * If not specified, the `children` prop should be used instead.
  //  */
  // reference?: React.RefObject<Element> | null;
  /**
   * Element to portal tooltip to.
   * Portals to ThemeProvider portalContainerRef by default.
   */
  portal?: boolean | { to: HTMLElement };
};

const useTooltip = (options: TooltipOptions = {}) => {
  const {
    placement = 'top',
    followTrigger = false,
    visible: controlledOpen,
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setUncontrolledOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: followTrigger,
      }),
    middleware: [offset(4), flip(), shift()],
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
  const click = useClick(context);

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, click, dismiss, role]);

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
export const Tooltip = React.forwardRef((props, ref) => {
  const {
    content,
    children,
    portal = false,
    placement = 'top',
    followTrigger = false,
    style,
    className,
    visible,
    ...rest
  } = props;
  const tooltip = useTooltip({ placement, visible, followTrigger });
  const context = useGlobals();

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? context?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  const contentBox = (
    <Box
      className={cx('iui-tooltip', className)}
      ref={useMergedRefs(tooltip.refs.setFloating, ref)}
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
