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
   * If true, focuses the dialog.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Prevents body from being scrollable. This is useful when the dialog is modal.
   * @default false
   */
  preventDocumentScroll?: boolean;
  /**
   * Flag whether dialog is draggable.
   *
   * If you want to make dialog draggable relatively to the container, you should use set `relativeTo` to `container`.
   *
   * @default false
   */
  isDraggable?: boolean;
  /**
   * Flag whether dialog is resizable.
   * @default false
   */
  isResizable?: boolean;
  /**
   * Whether dialog should be positioned relatively to a container or the viewport.
   *
   * Using `'container'` will absolutely position this dialog relative to the closest positioned ancestor.
   * In other words, you must place the dialog as a child of an element that has `position` set to
   * something other than `static`, e.g. `position: relative`.
   * @default 'viewport'
   */
  relativeTo?: 'container' | 'viewport';
  /**
   * Dialog root ref. For internal use.
   */
  dialogRootRef?: React.RefObject<HTMLDivElement>;
};

export const DialogContext = React.createContext<
  DialogContextProps | undefined
>(undefined);

export const useDialogContext = () => {
  return React.useContext(DialogContext) || {};
};
