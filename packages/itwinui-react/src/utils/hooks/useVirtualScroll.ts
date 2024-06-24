/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';
import * as React from 'react';

/**
 * Wrapper over `useVirtualizer` from `@tanstack/react-virtual` that sets the index attribute to
 * `data-iui-index` and adds a `useLayoutEffect` for scrolling to a provided index on render.
 *
 * @example
 * const virtualizer = useVirtualScroll({count: item.length, getScrollElement: () => parentRef.current, estimateSize: () => 30, scrollToIndex});
 */
export const useVirtualScroll = (params: {
  count: number;
  getScrollElement: () => HTMLElement | null;
  estimateSize: (index: number) => number;
  scrollToIndex?: number;
  gap?: number;
  getItemKey?: (index: number) => React.Key;
}): Virtualizer<HTMLElement, Element> => {
  const {
    count,
    getScrollElement,
    estimateSize,
    scrollToIndex,
    gap,
    getItemKey,
  } = params;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement,
    estimateSize,
    gap,
    getItemKey,
    indexAttribute: 'data-iui-index',
    overscan: 10,
  });
  useLayoutEffect(() => {
    setTimeout(() => {
      if (scrollToIndex) {
        virtualizer.scrollToIndex(scrollToIndex, { align: 'auto' });
      }
    });
  }, [scrollToIndex, virtualizer]);
  return virtualizer;
};
