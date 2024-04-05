/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { DialogTitleBar } from './DialogTitleBar.js';
import { DialogContent } from './DialogContent.js';
import { DialogBackdrop } from './DialogBackdrop.js';
import { DialogContext } from './DialogContext.js';
import type { DialogContextProps } from './DialogContext.js';
import { DialogButtonBar } from './DialogButtonBar.js';
import { DialogMain } from './DialogMain.js';
import {
  Box,
  Portal,
  useControlledState,
  useInstance,
  useMergedRefs,
  useSynchronizeInstance,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Transition } from 'react-transition-group';

// ----------------------------------------------------------------------------

type DialogInstance = {
  /** Call this function to show (open) the dialog. */
  show: () => void;
  /** Call this function to hide (close) the dialog. */
  close: () => void;
};

type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
  /**
   * Pass an instance created by `useInstance` to control the dialog programmatically.
   */
  instance?: DialogInstance;
} & Omit<DialogContextProps, 'dialogRootRef' | 'setIsOpen'>;

// ----------------------------------------------------------------------------

const DialogComponent = React.forwardRef((props, forwardedRef) => {
  const {
    trapFocus = false,
    setFocus = false,
    preventDocumentScroll = false,
    isOpen: isOpenProp,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = false,
    onClose,
    isDraggable = false,
    isResizable = false,
    relativeTo = 'viewport',
    placement,
    className,
    portal = false,
    instance: instanceProp,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useControlledState(false, isOpenProp);
  useSynchronizeInstance(
    instanceProp,
    React.useMemo(
      () => ({
        show: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }),
      [setIsOpen],
    ),
  );

  const dialogRootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Transition in={isOpen} timeout={{ exit: 600 }} mountOnEnter unmountOnExit>
      <DialogContext.Provider
        value={{
          isOpen,
          setIsOpen,
          onClose,
          closeOnEsc,
          closeOnExternalClick,
          isDismissible,
          preventDocumentScroll,
          trapFocus,
          setFocus,
          isDraggable,
          isResizable,
          relativeTo,
          dialogRootRef,
          placement,
        }}
      >
        <Portal portal={portal}>
          <Box
            className={cx('iui-dialog-wrapper', className)}
            data-iui-relative={relativeTo === 'container'}
            ref={useMergedRefs(dialogRootRef, forwardedRef)}
            {...rest}
          />
        </Portal>
      </DialogContext.Provider>
    </Transition>
  );
}) as PolymorphicForwardRefComponent<'div', DialogProps>;

// ----------------------------------------------------------------------------

/**
 * Dialog component.
 * @example
 * <Dialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   trapFocus
 *   preventDocumentScroll
 * >
 *   <Dialog.Backdrop />
 *   <Dialog.Main aria-modal>
 *    <Dialog.TitleBar>My dialog title</Dialog.TitleBar>
 *    <Dialog.Content>
 *      Here is my dialog content
 *    </Dialog.Content>
 *    <Dialog.ButtonBar>
 *      <Button styleType='high-visibility'>Confirm</Button>
 *      <Button>Close</Button>
 *    </Dialog.ButtonBar>
 *   </Dialog.Main>
 * </Dialog>
 */
export const Dialog = Object.assign(DialogComponent, {
  Backdrop: DialogBackdrop,
  Main: DialogMain,
  TitleBar: DialogTitleBar,
  Content: DialogContent,
  ButtonBar: DialogButtonBar,
  useInstance: useInstance as () => DialogInstance,
});
