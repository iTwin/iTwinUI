/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useVirtualizer } from '@tanstack/react-virtual';
import type { ScrollToOptions, Virtualizer } from '@tanstack/react-virtual';
import React from 'react';

const css = /*css*/ `
[data-iui-virtualizer='root'] {
  min-inline-size: 100%;
  contain: layout;
  position: relative;
}
::slotted([data-iui-virtualizer='item']) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
`;

/**
 * Wrapper over `useVirtualizer` from `@tanstack/react-virtual` that sets the index attribute to
 * `data-iui-index` and adds wraps the `scrollToIndex` function in a `setTimeout` so it can be used in `useLayoutEffect`.
 *
 * @example
 * const { virtualizer, css } = useVirtualScroll({
 *   count: item.length,
 *   getScrollElement: () => parentRef.current,
 *   estimateSize: () => 30,
 * });
 *
 * <Parent ref={parentRef}>
 *   <ShadowRoot css={css}>
 *     <div data-iui-virtualizer="root" style={{ height: virtualizer.getTotalSize() }}>
 *       <slot />
 *     </div>
 *   </ShadowRoot>
 *
 *   {virtualizer.getVirtualItems().map((item) => (
 *     <Item
 *       data-iui-virtualizer="item"
 *       data-iui-index={item.index}
 *       style={{ transform: `translateY(${item.start}px)`}}
 *       ref={virtualizer.measureElement}
 *     />
 *   ))}
 * </Parent>
 */
export const useVirtualScroll = (
  params: Parameters<typeof useVirtualizer>[0],
) => {
  const { ...rest } = params;

  const _virtualizer = useVirtualizer({
    indexAttribute: 'data-iui-index',
    overscan: 10,
    ...rest,
  });

  const scrollToIndex = React.useCallback(
    (index: number, options: ScrollToOptions) => {
      setTimeout(() => {
        _virtualizer.scrollToIndex(index, { align: 'auto', ...options });
      });
    },
    [_virtualizer],
  );

  const virtualizer = React.useMemo(
    () => ({ ..._virtualizer, scrollToIndex }),
    [_virtualizer, scrollToIndex],
  ) as Virtualizer<Element, Element>;

  return React.useMemo(() => ({ virtualizer, css }), [virtualizer]);
};
