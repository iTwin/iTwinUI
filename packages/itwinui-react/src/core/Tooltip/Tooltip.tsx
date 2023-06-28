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
  useRole,
  useInteractions,
  safePolygon,
  size,
  autoPlacement,
  hide,
  inline,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import {
  Box,
  getDocument,
  mergeRefs,
  useGlobals,
  useMergedRefs,
} from '../utils/index.js';
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
   * autoUpdate options that recalculates position
   * to ensure the floating element remains anchored
   * to its reference element, such as when scrolling
   * and resizing the screen
   *
   * By default everything is false.
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
   * Element to portal tooltip to.
   * Portals to ThemeProvider portalContainerRef by default.
   * @default true;
   */
  portal?: boolean | { to: HTMLElement };
  /**
   * Sets reference point to user provided element.
   * @example
   * const ref = React.useRef(null);
   * return (
   *   <>
   *      <Button ref={ref}>Reference</Button>
   *      <Tooltip content='Tooltip' setReference={ref.current}/>
   *   </>
   * );
   */
  reference?: React.RefObject<HTMLElement>;
};

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    whileElementsMounted: (referenceEl: any, floatingEl: any, update: any) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: autoUpdateOptions.animationFrame,
        ancestorScroll: autoUpdateOptions.ancestorScroll,
        ancestorResize: autoUpdateOptions.ancestorResize,
        elementResize: autoUpdateOptions.elementResize,
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

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });

  const dismiss = useDismiss(context, {
    enabled: controlledOpen == null,
  });

  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([click, hover, focus, dismiss, role]);

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
    ...rest
  } = props;
  const tooltip = useTooltip({
    placement,
    visible,
    autoUpdateOptions,
    middleware,
  });
  const context = useGlobals();

  React.useEffect(() => {
    if (reference) {
      tooltip.refs.setReference(reference.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? context?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  const contentBox = (
    <Box
      className={cx('iui-tooltip', className)}
      ref={useMergedRefs(tooltip.refs.setFloating, forwardRef)}
      style={{ ...tooltip.floatingStyles, ...style }}
      {...tooltip.getFloatingProps()}
      {...rest}
    >
      {content}
    </Box>
  );

  const childrenRef =
    React.isValidElement(children) &&
    mergeRefs(
      tooltip.refs.setReference,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (children as any).ref,
    );

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(
            children,
            tooltip.getReferenceProps({
              ref: childrenRef,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(children as any).props,
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
