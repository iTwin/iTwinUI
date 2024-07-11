import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import { useOverflow } from '../hooks/useOverflow.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';

type OverflowContainerProps = {
  // TODO: Confirm what happens when overflowTag === undefined. Maybe some off by 1 errors?
  overflowTag?: (visibleCount: number) => React.ReactNode;
  /**
   * Where the overflowTag is placed. Values:
   * - end: At the end
   * - center: After the first item
   * @default 'end'
   */
  overflowPlacement?: 'start' | 'center' | 'end';
  /**
   * The number of items will always be >= `minVisibleCount`
   * @default 1
   */
  minVisibleCount?: number;
} & (
  | {
      children: React.ReactNode[];
      itemsLength?: undefined;
    }
  | {
      children: (visibleCount: number) => React.ReactNode;
      itemsLength: number;
    }
);

export const OverflowContainer = React.forwardRef((props, ref) => {
  const {
    overflowTag,
    overflowPlacement = 'end',
    children,
    itemsLength,
    minVisibleCount = 1,
    ...rest
  } = props;

  // const containerRef = React.useContext(OverflowContainerContext)?.containerRef;
  // const container = containerProp;

  // TODO: Should this be children.length + 1?
  // Because if there are 10 items and visibleCount is 10,
  // how do we know whether to display 10 items vs 9 items and 1 overflow tag?
  const [containerRef, _visibleCount] = useOverflow(
    // TODO: Remove eslint-disable
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    typeof children === 'function' ? itemsLength! : children.length + 1,
    undefined,
    undefined,
  );

  const visibleCount = Math.max(_visibleCount, minVisibleCount);

  // console.log('children', children.length, visibleCount);

  /**
   * - `visibleCount === children.length + 1` means that we show all children and no overflow tag.
   * - `visibleCount <= children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const itemsToRender = React.useMemo(() => {
    // let returnValue: React.ReactNode[] | null = null;

    // TODO: Is this try-catch needed?
    try {
      if (typeof children === 'function') {
        throw null;
      }

      if (visibleCount > children.length) {
        throw [children, [], []];
      }

      // TODO: Fix some off by one errors. It is visible when visibleCount = children.length - 1
      // I think they are fixed.
      if (overflowPlacement === 'center') {
        throw visibleCount >= 3
          ? [
              children[0],
              overflowTag?.(visibleCount - 1),
              children.slice(children.length - (visibleCount - 2)),
            ]
          : [
              [],
              overflowTag?.(visibleCount - 1),
              children.slice(children.length - (visibleCount - 1)),
            ];
      }

      if (overflowPlacement === 'start') {
        throw [
          overflowTag?.(visibleCount - 2),
          children.slice(children.length - visibleCount + 1),
        ];
      }

      throw [
        children.slice(0, visibleCount - 1),
        [],
        overflowTag?.(visibleCount),
      ];
    } catch (returnValue) {
      return returnValue?.filter(Boolean);
    }
  }, [children, overflowTag, overflowPlacement, visibleCount]);

  return (
    <Box ref={useMergedRefs(ref, containerRef)} {...rest}>
      {typeof children === 'function' ? (
        children(visibleCount)
      ) : (
        <>
          {itemsToRender?.[0]}
          {itemsToRender?.[1]}
          {itemsToRender?.[2]}
        </>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;
