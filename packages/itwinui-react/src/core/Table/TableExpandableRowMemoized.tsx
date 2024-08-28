/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box, useMergedRefs } from '../../utils/index.js';
import type { Virtualizer, VirtualItem } from '@tanstack/react-virtual';

const TableExpandableRow = React.forwardRef(
  (
    props: {
      virtualItem?: VirtualItem<Element>;
      virtualizer?: Virtualizer<Element, Element>;
      isDisabled: boolean;
      children: React.ReactNode;
    },
    ref,
  ) => {
    const refs = useMergedRefs(ref, props.virtualizer?.measureElement);

    return (
      <Box
        className={cx('iui-table-row', 'iui-table-expanded-content')}
        style={{
          flex: '0 0 auto',
          minWidth: '100%',
          ...(props.virtualItem != null
            ? { transform: `translateY(${props.virtualItem.start}px)` }
            : {}),
        }}
        aria-disabled={props.isDisabled || undefined}
        data-iui-index={props.virtualItem?.index}
        {...(props.virtualItem != null && { 'data-iui-virtualizer': 'item' })}
        ref={refs}
      >
        {props.children}
      </Box>
    );
  },
);

export const TableExpandableRowMemoized = React.memo(
  TableExpandableRow,
  (prevProp, nextProp) =>
    prevProp.children === nextProp.children &&
    prevProp.virtualItem === prevProp.virtualItem &&
    prevProp.isDisabled === nextProp.isDisabled,
);
