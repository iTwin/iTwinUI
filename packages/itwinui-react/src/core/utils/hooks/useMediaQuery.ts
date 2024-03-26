/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSyncExternalStore } from './useSyncExternalStore.js';
import { getWindow } from '../functions/dom.js';

export const useMediaQuery = (queryString: string) => {
  const [getSnapshot, subscribe] = React.useMemo(() => {
    const mediaQueryList = getWindow()?.matchMedia(queryString);

    return [
      () => mediaQueryList?.matches,
      (onChange: () => void) => {
        mediaQueryList?.addEventListener?.('change', onChange);
        return () => {
          mediaQueryList?.removeEventListener?.('change', onChange);
        };
      },
    ];
  }, [queryString]);

  return useSyncExternalStore(
    subscribe,
    typeof document !== 'undefined' ? getSnapshot : () => undefined,
    () => undefined,
  );
};
