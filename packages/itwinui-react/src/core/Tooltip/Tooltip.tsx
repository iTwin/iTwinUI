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
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { Box, getDocument, useGlobals } from '../utils/index.js';
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
   * Function that allows users to control Tooltip visibility
   */
  toggleVisible?: (open: boolean) => void;
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

const useTooltip = ({
  placement = 'top',
  visible: controlledOpen,
  toggleVisible: setControlledOpen,
  followTrigger = false,
}: TooltipOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: followTrigger,
      }),
    middleware: [offset(4), flip(), shift()],
  });

  const context = data.context;

  const hover = useHover(context);
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
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
};

const TooltipComponent = ({
  content,
  children,
  portal = false,
  ...options
}: TooltipOwnProps & TooltipOptions) => {
  const tooltip = useTooltip(options);
  const context = useGlobals();

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? context?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  const contentBox = (
    <Box
      className={cx('iui-tooltip')}
      ref={tooltip.refs.setFloating}
      style={tooltip.floatingStyles}
      {...tooltip.getFloatingProps()}
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
};

/**
 * Basic tooltip component to display informative content when an element is hovered or focused.
 * Uses [FloatingUI](https://floating-ui.com/).
 * @example
 * <Tooltip content='tooltip text' placement='top'>Hover here</Tooltip>
 */
export const Tooltip = TooltipComponent;
