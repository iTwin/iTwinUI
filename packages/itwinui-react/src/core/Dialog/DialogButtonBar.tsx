/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Container for Buttons in `Dialog`. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.ButtonBar>
 *   <Button styleType='high-visibility'>Confirm</Button>
 *   <Button>Close</Button>
 * </Dialog.ButtonBar>
 */
export const DialogButtonBar = polymorphic.div('iui-dialog-button-bar');
if (process.env.NODE_ENV === 'development') {
  DialogButtonBar.displayName = 'Dialog.ButtonBar';
}
