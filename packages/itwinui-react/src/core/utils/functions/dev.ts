/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJest = typeof (globalThis as any).jest !== 'undefined';

let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev = process.env.NODE_ENV !== 'production' && !isJest;
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

export { isJest, isDev, createWarningLogger };
