/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSyncExternalStore } from './useSyncExternalStore.js';

class Instance {}

export const useInstance = () => React.useMemo(() => new Instance(), []);

/**
 * Synchronizes the instance with the provided properties.
 *
 * @param instance Instance created by `useInstance`.
 * @param properties Memoized object containing properties to be synchronized.
 *
 * @example
 * const instance = useInstance();
 *
 * const properties = React.useMemo(() => ({
 *   show: () => console.log('show'),
 * }), []);
 *
 * useSynchronizeInstance(instance, properties);
 *
 * instance.show(); // logs 'show'
 */
export const useSynchronizeInstance = <T>(instance: T, properties: T) => {
  const synchronize = React.useCallback(() => {
    if (!(instance instanceof Instance)) {
      return () => {};
    }

    Object.assign(instance, properties);
    return () => {
      for (const key in properties) {
        delete instance[key];
      }
    };
  }, [instance, properties]);

  return useSyncExternalStore(
    synchronize,
    () => instance,
    () => instance,
  );
};
