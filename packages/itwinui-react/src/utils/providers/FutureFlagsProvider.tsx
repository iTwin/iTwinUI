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
  ToggleSwitch?: {
    /**
     * By default, `className` and `style` props are applied on the wrapper while other props are applied on the input.
     * This inconsistency can lead to confusion.
     *
     * Thus, setting this flag to `true` or passing `wrapperProps` will apply all props on the input.
     */
    consistentPropsSpread?: boolean;
  };
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
