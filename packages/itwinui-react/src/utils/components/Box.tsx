/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../functions/polymorphic.js';

/**
 * Polymorphic component that renders a div element by default.
 * Intended to be used as a base for other components.
 * @private
 */
export const Box = polymorphic.div('');
