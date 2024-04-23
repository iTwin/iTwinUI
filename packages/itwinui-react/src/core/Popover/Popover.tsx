/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import cx from 'classnames';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  size,
  autoUpdate,
  offset,
  flip,
  shift,
  autoPlacement,
  inline,
  hide,
  FloatingFocusManager,
  useHover,
  useFocus,
  safePolygon,
  useRole,
  FloatingPortal,
  useFloatingTree,
  useListNavigation,
} from '@floating-ui/react';
import type {
  SizeOptions,
  Placement,
  UseListNavigationProps,
  ReferenceType,
  UseFloatingOptions,
  UseHoverProps,
  UseClickProps,
  UseFocusProps,
  UseDismissProps,
} from '@floating-ui/react';
import {
  Box,
  cloneElementWithRef,
  useControlledState,
  useId,
  useLayoutEffect,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Portal } from '../../utils/components/Portal.js';
import type { PortalProps } from '../../utils/components/Portal.js';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider.js';

type PopoverOptions = {
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   */
  placement?: Placement;
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;

  /**
   * Callback invoked every time the popover visibility changes as a result
   * of internal logic. Should be used alongside `visible` prop.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * If true, the popover will close when clicking outside it.
   *
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * Middleware options.
   *
   * By default, `flip` and `shift` are enabled.
   *
   * @see https://floating-ui.com/docs/middleware
   */
  middleware?: {
    offset?: number;
    flip?: boolean;
    shift?: boolean;
    autoPlacement?: boolean;
    hide?: boolean;
    inline?: boolean;
  };
};

// keep public api small to start with
type PopoverInternalProps = {
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
     * Use this if you want popover to follow moving trigger element
     */
    animationFrame?: boolean;
    layoutShift?: boolean;
  };
  /**
   * By default, only the click interaction/trigger is enabled.
   *
   * Pass a boolean to enable/disable any of the supported interactions.
   * Alternatively, you can also pass an object to further customize the interaction/trigger.
   *
   * When additional parameters are required for an interaction/trigger, an object must be passed to enable it.
   * Booleans will not be allowed in this case.
   *
   * @example
   * ```jsx
   * <Popover
   *   interactions={{
   *     click: false,
   *     focus: true,
   *     hover: { move: false },
   *   }}
   *   // …
   * >…</Popover>
   * ```
   */
  interactions?: {
    hover?: boolean | UseHoverProps<ReferenceType>;
    click?: boolean | UseClickProps;
    focus?: boolean | UseFocusProps;
    dismiss?: boolean | UseDismissProps;
    listNavigation?: UseListNavigationProps;
  };
  role?: 'dialog' | 'menu' | 'listbox';
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
} & Record<string, any>;

type UsePopoverProps = Omit<PopoverOptions, 'onVisibleChange'> &
  PopoverInternalProps & {
    onVisibleChange?: UseFloatingOptions['onOpenChange'];
  };

// ----------------------------------------------------------------------------

export const usePopover = (options: UsePopoverProps) => {
  const {
    placement = 'bottom-start',
    visible,
    onVisibleChange,
    closeOnOutsideClick,
    autoUpdateOptions,
    matchWidth,
    interactions: interactionsProp = {
      click: true,
      hover: false,
      focus: false,
      listNavigation: undefined,
      dismiss: false,
    },
    interactionsProps = {
      listNavigation: undefined,
    },
    role,
    ...rest
  } = options;

  const tree = useFloatingTree();

  const middleware = { flip: true, shift: true, ...options.middleware };

  const [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange,
  );

  const floating = useFloating({
    placement,
    open,
    onOpenChange,
    whileElementsMounted: (...args) => autoUpdate(...args, autoUpdateOptions),
    ...rest,
    middleware: [
      middleware.offset !== undefined && offset(middleware.offset),
      middleware.flip && flip(),
      middleware.shift && shift(),
      matchWidth &&
        size({
          apply: ({ rects }) => {
            setReferenceWidth(rects.reference.width);
          },
        } as SizeOptions),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const interactions = useInteractions([
    useClick(
      floating.context,
      typeof interactionsProp.click === 'boolean'
        ? { enabled: !!interactionsProp.click }
        : interactionsProp.click,
    ),
    useDismiss(
      floating.context,
      typeof interactionsProp.dismiss === 'boolean'
        ? {
            enabled: !!interactionsProp.dismiss,
            outsidePress: closeOnOutsideClick,
            bubbles: tree != null, // Only bubble when inside a FloatingTree
          }
        : interactionsProp.dismiss,
    ),
    useHover(
      floating.context,
      typeof interactionsProp.hover === 'boolean'
        ? {
            enabled: !!interactionsProp.hover,
            delay: 100,
            handleClose: safePolygon({ buffer: 1, requireIntent: false }),
            ...interactionsProps.hover,
          }
        : interactionsProp.hover,
    ),
    useFocus(
      floating.context,
      typeof interactionsProp.focus === 'boolean'
        ? { enabled: !!interactionsProp.focus }
        : interactionsProp.focus,
    ),
    useRole(floating.context, { role: 'dialog', enabled: !!role }),
    useListNavigation(floating.context, {
      enabled: !!interactionsProp.listNavigation,
      ...(interactionsProp.listNavigation as UseListNavigationProps),
    }),
  ]);

  const [referenceWidth, setReferenceWidth] = React.useState<number>();

  const getFloatingProps = React.useCallback(
    (userProps?: React.HTMLProps<HTMLElement>) =>
      interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          zIndex: 9999,
          ...(matchWidth && referenceWidth
            ? {
                minInlineSize: `${referenceWidth}px`,
                maxInlineSize: `min(${referenceWidth * 2}px, 90vw)`,
              }
            : {}),
          ...userProps?.style,
        },
      }),
    [floating.floatingStyles, interactions, matchWidth, referenceWidth],
  );

  return React.useMemo(
    () => ({
      open,
      onOpenChange,
      ...interactions,
      getFloatingProps,
      ...floating,
    }),
    [open, onOpenChange, interactions, getFloatingProps, floating],
  );
};

// ----------------------------------------------------------------------------

type PopoverPublicProps = {
  /**
   * Content displayed inside the popover.
   */
  content?: React.ReactNode;
  /**
   * Element that triggers the popover. Should usually be a button.
   */
  children?: React.ReactNode;
  /**
   * Whether the popover adds recommended CSS (background-color, box-shadow, etc.) to itself.
   *
   * @default false
   */
  applyBackground?: boolean;
  /**
   * This is used to position the popover relative to a different element than the trigger.
   *
   * Recommended to use state to store this element, rather than a ref.
   */
  positionReference?: HTMLElement;
} & PortalProps &
  PopoverOptions;

/**
 * A utility component to help with positioning of floating content relative to a trigger.
 * Built on top of [`floating-ui`](https://floating-ui.com/).
 *
 * @see https://itwinui.bentley.com/docs/popover
 *
 * @example
 * <Popover content='This is a popover'>
 *   <Button>Show popover</Button>
 * </Popover>
 */
export const Popover = React.forwardRef((props, forwardedRef) => {
  const {
    portal = true,
    //
    // popover options
    visible,
    placement = 'bottom-start',
    onVisibleChange,
    closeOnOutsideClick = true,
    middleware,
    //
    // extra props
    positionReference,
    //
    // dom props
    className,
    children,
    content,
    applyBackground = false,
    ...rest
  } = props;

  const popover = usePopover({
    visible,
    placement,
    onVisibleChange,
    closeOnOutsideClick,
    role: 'dialog',
    middleware,
  });

  const [popoverElement, setPopoverElement] = React.useState<HTMLElement>();

  const popoverRef = useMergedRefs(
    popover.refs.setFloating,
    forwardedRef,
    setPopoverElement,
  );

  const triggerId = `${useId()}-trigger`;
  const hasAriaLabel = !!props['aria-labelledby'] || !!props['aria-label'];

  useLayoutEffect(() => {
    if (!positionReference) {
      return;
    }
    popover.refs.setPositionReference(positionReference);
    return () => void popover.refs.setPositionReference(null);
  }, [popover.refs, positionReference]);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        id: children.props.id || triggerId,
        ...popover.getReferenceProps(children.props),
        ref: popover.refs.setReference,
      }))}

      {popover.open ? (
        <Portal portal={portal}>
          <FloatingPortal>
            <ThemeProvider
              portalContainer={popoverElement} // portal nested popovers into this one
            >
              <FloatingFocusManager
                context={popover.context}
                modal={false}
                initialFocus={popover.refs.floating}
              >
                <Box
                  className={cx(
                    { 'iui-popover-surface': applyBackground },
                    className,
                  )}
                  aria-labelledby={
                    !hasAriaLabel
                      ? popover.refs.domReference.current?.id
                      : undefined
                  }
                  {...popover.getFloatingProps(rest)}
                  ref={popoverRef}
                >
                  {content}
                </Box>
              </FloatingFocusManager>
            </ThemeProvider>
          </FloatingPortal>
        </Portal>
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverPublicProps>;
