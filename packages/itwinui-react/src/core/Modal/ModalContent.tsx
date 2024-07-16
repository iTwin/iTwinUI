/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DialogContent } from '../Dialog/DialogContent.js';

/**
 * Container for content in `Modal`.
 */
export const ModalContent = Object.assign({}, DialogContent);
if (process.env.NODE_ENV === 'development') {
  ModalContent.displayName = 'ModalContent';
}
