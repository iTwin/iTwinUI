/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

/**
 * SSR-safe version of `useLayoutEffect` that replaces it with `useEffect` on the server.
 *
 * Exported as `useLayoutEffect` so that the react hooks linter correctly identifies the necessary dependencies.
 *
 * @see https://fb.me/react-uselayouteffect-ssr
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export { useIsomorphicLayoutEffect as useLayoutEffect };
