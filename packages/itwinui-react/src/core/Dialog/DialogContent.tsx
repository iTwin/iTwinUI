/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Container for content in `Dialog`. Recommended to be used as a child of `Dialog`.
 * @example
 * <Dialog.Content>
 *   My dialog content
 * </Dialog.Content>
 */
export const DialogContent = polymorphic.div('iui-dialog-content');
