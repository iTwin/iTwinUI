/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

export type DialogContextProps = {
  /**
   * Flag whether dialog should be shown.
   * @default false
   */
  isOpen?: boolean;
  /**
   * Handler that is called when dialog is closed.
   */
  onClose?: (event?: React.SyntheticEvent) => void;
  /**
   * Flag whether dialog is dismissible. If false, you can't close it.
   * @default true
   */
  isDismissible?: boolean;
  /**
   * Flag whether dialog should be closed on backdrop press.
   * @default false
   */
  closeOnExternalClick?: boolean;
  /**
   * Flag whether dialog should be closed on Escape key press.
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Traps the focus inside the dialog. This is useful when the dialog is modal.
   * @default false
   */
  trapFocus?: boolean;
  /**
   * Prevents body from being scrollable. This is useful when the dialog is modal.
   * @default false
   */
  preventDocumentScroll?: boolean;
};

export const DialogContext = React.createContext<
  DialogContextProps | undefined
>(undefined);

export const useDialogContext = () => {
  return React.useContext(DialogContext) || {};
};
