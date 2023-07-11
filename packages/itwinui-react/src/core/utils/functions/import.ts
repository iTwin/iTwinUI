/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// workarounds for:
// (1) typescript trying to transpile dynamic import in CJS environment (https://github.com/TypeStrong/ts-node/discussions/1290)
// (2) jest causing segfault when encountering dynamic import (https://github.com/nodejs/node/issues/35889)
export const dynamicImport =
  typeof jest === undefined
    ? new Function('specifier', 'return import(specifier)')
    : (specifier: string) => import(specifier);
