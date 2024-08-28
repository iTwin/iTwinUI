/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

// @ts-expect-error -- jest is not used in iTwinUI but may be used in consuming apps
const isJest = typeof jest !== 'undefined';

const isMocha =
  typeof (globalThis as any).beforeEach !== 'undefined' &&
  `${(globalThis as any).beforeEach}`.replace(/\s/g, '') ===
    'function(name,fn){suites[0].beforeEach(name,fn);}';
const isVitest = typeof (globalThis as any).__vitest_index__ !== 'undefined';

const isUnitTest = isJest || isVitest || isMocha;

const createWarningLogger =
  process.env.NODE_ENV === 'development' && !isUnitTest
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

/**
 * Returns a function that can be used to log one-time warnings in dev environments.
 *
 * **Note**: The actual log call should be wrapped in a check against `process.env.NODE_ENV === 'development'`
 * to ensure that it is removed from the production build output (by SWC).
 * Read more about the [`NODE_ENV` convention](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production).
 *
 * @example
 * const logWarning = useWarningLogger();
 *
 * if (process.env.NODE_ENV === 'development') {
 *   logWarning("please don't use this")
 * }
 */
function useWarningLogger() {
  const logWarning = React.useMemo(() => createWarningLogger(), []);
  return logWarning;
}

export { isUnitTest, useWarningLogger };
