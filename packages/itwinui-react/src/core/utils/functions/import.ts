/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Wrapper around native `import()` with workarounds for:
 *   1. typescript trying to transpile dynamic import in CJS environment (https://github.com/microsoft/TypeScript/issues/43329)
 *   2. jest/node causing segfault when encountering dynamic import (https://github.com/nodejs/node/issues/35889)
 */
export const dynamicImport =
  typeof jest === undefined
    ? new Function('specifier', 'return import(specifier)')
    : (specifier: string) => import(specifier);
