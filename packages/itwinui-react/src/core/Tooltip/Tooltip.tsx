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
  useInteractions,
  safePolygon,
  size,
  autoPlacement,
  hide,
  inline,
  useDelayGroupContext,
  useDelayGroup,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import {
  Box,
  Portal,
  cloneElementWithRef,
  useId,
  useMergedRefs,
} from '../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../utils/index.js';

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
  /**
   * Sets reference point to user provided element.
   * @example
   * const [trigger, setTrigger] = React.useState();
   * ...
   * <Button ref={setTrigger} />
   * <Tooltip content='tooltip text' reference={trigger} />
   */
  reference?: HTMLElement | null;
  /**
   * By default, the tooltip will be associated with the reference element
   * using `aria-describedby`.
   *
   * Pass "label" if you want to use `aria-labelledby` instead, or pass "none"
   * if you don't want any association.
   *
   * @default 'description'
   */
  ariaStrategy?: 'description' | 'label' | 'none';
  id?: string;
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
} & PortalProps;

const useTooltip = (options: TooltipOptions = {}) => {
  const uniqueId = useId();
  const {
    placement = 'top',
    visible: controlledOpen,
    middleware = { flip: true, shift: true },
    autoUpdateOptions = {},
    reference,
    ariaStrategy = 'description',
    id = uniqueId,
    ...props
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;

  const floating = useFloating({
    placement,
    open,
    onOpenChange: setUncontrolledOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, autoUpdateOptions),
    middleware: [
      middleware.offset !== undefined ? offset(middleware.offset) : offset(4),
      middleware.flip && flip(),
      middleware.shift && shift(),
      middleware.size && size(),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
    ...(reference && { elements: { reference } }),
  });

  const ariaProps = React.useMemo(
    () =>
      ariaStrategy === 'description'
        ? { 'aria-describedby': id }
        : ariaStrategy === 'label'
        ? { 'aria-labelledby': id }
        : {},
    [ariaStrategy, id],
  );

  React.useEffect(() => {
    if (!reference) {
      return;
    }

    const oldValues: Record<string, string | null> = {}; // for cleanup
    Object.entries(ariaProps).forEach(([key, value]) => {
      oldValues[key] = reference.getAttribute(key);
      reference.setAttribute(key, value);
    });

    return () => {
      Object.entries(oldValues).forEach(([key, value]) => {
        if (value) {
          reference.setAttribute(key, value);
        } else {
          reference.removeAttribute(key);
        }
      });
    };
  }, [ariaProps, reference]);

  const { delay } = useDelayGroupContext();

  const hover = useHover(floating.context, {
    enabled: controlledOpen == null,
    delay: delay ?? { open: 50, close: 250 },
    handleClose: safePolygon({ buffer: -Infinity }),
  });

  const focus = useFocus(floating.context, {
    enabled: controlledOpen == null,
  });

  const click = useClick(floating.context, {
    enabled: controlledOpen == null,
  });

  const dismiss = useDismiss(floating.context, {
    enabled: controlledOpen == null,
  });

  useDelayGroup(floating.context, { id: useId() });

  const interactions = useInteractions([click, hover, focus, dismiss]);

  const getReferenceProps = React.useCallback(
    (userProps?: React.HTMLProps<Element>) => {
      return interactions.getReferenceProps({ ...userProps, ...ariaProps });
    },
    [interactions, ariaProps],
  );

  const floatingProps = React.useMemo(
    () =>
      interactions.getFloatingProps({
        hidden: !open,
        'aria-hidden': 'true',
        ...props,
        id,
      }),
    [interactions, props, id, open],
  );

  return React.useMemo(
    () => ({
      open,
      setUncontrolledOpen,
      getReferenceProps,
      floatingProps,
      ...floating,
    }),
    [open, getReferenceProps, floatingProps, floating],
  );
};

/**
 * Basic tooltip component to display informative content when an element is hovered or focused.
 * Uses [FloatingUI](https://floating-ui.com/).
 * @example
 * <Tooltip content='tooltip text' placement='top'>Hover here</Tooltip>
 * @example
 * const [trigger, setTrigger] = React.useState(null);
 * ...
 * <Button ref={setTrigger} />
 * <Tooltip content='tooltip text' reference={trigger} />
 */
export const Tooltip = React.forwardRef((props, forwardedRef) => {
  const { content, children, portal = true, className, style, ...rest } = props;

  const tooltip = useTooltip(rest);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...tooltip.getReferenceProps(children.props),
        ref: tooltip.refs.setReference,
      }))}

      <Portal portal={portal}>
        <Box
          className={cx('iui-tooltip', className)}
          ref={useMergedRefs(tooltip.refs.setFloating, forwardedRef)}
          style={{ ...tooltip.floatingStyles, ...style }}
          {...tooltip.floatingProps}
        >
          {content}
        </Box>
      </Portal>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', TooltipOwnProps & TooltipOptions>;

export default Tooltip;
