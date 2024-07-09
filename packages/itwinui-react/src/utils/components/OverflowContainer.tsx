import React from 'react';
import { useMergedRefs } from '../hooks/useMergedRefs.js';
import { useOverflow } from '../hooks/useOverflow.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';

type OverflowContainerProps = {
  overflowTag: (visibleCount: number) => React.ReactNode;
  /**
   * Where the overflowTag is placed. Values:
   * - end: At the end
   * - center: After the first item
   * @default 'end'
   */
  overflowTagLocation?: 'center' | 'end';
  children: React.ReactNode[];
  /**
   * Use this optional prop when the `OverflowContainer` is not the overflowing container.
   */
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * The number of items will always be >= `minVisibleCount`
   * @default 1
   */
  minVisibleCount?: number;
};

export const OverflowContainer = React.forwardRef((props, ref) => {
  const {
    overflowTag,
    overflowTagLocation = 'end',
    children,
    containerRef: containerRefProp,
    minVisibleCount = 1,
    ...rest
  } = props;

  // const containerRef = React.useContext(OverflowContainerContext)?.containerRef;
  const containerRef = containerRefProp;

  // TODO: Should this be children.length + 1?
  // Because if there are 10 items and visibleCount is 10,
  // how do we know whether to display 10 items vs 9 items and 1 overflow tag?
  const [overflowContainerRef, _visibleCount] = useOverflow(
    children.length + 1,
    undefined,
    undefined,
    containerRef,
  );
  const visibleCount = Math.max(_visibleCount, minVisibleCount);

  // console.log('children', children.length, visibleCount);

  /**
   * - `visibleCount === children.length + 1` means that we show all children and no overflow tag.
   * - `visibleCount <= children.length` means that we show visibleCount - 1 children and 1 overflow tag.
   */
  const itemsToRender = React.useMemo(() => {
    if (visibleCount > children.length) {
      return [children, [], []];
    }

    // TODO: Fix some off by one errors. It is visible when visibleCount = children.length - 1
    // I think they are fixed.
    if (overflowTagLocation === 'center') {
      return visibleCount >= 3
        ? [
            children[0],
            overflowTag(visibleCount - 1),
            children.slice(children.length - (visibleCount - 2)),
          ]
        : [
            [],
            overflowTag(visibleCount - 1),
            children.slice(children.length - (visibleCount - 1)),
          ];
    }
    return [children.slice(0, visibleCount - 1), [], overflowTag(visibleCount)];
  }, [children, overflowTag, overflowTagLocation, visibleCount]);

  return (
    <Box
      ref={useMergedRefs(
        ref,
        containerRef == null ? overflowContainerRef : undefined,
      )}
      {...rest}
    >
      {itemsToRender[0]}
      {itemsToRender[1]}
      {itemsToRender[2]}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', OverflowContainerProps>;
