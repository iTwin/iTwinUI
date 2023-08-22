/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  size,
  autoUpdate,
  offset,
  flip,
  shift,
  autoPlacement,
  inline,
  hide,
  safePolygon,
  FloatingFocusManager,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import {
  Box,
  getDocument,
  mergeRefs,
  useIsClient,
  useMergedRefs,
} from '../index.js';
import type { PolymorphicForwardRefComponent } from '../index.js';

type PopoverOptions = {
  /**
   *
   */
  placement?: Placement;
  /**
   *
   */
  visible?: boolean;
  /**
   *
   */
  onToggleVisible?: (open: boolean) => void;
  /**
   *
   */
  onClickOutsideClose?: boolean;
  /**
   *
   */
  hover?: boolean;
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
  reference?: HTMLElement | null;
};

type PopoverOwnProps = {
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   */
  placement?: Placement;
  content?: React.ReactNode;
  children?: React.ReactNode;
  applyBackground?: boolean;
  portal?: boolean | { to: HTMLElement | (() => HTMLElement) };
  /**
   * Whether the popover should match the width of the trigger.
   */
  matchWidth?: boolean;
};

/**
 * A utility component to help with positioning of floating content.
 * Built on top of [`floating-ui`](https://floating-ui.com/)
 */
export const Popover = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    content,
    className,
    style,
    portal = true,
    applyBackground = false,
    reference,
    onClickOutsideClose,
    hover: hoverProp,
    placement = 'bottom-start',
    visible: controlledOpen,
    onToggleVisible,
    autoUpdateOptions,
    middleware = { flip: true, shift: true },
    matchWidth,
    ...rest
  } = props;

  const portalTo = usePortalTo(portal);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>();
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onToggleVisible ?? setUncontrolledOpen;

  const floating = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, autoUpdateOptions),
    elements: { reference },
    middleware: [
      middleware.offset !== undefined && offset(middleware.offset),
      middleware.flip && flip(),
      middleware.shift && shift(),
      middleware.size && size(),
      middleware.autoPlacement && autoPlacement(),
      middleware.inline && inline(),
      middleware.hide && hide(),
    ].filter(Boolean),
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(floating.context),
    useDismiss(floating.context, { outsidePress: onClickOutsideClose }),
    useRole(floating.context, { enabled: false }), // TODO: Fix roles in all components,
    useHover(floating.context, {
      enabled: !!hoverProp,
      handleClose: safePolygon(),
    }),
  ]);

  const [triggerWidth, triggerCallbackRef] = useTriggerWidth();

  const contentBox = (
    <FloatingFocusManager
      context={floating.context}
      modal={false}
      initialFocus={-1}
      returnFocus
    >
      <Box
        className={cx('iui-popover', className)}
        data-iui-apply-background={applyBackground ? true : undefined}
        style={{
          ...floating.floatingStyles,
          ...(matchWidth
            ? {
                minInlineSize: triggerWidth,
                maxInlineSize: `min(${triggerWidth * 2}px, 90vw)`,
              }
            : null),
          ...style,
        }}
        {...getFloatingProps(rest)}
        ref={useMergedRefs(floating.refs.setFloating, forwardedRef)}
      >
        {content}
      </Box>
    </FloatingFocusManager>
  );

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children as JSX.Element, {
            ...getReferenceProps((children as JSX.Element).props),
            ref: mergeRefs(
              floating.refs.setReference,
              triggerCallbackRef,
              (children as any).ref, // eslint-disable-line @typescript-eslint/no-explicit-any
            ),
          })
        : null}
      {open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;

export default Popover;

// ----------------------------------------------------------------------------

const usePortalTo = (portal: NonNullable<PopoverOwnProps['portal']>) => {
  const isClient = useIsClient();
  const themeInfo = React.useContext(ThemeContext);

  if (!isClient) {
    return null;
  }

  if (typeof portal === 'boolean') {
    return portal ? themeInfo?.portalContainer ?? getDocument()?.body : null;
  }

  return typeof portal.to === 'function' ? portal.to() : portal.to;
};

// ----------------------------------------------------------------------------

/** Returns a callback ref and a state variable that contains the width. */
const useTriggerWidth = () => {
  const [width, setWidth] = React.useState(0);
  const triggerRef = React.useCallback((element: HTMLElement | null) => {
    if (element) {
      setWidth(element.offsetWidth);
    }
  }, []);

  return [width, triggerRef] as const;
};
