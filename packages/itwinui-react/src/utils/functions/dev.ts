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

let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev = process.env.NODE_ENV !== 'production' && !isUnitTest;
} catch {}

/**
 * Logs message one time only in dev environments.
 *
 * @example
 * const logWarningInDev = createWarningLogger();
 * logWarningInDev("please don't use this")
 */
const createWarningLogger = !isDev
  ? () => () => {}
  : () => {
      let logged = false;
      return (message: string) => {
        if (!logged) {
          console.warn(message);
          logged = true;
        }
      };
    };

export { isUnitTest, isDev, createWarningLogger };
