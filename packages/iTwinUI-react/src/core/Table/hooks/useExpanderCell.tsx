/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CellProps, ColumnInstance, Hooks, Row } from 'react-table';
import { ExpanderColumn, EXPANDER_CELL_ID } from '../columns';

export const useExpanderCell =
  <T extends Record<string, unknown>>(
    subComponent?: (row: Row<T>) => React.ReactNode,
    expanderCell?: (cellProps: CellProps<T>) => React.ReactNode,
    isRowDisabled?: (rowData: T) => boolean,
  ) =>
  (hooks: Hooks<T>) => {
    if (!subComponent) {
      return;
    }
    hooks.allColumns.push((columns: ColumnInstance<T>[]) => {
      const hasExpanderColumn = columns.find((c) => c.id === EXPANDER_CELL_ID);
      if (hasExpanderColumn) {
        return columns;
      }
      const expanderColumn = ExpanderColumn({
        subComponent,
        isDisabled: isRowDisabled,
      });
      return [
        {
          ...expanderColumn,
          Cell: expanderCell
            ? (cellProps: CellProps<T>) => <>{expanderCell(cellProps)}</>
            : expanderColumn.Cell,
        },
        ...columns,
      ];
    });
  };
