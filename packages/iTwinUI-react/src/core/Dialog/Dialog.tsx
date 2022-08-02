/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import '@itwin/itwinui-css/css/dialog.css';
import { DialogTitleBar } from './DialogTitleBar';
import { DialogContent } from './DialogContent';
import { DialogBackdrop } from './DialogBackdrop';
import { DialogContext, DialogContextProps } from './DialogContext';
import { DialogButtonBar } from './DialogButtonBar';
import DialogMain from './DialogMain';

export type DialogProps = {
  /**
   * Dialog content.
   */
  children: React.ReactNode;
} & DialogContextProps;

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
export const Dialog = Object.assign(
  (props: DialogProps) => {
    const {
      children,
      trapFocus = false,
      preventDocumentScroll = false,
      isOpen = false,
      isDismissible = true,
      closeOnEsc = true,
      closeOnExternalClick = false,
      onClose,
    } = props;

    return (
      <DialogContext.Provider
        value={{
          isOpen,
          onClose,
          closeOnEsc,
          closeOnExternalClick,
          isDismissible,
          preventDocumentScroll,
          trapFocus,
        }}
      >
        {children}
      </DialogContext.Provider>
    );
  },
  {
    Backdrop: DialogBackdrop,
    Main: DialogMain,
    TitleBar: DialogTitleBar,
    Content: DialogContent,
    ButtonBar: DialogButtonBar,
  },
);

export default Dialog;
