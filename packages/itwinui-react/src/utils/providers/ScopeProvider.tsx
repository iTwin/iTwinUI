/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { createStore, useAtomValue, useSetAtom } from 'jotai';
import type { Atom, WritableAtom } from 'jotai';

const defaultScope = createStore();

const ScopeContext = React.createContext(defaultScope);

/** Keeps track of all atoms in all scopes */
const scopes = new WeakMap([
  [defaultScope, new Set<WritableAtom<unknown, unknown[], unknown>>()],
]);

/**
 * Provider that creates a fresh, isolated jotai store for its children
 *
 * Should be used with `useScopedAtom` and/or `useScopedSetAtom`.
 *
 * @private
 */
export const ScopeProvider = ({ children }: { children: React.ReactNode }) => {
  const store = React.useMemo(() => createStore(), []);
  const parentStore = React.useContext(ScopeContext);

  if (!scopes.has(store)) {
    // Copy parent store's atoms to this store
    if (parentStore) {
      scopes.get(parentStore)?.forEach((atom) => {
        store.set(atom, parentStore.get(atom));
      });
    }

    scopes.set(store, new Set());
  }

  return (
    <ScopeContext.Provider value={store}>{children}</ScopeContext.Provider>
  );
};

/**
 * Wrapper over `useAtom` that uses the store from the nearest `ScopeProvider`.
 * @private
 */
export const useScopedAtom = <T,>(atom: Atom<T>) => {
  const store = React.useContext(ScopeContext);
  return [
    useAtomValue(atom, { store }),
    useScopedSetAtom(atom as WritableAtom<T, unknown[], unknown>),
  ] as const;
};

/**
 * Wrapper over `useSetAtom` that uses the store from the nearest `ScopeProvider`.
 * @private
 */
export const useScopedSetAtom = <T,>(
  atom: WritableAtom<T, unknown[], unknown>,
) => {
  const store = React.useContext(ScopeContext);
  scopes.get(store)?.add(atom);
  return useSetAtom(atom, { store });
};
