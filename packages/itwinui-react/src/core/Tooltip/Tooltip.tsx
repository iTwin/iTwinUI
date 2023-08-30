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
} & PortalProps;

const useTooltip = (options: TooltipOptions = {}) => {
  const {
    placement,
    visible: controlledOpen,
    middleware = {
      flip: true,
      shift: true,
    },
    autoUpdateOptions = {},
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen ?? uncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setUncontrolledOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: autoUpdateOptions.animationFrame,
        ancestorScroll: autoUpdateOptions.ancestorScroll,
        ancestorResize: autoUpdateOptions.ancestorResize,
        elementResize: autoUpdateOptions.elementResize,
        layoutShift: autoUpdateOptions.layoutShift,
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

  const { delay } = useDelayGroupContext();

  const hover = useHover(context, {
    enabled: controlledOpen == null,
    delay: delay ?? { open: 50, close: 250 },
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

  useDelayGroup(context, { id: useId() });

  const interactions = useInteractions([click, hover, focus, dismiss]);

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
 * @example
 * const buttonRef = React.useRef();
 * ...
 * <Button ref={buttonRef} />
 * <Tooltip content='tooltip text' reference={buttonRef} />
 */
export const Tooltip = React.forwardRef((props, forwardRef) => {
  const uniqueId = useId();

  const {
    content,
    children,
    portal = true,
    placement = 'top',
    autoUpdateOptions,
    middleware,
    style,
    className,
    visible,
    reference,
    ariaStrategy = 'description',
    id = uniqueId,
    ...rest
  } = props;

  const ariaProps = React.useMemo(
    () =>
      ariaStrategy === 'description'
        ? { 'aria-describedby': id }
        : ariaStrategy === 'label'
        ? { 'aria-labelledby': id }
        : {},
    [ariaStrategy, id],
  );

  const tooltip = useTooltip({
    placement,
    visible,
    autoUpdateOptions,
    middleware,
  });

  React.useEffect(() => {
    if (!reference) {
      return;
    }
    tooltip.refs.setReference(reference);

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
  }, [ariaProps, reference, tooltip.refs]);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...tooltip.getReferenceProps(children.props),
        ...ariaProps,
        ref: tooltip.refs.setReference,
      }))}

      <Portal portal={portal}>
        <Box
          className={cx('iui-tooltip', className)}
          ref={useMergedRefs(tooltip.refs.setFloating, forwardRef)}
          style={{ ...tooltip.floatingStyles, ...style }}
          {...tooltip.getFloatingProps()}
          id={id}
          aria-hidden
          hidden={!tooltip.open}
          {...rest}
        >
          {content}
        </Box>
      </Portal>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', TooltipOwnProps & TooltipOptions>;

export default Tooltip;
