/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Dialog title bar. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.TitleBar>My dialog title</Dialog.TitleBar>
 */
export const DialogTitleBarTitle = polymorphic.div('iui-dialog-title');
