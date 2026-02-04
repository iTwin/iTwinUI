/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useLatestRef } from './useLatestRef.js';

/**
 * Hook that "memoizes" a function by skipping reactivity, similar to `React.useEffectEvent`,
 * except it returns a stable reference. Under the hood, it combines `useLatestRef` and `React.useCallback`.
 *
 * @private
 *
 * @example
 * ```ts
 * const onClick = useStableCallback(props.onClick);
 * ```
 */
export function useStableCallback<T extends (...args: any) => any>(
  callback: T | undefined,
) {
  const latestCallback = useLatestRef(callback);

  return React.useCallback<(...args: any) => any>(
    (...args) => latestCallback.current?.(...args),
    [latestCallback],
  ) as T;
}
