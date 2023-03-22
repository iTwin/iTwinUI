/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { getWindow } from './dom';

/**
 * Returns true if the :has selector is supported in the browser
 */

export const supportsHas = () =>
  getWindow()?.CSS?.supports?.('selector(:has(+ *))');
