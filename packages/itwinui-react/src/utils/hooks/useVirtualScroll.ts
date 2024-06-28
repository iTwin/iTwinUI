/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useVirtualizer } from '@tanstack/react-virtual';
import type { Virtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect } from './useIsomorphicLayoutEffect.js';

/**
 * Wrapper over `useVirtualizer` from `@tanstack/react-virtual` that sets the index attribute to
 * `data-iui-index` and adds a `useLayoutEffect` for scrolling to a provided index on render.
 *
 * @example
 * const virtualizer = useVirtualScroll({count: item.length, getScrollElement: () => parentRef.current, estimateSize: () => 30, scrollToIndex});
 */
export const useVirtualScroll = (
  params: Parameters<typeof useVirtualizer>[0] & { scrollToIndex?: number },
): Virtualizer<Element, Element> => {
  const { scrollToIndex, ...rest } = params;

  const virtualizer = useVirtualizer({
    indexAttribute: 'data-iui-index',
    overscan: 10,
    ...rest,
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
