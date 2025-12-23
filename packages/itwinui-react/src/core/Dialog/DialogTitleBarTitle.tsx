/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Dialog title bar. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.TitleBar>
 *   <Dialog.TitleBar.Title>My dialog title</Dialog.TitleBar.Title>
 * </Dialog.TitleBar>
 */
export const DialogTitleBarTitle = polymorphic.h2('iui-dialog-title');
if (process.env.NODE_ENV === 'development') {
  DialogTitleBarTitle.displayName = 'Dialog.TitleBar.Title';
}
