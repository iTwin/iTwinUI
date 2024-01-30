/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJest = typeof (globalThis as any).jest !== 'undefined';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMocha =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (globalThis as any).beforeEach !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  `${(globalThis as any).beforeEach}`.replace(/\s/g, '') ===
    'function(name,fn){suites[0].beforeEach(name,fn);}';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVitest = (typeof globalThis as any).__vitest_index__ !== 'undefined';

let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev =
    process.env.NODE_ENV !== 'production' && !isJest && !isMocha && !isVitest;
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

export { isJest, isMocha, isVitest, isDev, createWarningLogger };
