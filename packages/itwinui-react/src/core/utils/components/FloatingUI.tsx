import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  useHover,
  useFocus,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';

type PopoverNewProps = {
  placement?: Placement;
  visible?: boolean;
  toggleVisible?: (isVisible: boolean) => void;
};

export const usePopoverNew = (props: PopoverNewProps) => {
  const { placement, visible, toggleVisible } = props;
  const [localVisible, setLocalIsVisible] = React.useState(visible);

  const open = visible ?? localVisible;
  const setOpen = toggleVisible ?? setLocalIsVisible;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'end',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    enabled: visible == null,
  });
  const focus = useFocus(context, {
    enabled: visible == null,
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

// ------------------------------------------------------------------
// Popover content component

// eslint-disable-next-line @typescript-eslint/ban-types
type PopoverContentOwnProps = {};

export const PopoverContent = React.forwardRef((props, propRef) => {
  const { as: Element = 'div', ...rest } = props;
  return (
    <FloatingPortal>
      <Element
        ref={propRef}
        className={cx('iui-popover', props.className)}
        {...rest}
      >
        {props.children}
      </Element>
    </FloatingPortal>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverContentOwnProps>;

// ------------------------------------------------------------------
// Popover Trigger component

// eslint-disable-next-line @typescript-eslint/ban-types
type PopoverTriggerOwnProps = {};

export const PopoverTrigger = React.forwardRef((props, propRef) => {
  const { as: Element = 'div', ...rest } = props;
  return (
    <Element ref={propRef} {...rest}>
      {props.children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverTriggerOwnProps>;
