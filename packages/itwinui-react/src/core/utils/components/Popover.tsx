/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
// import cx from 'classnames';
// import Tippy from '@tippyjs/react';
import type { TippyProps } from '@tippyjs/react';
import type { Placement, Instance } from 'tippy.js';
// import { useMergedRefs, useIsClient } from '../hooks/index.js';
export type PopoverInstance = Instance;
// import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
// import {
//   useFloating,
//   useClick,
//   useDismiss,
//   useRole,
//   useInteractions,
// } from '@floating-ui/react';
// // import ReactDOM from 'react-dom';

// type PopoverOptions = {
//   initialOpen?: boolean;
//   placement?: Placement;
//   modal?: boolean;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// };

// function usePopover({
//   initialOpen = false,
//   // placement = 'bottom',
//   modal,
//   open: controlledOpen,
//   onOpenChange: setControlledOpen,
// }: PopoverOptions = {}) {
//   const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
//   const [labelId, setLabelId] = React.useState<string | undefined>();
//   const [descriptionId, setDescriptionId] = React.useState<
//     string | undefined
//   >();

//   const open = controlledOpen ?? uncontrolledOpen;
//   const setOpen = setControlledOpen ?? setUncontrolledOpen;

//   const data = useFloating({
//     // placement,
//     open,
//     onOpenChange: setOpen,
//     // whileElementsMounted: autoUpdate,
//     middleware: [],
//   });

//   const context = data.context;

//   const click = useClick(context, {
//     enabled: controlledOpen == null,
//   });
//   const dismiss = useDismiss(context);
//   const role = useRole(context);

//   const interactions = useInteractions([click, dismiss, role]);

//   return React.useMemo(
//     () => ({
//       open,
//       setOpen,
//       ...interactions,
//       ...data,
//       modal,
//       labelId,
//       descriptionId,
//       setLabelId,
//       setDescriptionId,
//     }),
//     [open, setOpen, interactions, data, modal, labelId, descriptionId],
//   );
// }

export type PopoverProps = {
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
} & Omit<TippyProps, 'placement' | 'trigger' | 'visible'>;

/**
 * Wrapper around [tippy.js](https://atomiks.github.io/tippyjs)
 * with pre-configured props and plugins (e.g. lazy mounting, focus, etc).
 * @private
 */
// export const Popover = React.forwardRef((props: PopoverProps, ref) => {
export const Popover = React.forwardRef(() => {
  // const { children } = props;
  // const [mounted, setMounted] = React.useState(false);
  // const themeInfo = React.useContext(ThemeContext);
  // const isDomAvailable = useIsClient();

  // const popover = usePopover();

  // const tippyRef = React.useRef<Element>(null);
  // const refs = useMergedRefs(tippyRef, ref);

  // // Plugin to remove tabindex from tippy, to prevent focus ring from unintentionally showing.
  // const removeTabIndex = {
  //   fn: () => ({
  //     onCreate: (instance: Instance) => {
  //       instance.popper.firstElementChild?.removeAttribute('tabindex');
  //     },
  //   }),
  // };

  return (
    <>
      {/* {React.isValidElement(children)
        ? React.cloneElement(
            children,
            popover.getReferenceProps({
              ref: popover.refs.setReference,
              ...children.props,
            }),
          )
        : null} */}
      {/* {popover.open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null} */}
    </>
  );
});

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
