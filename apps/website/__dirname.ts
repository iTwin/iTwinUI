/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This file needs to be in the root of the project, not in the src folder.

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let __dirname = dirname(fileURLToPath(import.meta.url));

// prod build runs in dist folder so we need to go up one level
if (import.meta.env.PROD) {
  __dirname = join(__dirname, '..');
}

export default __dirname;
