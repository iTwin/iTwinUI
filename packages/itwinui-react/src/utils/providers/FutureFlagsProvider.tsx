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
     * When `true`, `className` and `style` will be applied on the
     * input element, along with the rest of the DOM props.
     *
     * By default (without this flag), `className` and `style` get
     * applied on the wrapper element, unless `wrapperProps` is also passed.
     */
    consistentPropsSpread?: boolean;
    /**
     * When `true`, the `ToggleSwitch` will render a wrapper only when `label` or `icon` are passed.
     *
     * This makes the wrapper behavior similar to `Checkbox` and `Radio` that render their wrapper only when `label` are passed.
     */
    preferRenderingWithoutWrapper?: boolean;
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
