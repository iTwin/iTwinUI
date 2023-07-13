/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import cx from 'classnames';
import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
  size,
  autoUpdate,
} from '@floating-ui/react';
import ReactDOM from 'react-dom';
import {
  Box,
  getDocument,
  useMergedRefs,
  type PolymorphicForwardRefComponent,
} from '../index.js';

type PopoverOptions = {
  placement?: Placement;
  modal?: boolean;
  visible?: boolean;
  onToggleVisible?: (open: boolean) => void;
};

function usePopover({
  placement = 'bottom',
  modal,
  visible: controlledOpen,
  onToggleVisible,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onToggleVisible ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: true,
      }),
    middleware: [
      size({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apply({ rects, elements }: any) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { enabled: controlledOpen == null });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
    }),
    [open, setOpen, interactions, data, modal],
  );
}

type PopoverOwnProps = {
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;
  /**
   * Determines the events that cause the popover to show.
   * Should not be used when `visible` is set.
   * @see [tippy.js trigger prop](https://atomiks.github.io/tippyjs/v6/all-props/#trigger)
   */
  trigger?: string;
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   * @see [tippy.js placement prop](https://atomiks.github.io/tippyjs/v6/all-props/#placement).
   */
  placement?: Placement;
  content?: React.ReactNode;
  children?: React.ReactNode;
  portal?: boolean | { to: HTMLElement };
};

/**
 * Wrapper around [tippy.js](https://atomiks.github.io/tippyjs)
 * with pre-configured props and plugins (e.g. lazy mounting, focus, etc).
 * @private
 */
export const Popover = React.forwardRef((props, ref) => {
  const {
    children,
    content,
    className,
    style,
    portal = true,
    placement,
    modal,
    visible,
    onToggleVisible,
    ...rest
  } = props;
  const themeInfo = React.useContext(ThemeContext);

  const popover = usePopover({ placement, modal, visible, onToggleVisible });

  const refs = useMergedRefs(popover.refs.setFloating, ref);
  const triggerRef = popover.refs.setReference;

  const contentBox = (
    <Box
      className={cx('iui-popover', className)}
      style={{ ...popover.floatingStyles, ...style }}
      {...popover.getFloatingProps(rest)}
      ref={refs}
    >
      {content}
    </Box>
  );

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? themeInfo?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(
            children,
            popover.getReferenceProps({
              ref: triggerRef,
              ...children.props,
            }),
          )
        : null}
      {popover.open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;
  // Plugin to allow lazy mounting. See https://github.com/atomiks/tippyjs-react#lazy-mounting
  const lazyLoad = {
    fn: () => ({
      onShow: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  // Plugin to remove tabindex from tippy, to prevent focus ring from unintentionally showing.
  const removeTabIndex = {
    fn: () => ({
      onCreate: (instance: Instance) => {
        instance.popper.firstElementChild?.removeAttribute('tabindex');
      },
    }),
  };

  const computedProps: Partial<TippyProps> = {
    allowHTML: true,
    animation: false,
    appendTo: (el) =>
      themeInfo?.portalContainerRef?.current || el.ownerDocument.body,
    arrow: false,
    duration: 0,
    interactive: true,
    role: '',
    offset: [0, 0],
    maxWidth: '',
    zIndex: 99999,
    ...props,
    className: cx('iui-popover', props.className),
    // add additional check for isDomAvailable when using in controlled mode,
    // because rootRef is not available in first render
    visible:
      props.visible !== undefined ? props.visible && isDomAvailable : undefined,
    plugins: [
      lazyLoad,
      removeTabIndex,
      hideOnEscOrTab,
      ...(props.plugins || []),
    ],
    popperOptions: {
      strategy: 'fixed',
      ...props.popperOptions,
      modifiers: [
        { name: 'flip' },
        { name: 'preventOverflow', options: { padding: 0 } },
        ...(props.popperOptions?.modifiers || []),
      ],
    },
  };

  if (props.render) {
    const render = props.render;
    computedProps.render = (...args) => (mounted ? render(...args) : '');
  } else {
    // Fixing issue where elements below Popover gets click events.
    // Tippy uses react Portal, which propagates events by react tree, not dom tree.
    // Read more: https://reactjs.org/docs/portals.html#event-bubbling-through-portals
    const clonedContent = React.isValidElement(props.content)
      ? React.cloneElement(props.content as JSX.Element, {
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            (props.content as JSX.Element).props.onClick?.(e);
          },
        })
      : props.content;
    computedProps.content = mounted ? clonedContent : '';
  }

  return <Tippy {...computedProps} ref={refs} />;
});

/**
 * Plugin to hide Popover when either Esc key is pressed,
 * or when the content inside is not tabbable and Tab key is pressed.
 */
// export const hideOnEscOrTab = {
//   fn(instance: Instance) {
//     /** @returns true if none of the children are tabbable */
//     const shouldHideOnTab = () => {
//       const descendents = Array.from<HTMLElement>(
//         instance.popper.querySelectorAll('*'),
//       );
//       return !descendents.some((el) => el?.tabIndex >= 0);
//     };

//     const onKeyDown = (event: KeyboardEvent) => {
//       if (event.altKey) {
//         return;
//       }

//       switch (event.key) {
//         case 'Escape':
//           instance.hide();
//           break;
//         case 'Tab':
//           if (shouldHideOnTab()) {
//             event.shiftKey && event.preventDefault(); // focus popover target on Shift+Tab
//             instance.hide();
//           }
//           break;
//       }
//     };

//     return {
//       onShow() {
//         instance.popper.addEventListener('keydown', onKeyDown);
//       },
//       onHide() {
//         instance.popper.removeEventListener('keydown', onKeyDown);
//       },
//     };
//   },
// };

export default Popover;
