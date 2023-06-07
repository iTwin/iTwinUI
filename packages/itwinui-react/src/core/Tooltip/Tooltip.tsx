import * as React from 'react';
import cx from 'classnames';
import {
  useMergeRefs,
  FloatingPortal,
  useFloating,
  autoUpdate,
  offset,
  flip,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  // safePolygon,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import { Box, type PolymorphicForwardRefComponent } from '../utils/index.js';
import { ThemeContext } from '../ThemeProvider/ThemeContext.js';

// Comment to test commits
export type TooltipOptions = {
  placement?: Placement;
  visible?: boolean;
  toggleVisible?: (open: boolean) => void;
};

/**
 *
 */
export const useTooltip = ({
  placement = 'top',
  visible: controlledOpen,
  toggleVisible: setControlledOpen,
}: TooltipOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
    // handleClose: safePolygon(),
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

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

export type TooltipOwnProps = {
  /**
   * Content of the tooltip.
   */
  content?: React.ReactNode;
  /**
   * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
   * If not specified, the `reference` prop should be used instead.
   */
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appendTo?: any;
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
  appendTo,
  ...options
}: TooltipOwnProps & TooltipOptions) => {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={{ ...tooltip, appendTo }}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef((props, propRef) => {
  const { children, ...rest } = props;
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setReference, propRef]);

  return React.isValidElement(children)
    ? React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...rest,
          ...children.props,
        }),
      )
    : null;
  // eslint-disable-next-line @typescript-eslint/ban-types
}) as PolymorphicForwardRefComponent<'div', {}>;

const TooltipContent = React.forwardRef((props, propRef) => {
  const { children, className, ...rest } = props;
  const context = useTooltipContext();
  const themeInfo = React.useContext(ThemeContext);
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) {
    return null;
  }

  return (
    <FloatingPortal root={context.appendTo ?? themeInfo?.rootRef.current}>
      <Box
        className={cx('iui-tooltip', className)}
        ref={ref}
        style={context.floatingStyles}
        {...context.getFloatingProps(rest)}
      >
        {children}
      </Box>
    </FloatingPortal>
  );
  // eslint-disable-next-line @typescript-eslint/ban-types
}) as PolymorphicForwardRefComponent<'div', {}>;

/**
 *
 */
export const Tooltip = TooltipComponent;
export type TooltipProps = TooltipOwnProps & TooltipOptions;
