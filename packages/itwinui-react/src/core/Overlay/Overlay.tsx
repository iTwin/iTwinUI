/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../utils/index.js';

export const Overlay = polymorphic('iui-progress-indicator-overlay');
Overlay.displayName = 'Overlay';

export default './Overlay';
