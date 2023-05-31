import * as React from 'react';
import cx from 'classnames';
import { useMergeRefs, FloatingPortal } from '@floating-ui/react';
import {
  Box,
  useTooltip,
  type PolymorphicForwardRefComponent,
  type TooltipOptions,
} from '../utils/index.js';
import { ThemeContext } from '../ThemeProvider/ThemeContext.js';

export type TooltipProps = {
  /**
   * Content of the tooltip.
   */
  content: React.ReactNode;
  /**
   * Element to have tooltip on. Has to be a valid JSX element and needs to forward its ref.
   * If not specified, the `reference` prop should be used instead.
   */
  children?: React.ReactNode;
} & TooltipOptions;

const TooltipContext = React.createContext<ReturnType<
  typeof useTooltip
> | null>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

const TooltipComponent = ({ content, children, ...options }: TooltipProps) => {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
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
    <FloatingPortal root={themeInfo?.rootRef.current}>
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
export const NewTooltip = TooltipComponent;
