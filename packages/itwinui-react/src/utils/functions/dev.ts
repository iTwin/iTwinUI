/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// @ts-expect-error -- jest is not used in iTwinUI but may be used in consuming apps
const isJest = typeof jest !== 'undefined';

const isMocha =
  typeof (globalThis as any).beforeEach !== 'undefined' &&
  `${(globalThis as any).beforeEach}`.replace(/\s/g, '') ===
    'function(name,fn){suites[0].beforeEach(name,fn);}';
const isVitest = typeof (globalThis as any).__vitest_index__ !== 'undefined';

const isUnitTest = isJest || isVitest || isMocha;

/**
 * Logs message one time only in dev environments.
 *
 * @example
 * const logWarningInDev = createWarningLogger();
 *
 * if (process.env.NODE_ENV === 'development') {
 *  logWarningInDev("please don't use this")
 * }
 */
const createWarningLogger =
  process.env.NODE_ENV === 'development'
    ? () => {
        let logged = false;
        return (message: string) => {
          if (!logged) {
            console.warn(message);
            logged = true;
          }
        };
      }
    : () => () => {};

export { isUnitTest, createWarningLogger };
