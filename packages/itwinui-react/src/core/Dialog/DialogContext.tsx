/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { PortalProps } from '../../utils/index.js';

export type DialogContextProps = {
  /**
   * Flag whether dialog should be shown.
   *
   * It is recommended to directly pass the boolean condition to this prop instead of rendering the `Dialog`
   * conditionally with `isOpen` hard-coded to `true`. One benefit of this is getting an exit animation.
   *
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
   * Prevents focus from leaving the dialog. This is useful when the dialog is modal.
   *
   * Setting this prop to `true` will also set `setFocus` to `true`.
   *
   * @default false
   */
  trapFocus?: boolean;
  /**
   * If true, focuses the dialog.
   *
   * Defaults to `true` if `trapFocus` is set to `true`, otherwise defaults to `false`.
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
   * If true, the dialog will be portaled into a <div> inside the nearest `ThemeProvider`.
   * Recommended to set to true when for modal dialogs that use `relativeTo='viewport'`.
   *
   * Can be set to an object with a `to` property to portal into a specific element.
   * If `to`/`to()` === `null`/`undefined`, the default behavior will be used (i.e. as if `portal` is not passed).
   *
   * Defaults to false if using `Dialog` and true if using `Modal`.
   */
  portal?: PortalProps['portal'];
  /**
   * Dialog root ref. For internal use.
   */
  dialogRootRef?: React.RefObject<HTMLDivElement>;
  /**
   * Determines the positioning of Dialog on page.
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export const DialogContext = React.createContext<
  DialogContextProps | undefined
>(undefined);

export const useDialogContext = () => {
  return React.useContext(DialogContext) || {};
};
