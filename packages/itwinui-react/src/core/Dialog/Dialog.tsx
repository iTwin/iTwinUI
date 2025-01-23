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
import type { DialogContextPublicProps } from './DialogContext.js';
import { DialogButtonBar } from './DialogButtonBar.js';
import { DialogMain } from './DialogMain.js';
import { useMergedRefs, Box, Portal } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
} & DialogContextPublicProps;

const DialogComponent = React.forwardRef((props, ref) => {
  const {
    trapFocus = false,
    setFocus = trapFocus,
    preventDocumentScroll = false,
    isOpen = false,
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

  const dialogRootRef = React.useRef<HTMLDivElement>(null);
  const mergedRefs = useMergedRefs(ref, dialogRootRef);

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusedElement = React.useRef<HTMLElement | null>();

  /** Brings back focus to the previously focused element when closed. */
  const beforeClose = React.useCallback(() => {
    if (
      dialogRef.current?.contains(
        dialogRef.current?.ownerDocument.activeElement,
      )
    ) {
      previousFocusedElement.current?.focus();
    }
  }, []);

  const requestClose = React.useCallback(() => {
    beforeClose();
    onClose?.();
  }, [beforeClose, onClose]);

  return isOpen ? (
    <DialogContext.Provider
      value={{
        isOpen,
        onClose: requestClose,
        closeOnEsc,
        closeOnExternalClick,
        isDismissible,
        preventDocumentScroll,
        trapFocus,
        setFocus,
        isDraggable,
        isResizable,
        relativeTo,
        placement,

        // Internal props
        dialogRootRef,
        dialogRef,
        previousFocusedElement,
      }}
    >
      <Portal portal={portal}>
        <Box
          className={cx('iui-dialog-wrapper', className)}
          data-iui-relative={relativeTo === 'container'}
          ref={mergedRefs}
          {...rest}
        />
      </Portal>
    </DialogContext.Provider>
  ) : null;
}) as PolymorphicForwardRefComponent<'div', DialogProps>;
if (process.env.NODE_ENV === 'development') {
  DialogComponent.displayName = 'Dialog';
}

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
});
