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
  FloatingPortal,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { Box, useMergedRefs } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ThemeContext } from '../ThemeProvider/ThemeContext.js';
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
   * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
   * If not specified, the `children` prop should be used instead.
   */
  reference?: React.RefObject<Element> | null;
  /**
   * Element to portal tooltip to.
   * Portals to ThemeProvider portalContainerRef by default.
   */
  portal?: { to: HTMLElement };
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

const TooltipContext = React.createContext<
  (ReturnType<typeof useTooltip> & TooltipOwnProps) | null
>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

const TooltipComponent = ({
  content,
  children,
  portal,
  reference,
  ...options
}: TooltipOwnProps & TooltipOptions) => {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={{ ...tooltip, content, reference, portal }}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef((props, propRef) => {
  const { children, ...rest } = props;
  const { refs, reference, getReferenceProps } = useTooltipContext();
  const ref = useMergedRefs(refs.setReference, propRef);

  if (reference?.current) {
    return React.isValidElement(reference.current)
      ? React.cloneElement(reference.current, ref)
      : null;
  }

  return React.isValidElement(children)
    ? React.cloneElement(
        children,
        getReferenceProps({
          ref,
          ...rest,
          ...children.props,
        }),
      )
    : null;
}) as PolymorphicForwardRefComponent<'div'>;

const TooltipContent = React.forwardRef((props, propRef) => {
  const { children, className, ...rest } = props;
  const context = useTooltipContext();
  const themeInfo = React.useContext(ThemeContext);
  const ref = useMergedRefs(context.refs.setFloating, propRef);

  const contentBox = (
    <Box
      className={cx('iui-tooltip', className)}
      ref={ref}
      style={context.floatingStyles}
      {...context.getFloatingProps(rest)}
    >
      {children}
    </Box>
  );

  if (!context.open) {
    return null;
  }

  const portalRoot =
    context.portal?.to ?? themeInfo?.portalContainerRef?.current;

  return portalRoot ? (
    ReactDOM.createPortal(contentBox, portalRoot)
  ) : (
    <FloatingPortal>{contentBox}</FloatingPortal>
  );
}) as PolymorphicForwardRefComponent<'div'>;

/**
 * Basic tooltip component to display informative content when an element is hovered or focused.
 * Uses [FloatingUI](https://floating-ui.com/).
 * @example
 * <Tooltip content='tooltip text' placement='top'>Hover here</Tooltip>
 */
export const Tooltip = TooltipComponent;
