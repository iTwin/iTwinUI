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
} from '@floating-ui/react';
import type {
  SizeOptions,
  Placement,
  UseFloatingOptions,
  UseHoverProps,
  UseClickProps,
  UseFocusProps,
  UseDismissProps,
} from '@floating-ui/react';
import {
  Box,
  ShadowRoot,
  cloneElementWithRef,
  mergeEventHandlers,
  useControlledState,
  useId,
  useLayoutEffect,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { usePortalTo } from '../../utils/components/Portal.js';
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
    size?:
      | boolean
      | {
          /**
           * Override the maximum height of the popover.
           * @default "400px"
           */
          maxHeight?: string;
        };
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
   * By default, only the click and dismiss interactions/triggers are enabled.
   * Explicitly pass `false` to disable the defaults.
   *
   * Pass a boolean or an object to enable/disable any of the supported interactions.
   * The passed objects can be used to override the default props that the Popover sets for an interaction/trigger.
   *
   * @example
   * const popover = usePopover({
   *   interactions: {
   *     click: false,
   *     focus: true,
   *     hover: { move: false },
   *   }
   *   // …
   * });
   */
  interactions?: {
    click?: boolean | Omit<UseClickProps, 'enabled'>;
    dismiss?: boolean | Omit<UseDismissProps, 'enabled'>;
    hover?: boolean | Omit<UseHoverProps, 'enabled'>;
    focus?: boolean | Omit<UseFocusProps, 'enabled'>;
  };
  role?: 'dialog' | 'menu' | 'listbox';
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
} & Omit<UseFloatingOptions, 'middleware' | 'placement'>;

// ----------------------------------------------------------------------------

/** Stores the current open/closed state of the popover. */
export const PopoverOpenContext = React.createContext<boolean | undefined>(
  undefined,
);

// ----------------------------------------------------------------------------

export const usePopover = (options: PopoverOptions & PopoverInternalProps) => {
  const {
    placement = 'bottom-start',
    visible,
    onVisibleChange,
    closeOnOutsideClick,
    autoUpdateOptions,
    matchWidth,
    interactions: interactionsProp,
    role,
    ...rest
  } = options;

  const mergedInteractions = React.useMemo(
    () => ({
      ...{
        click: true,
        dismiss: true,
        hover: false,
        focus: false,
      },
      ...interactionsProp,
    }),
    [interactionsProp],
  );

  const tree = useFloatingTree();

  const middleware = React.useMemo(
    () => ({ flip: true, shift: true, size: true, ...options.middleware }),
    [options.middleware],
  );

  const maxHeight =
    typeof middleware.size === 'boolean' ? '400px' : middleware.size?.maxHeight;

  const [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange,
  );

  const floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: 'fixed',
    whileElementsMounted: React.useMemo(
      () =>
        // autoUpdate is expensive and should only be called when the popover is open
        open ? (...args) => autoUpdate(...args, autoUpdateOptions) : undefined,
      [autoUpdateOptions, open],
    ),
    ...rest,
    middleware: React.useMemo(
      () =>
        [
          middleware.offset !== undefined && offset(middleware.offset),
          middleware.flip && flip({ padding: 4 }),
          middleware.shift && shift({ padding: 4 }),
          (matchWidth || middleware.size) &&
            size({
              padding: 4,
              apply: ({ rects, availableHeight }) => {
                if (middleware.size) {
                  setAvailableHeight(Math.round(availableHeight));
                }

                if (matchWidth) {
                  setReferenceWidth(rects.reference.width);
                }
              },
            } as SizeOptions),
          middleware.autoPlacement && autoPlacement(),
          middleware.inline && inline(),
          middleware.hide && hide(),
        ].filter(Boolean),
      [matchWidth, middleware],
    ),
  });

  const interactions = useInteractions([
    useClick(floating.context, {
      enabled: !!mergedInteractions.click,
      ...(mergedInteractions.click as object),
    }),
    useDismiss(floating.context, {
      enabled: !!mergedInteractions.dismiss,
      outsidePress: closeOnOutsideClick,
      bubbles: tree != null, // Only bubble when inside a FloatingTree
      ...(mergedInteractions.dismiss as object),
    }),
    useHover(floating.context, {
      enabled: !!mergedInteractions.hover,
      delay: 100,
      handleClose: safePolygon({
        buffer: 1,
        blockPointerEvents: true,
      }),
      move: false,
      ...(mergedInteractions.hover as object),
    }),
    useFocus(floating.context, {
      enabled: !!mergedInteractions.focus,
      ...(mergedInteractions.focus as object),
    }),
    useRole(floating.context, {
      role: 'dialog',
      enabled: !!role,
    }),
  ]);

  const [referenceWidth, setReferenceWidth] = React.useState<number>();
  const [availableHeight, setAvailableHeight] = React.useState<number>();

  const getFloatingProps = React.useCallback(
    (userProps?: React.HTMLProps<HTMLElement>) =>
      interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          ...(middleware.size &&
            availableHeight && {
              maxBlockSize: `min(${availableHeight}px, ${maxHeight})`,
            }),
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
    [
      floating.floatingStyles,
      interactions,
      matchWidth,
      referenceWidth,
      middleware.size,
      availableHeight,
      maxHeight,
    ],
  );

  const getReferenceProps = React.useCallback(
    (userProps?: React.HTMLProps<HTMLElement>) =>
      interactions.getReferenceProps({
        ...userProps,
        onClick: mergeEventHandlers(userProps?.onClick, () => {
          // Workaround for useHover+useClick+useDismiss bug in floating-ui.
          // We want to close the popover when the reference is clicked the first time.
          // @see https://github.com/floating-ui/floating-ui/issues/1893
          // @see https://github.com/floating-ui/floating-ui/discussions/2936
          if (!!mergedInteractions.click && visible) {
            onOpenChange(false);
          }
        }),
      }),
    [interactions, mergedInteractions.click, visible, onOpenChange],
  );

  return React.useMemo(
    () => ({
      open,
      onOpenChange,
      getReferenceProps,
      getFloatingProps,
      ...floating,
    }),
    [open, onOpenChange, getFloatingProps, floating, getReferenceProps],
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
      <PopoverOpenContext.Provider value={popover.open}>
        {cloneElementWithRef(children, (children) => ({
          id: children.props.id || triggerId,
          ...popover.getReferenceProps(children.props),
          ref: popover.refs.setReference,
        }))}
      </PopoverOpenContext.Provider>

      {popover.open ? (
        <PopoverPortal portal={portal}>
          <ThemeProvider
            portalContainer={popoverElement} // portal nested popovers into this one
          >
            <DisplayContents />
            <FloatingFocusManager context={popover.context} modal={false}>
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
        </PopoverPortal>
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverPublicProps>;
if (process.env.NODE_ENV === 'development') {
  Popover.displayName = 'Popover';
}

// ----------------------------------------------------------------------------

const PopoverPortal = ({
  children,
  portal = true,
}: React.PropsWithChildren<PortalProps>) => {
  const portalTo = usePortalTo(portal);

  return (
    <FloatingPortal
      key={portalTo?.id} // workaround to force remount when `root` changes (see #2093)
      root={portalTo}
    >
      <DisplayContents />
      {children}
    </FloatingPortal>
  );
};

// ----------------------------------------------------------------------------

/** Applies `display: contents` to the parent div. */
const DisplayContents = React.memo(() => {
  return (
    <ShadowRoot
      css={`
        :host {
          display: contents;
        }
      `}
    >
      <slot />
    </ShadowRoot>
  );
});
