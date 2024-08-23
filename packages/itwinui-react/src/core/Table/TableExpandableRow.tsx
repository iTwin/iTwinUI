import cx from 'classnames';
import * as React from 'react';
import type { Row } from '../../react-table/react-table.js';
import { Box, useMergedRefs } from '../../utils/index.js';
import type { Virtualizer, VirtualItem } from '@tanstack/react-virtual';

export const TableExpandableRow = <T extends Record<string, unknown>>(props: {
  row: Row<T>;
  subComponent?: (row: Row<T>) => React.ReactNode;
  virtualItem?: VirtualItem<Element>;
  virtualizer?: Virtualizer<Element, Element>;
  isDisabled: boolean;
  tableRowRef?: React.Ref<HTMLDivElement>;
}) => {
  const {
    row,
    subComponent,
    virtualItem,
    virtualizer,
    isDisabled,
    tableRowRef,
  } = props;
  const mergedProps = {
    ...row.getRowProps({
      style: {
        flex: `0 0 auto`,
        minWidth: '100%',
        ...(virtualItem != null
          ? { transform: `translateY(${virtualItem.start}px)` }
          : {}),
      },
    }),
    ...{
      'aria-disabled': isDisabled || undefined,
      'data-iui-index': virtualItem?.index,
      ...(virtualItem != null && { 'data-iui-virtualizer': 'item' }),
    },
  };
  const refs = useMergedRefs(tableRowRef, virtualizer?.measureElement);

  return (
    <>
      {subComponent && (
        <Box
          className={cx('iui-table-row', 'iui-table-expanded-content')}
          {...mergedProps}
          ref={refs}
        >
          {subComponent(row)}
        </Box>
      )}
    </>
  );
};
