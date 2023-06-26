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
} from '@floating-ui/react';
import ReactDOM from 'react-dom';
import {
  Box,
  getDocument,
  useMergedRefs,
  type PolymorphicForwardRefComponent,
} from '../index.js';

type PopoverOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  visible?: boolean;
};

function usePopover({
  initialOpen = false,
  placement = 'bottom',
  modal,
  visible: controlledOpen,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [],
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
  const { children, content, className, style, portal = true, ...rest } = props;
  const themeInfo = React.useContext(ThemeContext);

  const popover = usePopover();

  const tippyRef = React.useRef<Element>(null);
  const refs = useMergedRefs(tippyRef, ref);

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
              ref: popover.refs.setReference,
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
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps>;

/**
 * Plugin to hide Popover when either Esc key is pressed,
 * or when the content inside is not tabbable and Tab key is pressed.
 */
export const hideOnEscOrTab = {
  fn(instance: Instance) {
    /** @returns true if none of the children are tabbable */
    const shouldHideOnTab = () => {
      const descendents = Array.from<HTMLElement>(
        instance.popper.querySelectorAll('*'),
      );
      return !descendents.some((el) => el?.tabIndex >= 0);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        return;
      }

      switch (event.key) {
        case 'Escape':
          instance.hide();
          break;
        case 'Tab':
          if (shouldHideOnTab()) {
            event.shiftKey && event.preventDefault(); // focus popover target on Shift+Tab
            instance.hide();
          }
          break;
      }
    };

    return {
      onShow() {
        instance.popper.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        instance.popper.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};

export default Popover;
