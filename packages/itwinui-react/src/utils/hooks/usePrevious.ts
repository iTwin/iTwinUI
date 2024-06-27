/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Based on react-use's usePrevious
 * The original code is licensed under "Unlimited License" - https://unpkg.com/browse/react-use@17.5.0/LICENSE
 */

import { useRef } from 'react';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useLayoutEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
