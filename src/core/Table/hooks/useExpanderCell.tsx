/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import React from 'react';
import { CellProps, ColumnInstance, Hooks, Row } from 'react-table';
import { IconButton } from '../../Buttons';

export const EXPANDER_CELL_ID = 'iui-table-expander';

export const useExpanderCell = <T extends Record<string, unknown>>(
  subComponent?: (row: Row<T>) => React.ReactNode,
  expanderCell?: (cellProps: CellProps<T>) => React.ReactNode,
  isRowDisabled?: (rowData: T) => boolean,
) => (hooks: Hooks<T>) => {
  if (!subComponent) {
    return;
  }
  hooks.allColumns.push((columns: ColumnInstance<T>[]) => [
    {
      id: EXPANDER_CELL_ID,
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 48,
      width: 48,
      maxWidth: 48,
      columnClassName: 'iui-slot',
      cellClassName: 'iui-slot',
      Cell: (props: CellProps<T>) => {
        const { row } = props;
        if (!subComponent(row)) {
          return null;
        } else if (expanderCell) {
          return expanderCell(props);
        } else {
          return (
            <IconButton
              className='iui-row-expander'
              styleType='borderless'
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                row.toggleRowExpanded();
              }}
              disabled={isRowDisabled?.(props.row.original)}
            >
              {<SvgChevronRight />}
            </IconButton>
          );
        }
      },
    },
    ...columns,
  ]);
};
