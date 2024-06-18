/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';

/**
 * Wrapper over `useVirtualizer` from `@tanstack/react-virtual` that sets the index attribute to
 * `data-iui-index` and adds a `useLayoutEffect` for scrolling to a provided index on render.
 *
 * @example
 * const virtualizer = useVirtualScroll(item.length, () => parentRef.current, () => 30, scrollToIndex);
 */
export const useVirtualScroll = (
  count: number,
  getScrollElement: () => HTMLElement | null,
  estimateSize: (index: number) => number,
  scrollToIndex?: number,
  gap?: number,
): Virtualizer<HTMLElement, Element> => {
  const virtualizer = useVirtualizer({
    count,
    getScrollElement,
    estimateSize,
    gap,
    indexAttribute: 'data-iui-index',
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
