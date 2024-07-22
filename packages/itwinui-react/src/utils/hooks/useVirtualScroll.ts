/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useVirtualizer } from '@tanstack/react-virtual';
import type { ScrollToOptions, Virtualizer } from '@tanstack/react-virtual';
import React from 'react';

/**
 * Wrapper over `useVirtualizer` from `@tanstack/react-virtual` that sets the index attribute to
 * `data-iui-index` and adds wraps the `scrollToIndex` function in a `setTimeout` so it can be used in `useLayoutEffect`.
 *
 * @example
 * const virtualizer = useVirtualScroll({
 *  count: item.length,
 *  getScrollElement: () => parentRef.current,
 *  estimateSize: () => 30,
 * });
 */
export const useVirtualScroll = (
  params: Parameters<typeof useVirtualizer>[0],
): Virtualizer<Element, Element> => {
  const { ...rest } = params;

  const virtualizer = useVirtualizer({
    indexAttribute: 'data-iui-index',
    overscan: 10,
    ...rest,
  });

  const scrollToIndex = React.useCallback(
    (index: number, options: ScrollToOptions) => {
      setTimeout(() => {
        virtualizer.scrollToIndex(index, { align: 'auto', ...options });
      });
    },
    [virtualizer],
  );

  return React.useMemo(() => {
    return { ...virtualizer, scrollToIndex };
  }, [virtualizer, scrollToIndex]) as Virtualizer<Element, Element>;
};
