/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { createStore, useAtom, useSetAtom } from 'jotai';
import type { Atom, WritableAtom } from 'jotai';

const ScopeContext = React.createContext(createStore());

/**
 * Provider that creates a fresh, isolated jotai store for its children
 *
 * Should be used with `useScopedAtom` and/or `useScopedSetAtom`.
 *
 * @private
 */
export const ScopeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScopeContext.Provider value={React.useMemo(() => createStore(), [])}>
      {children}
    </ScopeContext.Provider>
  );
};

/**
 * Wrapper over `useAtom` that uses the store from the nearest `ScopeProvider`.
 * @private
 */
export const useScopedAtom = <T,>(atom: Atom<T>) => {
  const store = React.useContext(ScopeContext);
  return useAtom(atom, { store });
};

/**
 * Wrapper over `useSetAtom` that uses the store from the nearest `ScopeProvider`.
 * @private
 */
export const useScopedSetAtom = <T,>(
  atom: WritableAtom<T, unknown[], unknown>,
) => {
  const store = React.useContext(ScopeContext);
  return useSetAtom(atom, { store });
};
