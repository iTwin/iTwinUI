/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const isTestingFramework = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (globalThis as any).jest !== `undefined` ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (globalThis as any).vitest !== 'undefined' ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (globalThis as any).mocha !== 'undefined'
  );
};

let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev = process.env.NODE_ENV !== 'production' && !isTestingFramework;
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

export { isTestingFramework, isDev, createWarningLogger };
