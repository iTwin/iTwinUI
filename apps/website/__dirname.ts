/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// This file needs to be in the root of the project, not in the src folder.

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let __dirname = dirname(fileURLToPath(import.meta.url));

// prod build runs in a weird path inside dist/ so we need to move it back a couple levels
if (import.meta.env.PROD) {
  __dirname = join(__dirname, '../../..');
}

export default __dirname;
