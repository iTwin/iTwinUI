/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSyncExternalStore } from './useSyncExternalStore.js';

export const useMediaQuery = (queryString: string) => {
  const getSnapshot = React.useCallback(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia?.(queryString).matches
      : undefined;
  }, [queryString]);

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia?.(queryString);
      mediaQueryList?.addEventListener?.('change', onChange);
      return () => mediaQueryList?.removeEventListener?.('change', onChange);
    },
    [queryString],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
};
