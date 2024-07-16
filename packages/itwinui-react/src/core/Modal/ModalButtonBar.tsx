/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DialogButtonBar } from '../Dialog/DialogButtonBar.js';

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar = Object.assign({}, DialogButtonBar);
if (process.env.NODE_ENV === 'development') {
  ModalButtonBar.displayName = 'ModalButtonBar';
}
