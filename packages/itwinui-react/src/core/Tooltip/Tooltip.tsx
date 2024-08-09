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
  useInteractions,
  safePolygon,
  size,
  autoPlacement,
  hide,
  inline,
  useDelayGroup,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import {
  Box,
  Portal,
  cloneElementWithRef,
  useControlledState,
  useId,
  useMergedRefs,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';

// ----------------------------------------------------------------------------

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
   * Callback invoked every time the tooltip visibility changes as a result
   * of internal logic. Should be used alongside `visible` prop.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * autoUpdate options that recalculates position
   * to ensure the floating element remains anchored
   * to its reference element, such as when scrolling
   * and resizing the screen.
   *
   * @see [floating-ui docs](https://floating-ui.com/docs/autoUpdate#options)
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
   *
   * @see [floating-ui docs](https://floating-ui.com/docs/middleware)
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
   * const [trigger, setTrigger] = React.useState(null);
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

// TODO: Remove this when types are available
type HTMLElementWithPopover = HTMLElement & {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/togglePopover */
  togglePopover?: (force?: boolean) => void;
};

// ----------------------------------------------------------------------------

const useTooltip = (options: TooltipOptions = {}) => {
  const uniqueId = useId();
  const {
    placement = 'top',
    visible,
    onVisibleChange,
    middleware = { flip: true, shift: true },
    autoUpdateOptions = {},
    reference,
    ariaStrategy = 'description',
    id = uniqueId,
    ...props
  } = options;

  const [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange,
  );

  const syncWithControlledState = React.useCallback(
    (element: HTMLElementWithPopover | null) => {
      // Using a microtask ensures that the popover is mounted before calling togglePopover
      queueMicrotask(() => {
        try {
          element?.togglePopover?.(open);
        } catch {
          // Fail silently, to avoid crashing the page
        }
      });
    },
    [open],
  );

  const floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: 'fixed',
    whileElementsMounted: React.useMemo(
      () =>
        // autoUpdate is expensive and should only be called when tooltip is open
        open ? (...args) => autoUpdate(...args, autoUpdateOptions) : undefined,
      [autoUpdateOptions, open],
    ),
    middleware: React.useMemo(
      () =>
        [
          middleware.offset !== undefined
            ? offset(middleware.offset)
            : offset(4),
          middleware.flip && flip({ padding: 4 }),
          middleware.shift && shift({ padding: 4 }),
          middleware.size && size({ padding: 4 }),
          middleware.autoPlacement && autoPlacement({ padding: 4 }),
          middleware.inline && inline(),
          middleware.hide && hide({ padding: 4 }),
        ].filter(Boolean),
      [middleware],
    ),
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

  const { delay } = useDelayGroup(floating.context, { id: useId() });

  const interactions = useInteractions([
    useHover(floating.context, {
      delay: delay ?? { open: 50, close: 250 },
      handleClose: safePolygon({ buffer: -Infinity }),
      move: false,
    }),
    useFocus(floating.context),
    useDismiss(floating.context, {
      referencePress: true,
      referencePressEvent: 'click',
    }),
  ]);

  // Manually add attributes and event handlers to external reference element,
  // because we cannot spread getReferenceProps onto it.
  React.useEffect(() => {
    if (!reference) {
      return;
    }

    /** e.g. onPointerDown --> pointerdown */
    const domEventName = (e: string) => e.toLowerCase().substring(2);

    const cleanupValues: Record<string, any> = {};

    Object.entries({
      ...ariaProps,
      ...interactions.getReferenceProps(),
    }).forEach(([key, value]) => {
      if (typeof value === 'function') {
        // manually add `.nativeEvent` (react concept) because floating-ui needs it
        const patchedHandler = (event: Event) => {
          value({ ...event, nativeEvent: event });
        };
        reference.addEventListener(domEventName(key), patchedHandler);
        cleanupValues[key] = patchedHandler;
      } else if (value) {
        cleanupValues[key] = reference.getAttribute(key);
        reference.setAttribute(key, value);
      }
    });

    return () => {
      Object.entries(cleanupValues).forEach(([key, value]) => {
        if (typeof value === 'function') {
          reference.removeEventListener(domEventName(key), value);
        } else if (value) {
          reference.setAttribute(key, value);
        } else {
          reference.removeAttribute(key);
        }
      });
    };
  }, [ariaProps, reference, interactions]);

  const getReferenceProps = React.useCallback(
    (userProps?: React.HTMLProps<Element>) => {
      return interactions.getReferenceProps({ ...userProps, ...ariaProps });
    },
    [interactions, ariaProps],
  );

  const floatingProps = React.useMemo(
    () => ({
      ...interactions.getFloatingProps({
        hidden: !open,
        'aria-hidden': 'true',
        ...props,
        id,
      }),
      popover: 'manual',
    }),
    [interactions, props, id, open],
  );

  return React.useMemo(
    () => ({
      getReferenceProps,
      floatingProps,
      ...floating,
      refs: {
        ...floating.refs,
        setFloating: (element: HTMLElement | null) => {
          floating.refs.setFloating(element);
          syncWithControlledState(element);
        },
      },
      // styles are not relevant when tooltip is not open
      floatingStyles: floating.context.open ? floating.floatingStyles : {},
    }),
    [getReferenceProps, floatingProps, floating, syncWithControlledState],
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
  const refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...tooltip.getReferenceProps(children.props),
        ref: tooltip.refs.setReference,
      }))}

      {
        // Tooltip must always be present in the DOM (even when closed) for ARIA to work
        props.ariaStrategy !== 'none' || tooltip.context.open ? (
          <Portal portal={portal}>
            <Box
              className={cx('iui-tooltip', className)}
              ref={refs}
              style={{ ...tooltip.floatingStyles, ...style }}
              {...tooltip.floatingProps}
            >
              {content}
            </Box>
          </Portal>
        ) : null
      }
    </>
  );
}) as PolymorphicForwardRefComponent<'div', TooltipOwnProps & TooltipOptions>;
if (process.env.NODE_ENV === 'development') {
  Tooltip.displayName = 'Tooltip';
}
