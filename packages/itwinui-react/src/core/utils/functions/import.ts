/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// work around for typescript trying to transpile dynamic import in CJS environment
// see https://github.com/TypeStrong/ts-node/discussions/1290
export const dynamicImport = new Function(
  'specifier',
  'return import(specifier)',
);
