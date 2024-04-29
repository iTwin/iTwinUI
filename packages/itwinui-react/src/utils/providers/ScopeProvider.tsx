/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { createStore, useAtomValue, useSetAtom } from 'jotai';
import type { Atom, WritableAtom } from 'jotai';

const ScopeContext = React.createContext({
  store: createStore(),
  parentStore: null as null | ReturnType<typeof createStore>,
});

/**
 * Provider that creates a fresh, isolated jotai store for its children.
 *
 * Should be used with `useScopedAtom` and/or `useScopedSetAtom`.
 *
 * @private
 */
export const ScopeProvider = ({ children }: { children: React.ReactNode }) => {
  const store = React.useMemo(() => createStore(), []);
  const parentStore = React.useContext(ScopeContext).store;

  return (
    <ScopeContext.Provider
      value={React.useMemo(
        () => ({ store, parentStore }),
        [store, parentStore],
      )}
    >
      {children}
    </ScopeContext.Provider>
  );
};

/**
 * Wrapper over `useAtom` that uses the store from the nearest `ScopeProvider`.
 *
 * If the atom is not set in the current store, it will recursively look in the parent store(s).
 *
 * @private
 */
export const useScopedAtom = <T,>(atom: Atom<T>) => {
  const { store, parentStore } = React.useContext(ScopeContext);
  const setAtom = useScopedSetAtom(atom as WritableAtom<T, unknown[], unknown>);

  const value = useAtomValue(atom, { store });
  const inheritedValue = useAtomValue(atom, { store: parentStore || store });
  if (value == undefined && inheritedValue != undefined) {
    setAtom(inheritedValue);
  }

  return [value, setAtom] as const;
};

/**
 * Wrapper over `useSetAtom` that uses the store from the nearest `ScopeProvider`.
 * @private
 */
export const useScopedSetAtom = <T,>(
  atom: WritableAtom<T, unknown[], unknown>,
) => {
  const { store } = React.useContext(ScopeContext);
  return useSetAtom(atom, { store });
};
