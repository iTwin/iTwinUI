/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSafeContext } from '../hooks/useSafeContext.js';

export type FutureOptions = {
  /**
   * @alpha
   *
   * If enabled, the theme resembles the future iTwinUI version's theme (including alphas) *whenever possible*.
   *
   * This is useful in making apps looks like future versions of iTwinUI to help with incremental adoption.
   *
   * **NOTE**: Since this is a theme bridge to *future* versions, the theme could have breaking changes.
   */
  themeBridge?: boolean;
};

const FutureFlagsContext = React.createContext<FutureOptions>({});

/**
 * Hook to access future flags.
 * @private
 *
 * @example
 * ```jsx
 * const themeBridge = useFutureFlag('themeBridge');
 * ```
 */
export function useFutureFlag<K extends keyof FutureOptions>(key: K) {
  const context = useSafeContext(FutureFlagsContext);
  return context[key];
}

/** @private */
export const FutureFlagsProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: true | FutureOptions }>) => {
  if (value === true) {
    value = {
      themeBridge: true,
    };
  }

  const context = React.useContext(FutureFlagsContext);
  const combinedValue = { ...context, ...value };

  return (
    <FutureFlagsContext.Provider
      value={React.useMemo(
        () => combinedValue,
        // eslint-disable-next-line react-hooks/exhaustive-deps -- stringify the value to avoid unnecessary re-renders
        [JSON.stringify(combinedValue)],
      )}
    >
      {children}
    </FutureFlagsContext.Provider>
  );
};
