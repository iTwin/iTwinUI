/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSyncExternalStore, useIsClient } from '../hooks/index.js';

const HydrationContext = React.createContext(false);
const noopSubscribe = () => () => {};
const isServer = typeof window === 'undefined';

/**
 * Hook that returns the hydration status of the app.
 *
 * @returns one of the following values:
 * - `"hydrated"` after hydration is *definitely* complete (or is a pure client render)
 * - `"hydrating"` if we know for sure that hydration is happening (in React 18)
 * - `undefined` if the hydration status is unknown
 *
 * @private
 */
export const useHydration = () => {
  // Returns true only if getServerSnapshot is called on the client.
  // In React 18, this is true during hydration.
  const hydrating = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => !isServer,
  );

  // Returns true after hydration is complete (in all React versions).
  const hydrated = React.useContext(HydrationContext);
  const hydratedFallback = useIsClient();

  if (hydrated || hydratedFallback) {
    return 'hydrated';
  } else if (hydrating) {
    return 'hydrating';
  }

  return undefined;
};

type HydrationProviderProps = {
  children: React.ReactNode;
};

/** @private */
export const HydrationProvider = (props: HydrationProviderProps) => {
  const { children } = props;

  const [isHydrated, setIsHydrated] = React.useState(
    React.useContext(HydrationContext),
  );
  const onHydrate = React.useCallback(() => setIsHydrated(true), []);

  return (
    <HydrationContext.Provider value={isHydrated}>
      {!isHydrated ? <HydrationCheck onHydrate={onHydrate} /> : null}
      {children}
    </HydrationContext.Provider>
  );
};

type HydrationCheckProps = { onHydrate: () => void };

/** This is extracted into a child component to ensure it runs first. */
const HydrationCheck = (props: HydrationCheckProps) => {
  const { onHydrate } = props;

  React.useEffect(() => void onHydrate(), [onHydrate]);
  return null;
};
