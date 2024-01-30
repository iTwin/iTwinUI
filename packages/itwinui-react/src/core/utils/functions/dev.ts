/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/no-explicit-any */

const isJest = typeof (globalThis as any).jest !== 'undefined';

// See https://github.com/JoshuaKGoldberg/console-fail-test/blob/4738d5f3e506735c2c16f52588a9cfade58b9569/src/environments/mocha.ts#L19-L28
const isMocha =
  typeof (globalThis as any).beforeEach !== 'undefined' &&
  `${(globalThis as any).beforeEach}`.replace(/\s/g, '') ===
    'function(name,fn){suites[0].beforeEach(name,fn);}';

// See https://github.com/iTwin/iTwinUI/blob/bb1c2260568ce58b4676f2b18081ec7b825812cd/packages/itwinui-react/src/core/utils/functions/dev.ts#L13
const isVitest = (typeof globalThis as any).__vitest_index__ !== 'undefined';

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
