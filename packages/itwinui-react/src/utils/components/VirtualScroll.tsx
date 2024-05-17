/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { mergeRefs } from '../hooks/index.js';
import { useVirtualizer } from '@tanstack/react-virtual';

export type VirtualScrollProps = {
  /**
   * Length of the items to virtualize.
   */
  itemsLength: number;
  /**
   * Single item render function, which gives index of the item (0 based) in the data array
   * and expects to get the JSX of that element to render.
   * Recommended to memoize the reference of the function.
   */
  itemRenderer: (index: number) => JSX.Element;
  /**
   * Ref for scrollable parent container.
   */
  scrollContainerRef: HTMLDivElement | null;
  /**
   * Number of items to be rendered at the start and the end.
   * Not recommended to go lower than the visible items in viewport.
   * @default 10
   */
  bufferSize?: number;
  /**
   * Index of the first element on initial render.
   */
  scrollToIndex?: number;
} & React.ComponentPropsWithRef<'div'>;

/**
 * `VirtualScroll` component is used to render a huge amount of items in the DOM. It renders only the ones which are visible
 * and the amount provided through `bufferSize` prop at the start and the end. Can be used inside other components like `Table`.
 *
 * It has two wrapper elements, so DOM will be changed. One is used for setting full expected height in the scrollable container
 * and other is for transformation (translateY) to show the correct part of the list.
 *
 * Currently it works only with the direct vertically scrollable parent element. It does not work with body scroll.
 * It supports only static (same) height rows virtualization. Expect some issues, if list consists of different height elements.
 * @example
 * const itemRenderer = React.useCallback(() => (
 *  <div key={index}>
 *    This is my item #{index}
 *  </div>
 * ), [])
 * <div style={{overflow: 'auto'}} ref={ref}>
 * <VirtualScroll
 *  itemsLength={1000}
 *  itemRenderer={itemRenderer}
 *  scrollableContainerRef={ref}
 * />
 * </div>
 * @private
 */
export const VirtualScroll = React.forwardRef<
  HTMLDivElement,
  VirtualScrollProps
>((props, ref) => {
  const {
    itemsLength,
    itemRenderer,
    bufferSize = 10,
    scrollToIndex,
    scrollContainerRef,
    style,
    ...rest
  } = props;
  const virtualizer = useVirtualizer({
    count: itemsLength,
    getScrollElement: () => scrollContainerRef,
    estimateSize: () => 62,
    overscan: bufferSize,
  });

  const outerProps = {
    style: {
      minBlockSize: virtualizer.getTotalSize(),
      minInlineSize: '100%',
      ...style,
    },
    ...rest,
  } as React.HTMLAttributes<HTMLElement>;
  const innerProps = {
    style: { willChange: 'transform' },
  } as const;

  if (scrollToIndex) {
    virtualizer.scrollToIndex(scrollToIndex);
  }

  return (
    <div {...outerProps}>
      <div {...innerProps} ref={mergeRefs(ref)}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {itemRenderer(virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
});
