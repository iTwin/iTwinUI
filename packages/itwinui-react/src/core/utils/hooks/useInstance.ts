/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSyncExternalStore } from './useSyncExternalStore.js';

const internals = Symbol();

class Instance {
  [internals] = {
    initialize: (properties = {}) => {
      Object.assign(this, properties);
    },
  };
}

export const useInstance = () => React.useMemo(() => new Instance(), []);

/**
 * Synchronizes the instance with the provided properties.
 *
 * @param instance Instance created by `useInstance`.
 * @param properties Memoized object containing properties to be synchronized.
 *
 * @usage
 * ```tsx
 * const instance = useInstance();
 *
 * const properties = React.useMemo(() => ({
 *   show: () => console.log('show'),
 * }), []);
 *
 * useSynchronizeInstance(instance, properties);
 * ```
 */
export const useSynchronizeInstance = <T>(instance: T, properties: T) => {
  const synchronize = React.useCallback(() => {
    (instance as any)?.[internals]?.initialize?.(properties);
    return () => {};
  }, [instance, properties]);

  return useSyncExternalStore(
    synchronize,
    () => instance,
    () => instance,
  );
};
