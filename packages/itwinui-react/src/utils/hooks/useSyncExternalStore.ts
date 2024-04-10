/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
const _React = React; // prevent bundlers from stripping the namespace import

/**
 * Wrapper around `React.useSyncExternalStore` that uses a shim for React 17.
 */
export const useSyncExternalStore =
  _React.useSyncExternalStore || useSyncExternalStoreShim;

// ----------------------------------------------------------------------------

/**
 * The shim below is adapted from React's source to make it ESM-compatible.
 *
 * Note: This does not use `getServerSnapshot` at all, because there is
 * apparently no way to check "hydrating" state in pre-18.
 *
 * @see https://github.com/facebook/react/tree/main/packages/use-sync-external-store
 */
function useSyncExternalStoreShim<T>(
  subscribe: (onSubscribe: () => void) => () => void,
  getSnapshot: () => T,
): T {
  const value = getSnapshot();
  const [{ instance }, forceUpdate] = React.useState({
    instance: { value, getSnapshot },
  });

  React.useLayoutEffect(() => {
    instance.value = value;
    instance.getSnapshot = getSnapshot;

    if (!Object.is(value, getSnapshot())) {
      forceUpdate({ instance });
    }
  }, [subscribe, value, getSnapshot]); // eslint-disable-line

  React.useEffect(() => {
    const synchronize = () => {
      if (!Object.is(instance.value, instance.getSnapshot())) {
        forceUpdate({ instance });
      }
    };
    synchronize();
    return subscribe(synchronize);
  }, [subscribe]); // eslint-disable-line

  return value;
}
