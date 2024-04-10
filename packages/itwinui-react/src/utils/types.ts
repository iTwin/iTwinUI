/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This allows custom strings and keeps intellisense for string unions.
 * See https://github.com/Microsoft/TypeScript/issues/29729
 */
export type AnyString = string & {}; // eslint-disable-line @typescript-eslint/ban-types
