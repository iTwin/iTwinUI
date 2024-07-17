/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../functions/polymorphic.js';

/** @private */
export const InputWithIcon = polymorphic.div('iui-input-with-icon');
if (process.env.NODE_ENV === 'development') {
  InputWithIcon.displayName = 'InputWithIcon';
}
