import * as React from 'react';
import cx from 'classnames';
import { useMergeRefs, FloatingPortal } from '@floating-ui/react';
import {
  Box,
  useTooltip,
  type PolymorphicForwardRefComponent,
} from '../utils/index.js';
import { ThemeContext } from '../ThemeProvider/ThemeContext.js';

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

const TooltipComponent = ({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) => {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
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
export const Tooltip = Object.assign(TooltipComponent, {
  /**
   *
   */
  Content: TooltipContent,
  /**
   *
   */
  Trigger: TooltipTrigger,
});
