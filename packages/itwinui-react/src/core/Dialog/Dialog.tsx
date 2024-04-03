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
  useMergedRefs,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Transition } from 'react-transition-group';

type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
} & Omit<DialogContextProps, 'dialogRootRef' | 'setIsOpen'>;

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
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useControlledState(false, isOpenProp);
  const dialogRootRef = React.useRef<HTMLDivElement>(null);
  const [dialog, setDialog] = React.useState<HTMLDivElement | null>(null);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      const _dialog = (dialog as any) || {};

      Object.assign(_dialog, {
        show: () => setIsOpen(true),
        close: () => setIsOpen(false),
      });

      return _dialog;
    },
    [dialog, setIsOpen],
  );

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
            ref={useMergedRefs(dialogRootRef, setDialog)}
            {...rest}
          />
        </Portal>
      </DialogContext.Provider>
    </Transition>
  );
}) as PolymorphicForwardRefComponent<'div', DialogProps>;

// ----------------------------------------------------------------------------

type DialogComponentType = typeof DialogComponent & {
  Ref: HTMLDivElement & {
    /** Call this function to show (open) the dialog. */
    show: () => void;
    /** Call this function to close the dialog. */
    close: () => void;
  };
};

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
export const Dialog = Object.assign(DialogComponent as DialogComponentType, {
  Backdrop: DialogBackdrop,
  Main: DialogMain,
  TitleBar: DialogTitleBar,
  Content: DialogContent,
  ButtonBar: DialogButtonBar,
});
