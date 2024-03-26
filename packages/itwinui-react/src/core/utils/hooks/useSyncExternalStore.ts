/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
const _React = React; // prevent bundlers from stripping the namespace import

const useSyncExternalStoreShim =
  typeof document === 'undefined' ? useSESServerShim : useSESClientShim;

/**
 * Wrapper around `React.useSyncExternalStore` that uses a shim for React 17.
 *
 * Note: The shim does not use `getServerSnapshot` at all, because there is
 * apparently no way to check "hydrating" state in pre-18.
 *
 * @see https://github.com/facebook/react/tree/main/packages/use-sync-external-store
 */
export const useSyncExternalStore =
  _React.useSyncExternalStore || useSyncExternalStoreShim;

// ----------------------------------------------------------------------------

// The shim below is adapted from the React source code to make it ESM-compatible.
// MIT License: https://github.com/facebook/react/blob/main/LICENSE

/** @see https://github.com/facebook/react/blob/1a6d36b1a3ec43cb5700e28d7315b3aa2822365d/packages/use-sync-external-store/src/useSyncExternalStoreShimServer.js */
function useSESServerShim<T>(_: () => () => void, getSnapshot: () => T): T {
  return getSnapshot();
}

/** @see https://github.com/facebook/react/blob/1a6d36b1a3ec43cb5700e28d7315b3aa2822365d/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js */
function useSESClientShim<T>(
  subscribe: (onSubscribe: () => void) => () => void,
  getSnapshot: () => T,
): T {
  const value = getSnapshot();
  const [{ inst }, forceUpdate] = React.useState({
    inst: { value, getSnapshot },
  });

  React.useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot;

    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }
  }, [subscribe, value, getSnapshot]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const synchronize = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    };
    synchronize();
    return subscribe(synchronize);
  }, [subscribe]); // eslint-disable-line react-hooks/exhaustive-deps

  return value;
}

function checkIfSnapshotChanged<T>(inst: { value: T; getSnapshot: () => T }) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !Object.is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}
