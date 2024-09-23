/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { isUnitTest } from '../functions/dev.js';
import { getWindow } from '../functions/dom.js';

const _React = React as any;
const ReactInternals =
  _React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

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
export const useWarningLogger =
  process.env.NODE_ENV === 'development' && !isUnitTest
    ? function () {
        const loggedRef = React.useRef(false);
        const timeoutRef = React.useRef<number | undefined>(undefined);

        // https://stackoverflow.com/a/71685253
        const stack =
          ReactInternals?.ReactDebugCurrentFrame?.getCurrentStack?.();

        // Second line in the stack is the component name.
        const componentName = stack?.trim().split('\n')[1]?.trim();

        const prefix = componentName
          ? `Warning (${componentName}):`
          : 'Warning:';

        const logWarning = React.useCallback(
          (message: string) => {
            // Using setTimeout to delay execution until after rendering is complete.
            timeoutRef.current = getWindow()?.setTimeout(() => {
              if (!loggedRef.current) {
                console.error(prefix, message);
                loggedRef.current = true;
              }
            });
          },
          [prefix],
        );

        React.useEffect(() => {
          // Clearing timeout on unmount to avoid double execution in StrictMode.
          // The warning should be logged only once per component instance.
          return () => {
            if (timeoutRef.current) {
              getWindow()?.clearTimeout(timeoutRef.current);
            }
          };
        }, []);

        return logWarning;
      }
    : () => () => {};
