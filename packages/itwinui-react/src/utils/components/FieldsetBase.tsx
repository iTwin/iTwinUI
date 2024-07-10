/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../functions/polymorphic.js';

/**
 * Thin wrapper over the `<fieldset>` element that removes its default styles.
 *
 * @private
 */
export const FieldsetBase = polymorphic.fieldset('iui-fieldset-base');
