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
  ShadowRoot,
  cloneElementWithRef,
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
   * Pass a boolean to enable/disable any of the supported interactions.
   * Alternatively, pass an object to override the default props that the Popover sets for an interaction/trigger.
   *
   * When additional parameters are _required_ for an interaction/trigger, an object must be passed to enable it.
   * Booleans will not be allowed in this case.
   *
   * When trying to add `listNavigation`, consider using `useListNavigationProps` to generate the necessary props.
   *
   * @example
   * const listNavigationProps = useListNavigationProps({ nested: subMenuItems.length > 0 });
   * const popover = usePopover({
   *   interactions: {
   *     click: false,
   *     focus: true,
   *     hover: { move: false },
   *     listNavigation: listNavigationProps,
   *   }
   *   // …
   * });
   */
  interactions?: {
    click?: boolean | UseClickProps;
    dismiss?: boolean | UseDismissProps;
    hover?: boolean | UseHoverProps<ReferenceType>;
    focus?: boolean | UseFocusProps;
    listNavigation?: UseListNavigationProps;
  };
  role?: 'dialog' | 'menu' | 'listbox';
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
} & Omit<UseFloatingOptions, 'middleware' | 'placement'>;

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

  const mergedInteractions = {
    ...{
      click: true,
      dismiss: true,
      hover: false,
      focus: false,
      listNavigation: undefined,
    },
    ...interactionsProp,
  };

  const tree = useFloatingTree();

  const middleware = React.useMemo(
    () => ({ flip: true, shift: true, ...options.middleware }),
    [options.middleware],
  );

  const [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange,
  );

  const floating = useFloating({
    placement,
    open,
    onOpenChange,
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
    useRole(floating.context, { role: 'dialog', enabled: !!role }),
    useListNavigation(floating.context, {
      enabled: !!mergedInteractions.listNavigation,
      ...(mergedInteractions.listNavigation as UseListNavigationProps),
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

/**
 * @private
 * Helper hook to generate the necessary props for
 * Floating UI's [listNavigation](https://floating-ui.com/docs/useListNavigation) interaction in `usePopover`.
 *
 * This helper hook automatically takes care of providing `listRef` and `activeIndex`.
 * It also updates the `activeIndex` when the user navigates through the list using the `listNavigation` interaction.
 *
 * @param props Will be merged with the default props.
 * @returns The props to spread on the `usePopover.interactions.listNavigation`.
 *
 * @example
 * const listNavigationProps = useListNavigationProps({ nested: subMenuItems.length > 0 });
 * const popover = usePopover({ interactions: { listNavigation: listNavigationProps })
 */
export const useListNavigationProps = (
  props?: Partial<Omit<UseListNavigationProps, 'activeIndex' | 'listRef'>>,
): UseListNavigationProps => {
  const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
    number | null
  >(null);
  const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeIndex: activeIndexProp,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listRef: listRefProp,
    onNavigate: onNavigateProp,
    ...rest
  } = (props ?? {}) as UseListNavigationProps;

  return {
    activeIndex: currentFocusedNodeIndex,
    onNavigate: (index) => {
      setCurrentFocusedNodeIndex(index);
      onNavigateProp?.(index);
    },
    listRef: focusableNodes,

    // We handle the initial focus manually
    focusItemOnOpen: false,
    ...rest,
  };
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
        <PopoverPortal portal={portal}>
          <ThemeProvider
            portalContainer={popoverElement} // portal nested popovers into this one
          >
            <DisplayContents />
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
        </PopoverPortal>
      ) : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverPublicProps>;

// ----------------------------------------------------------------------------

const PopoverPortal = ({
  children,
  portal = true,
}: React.PropsWithChildren<PortalProps>) => {
  const portalTo = usePortalTo(portal);

  return (
    <FloatingPortal root={portalTo}>
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
