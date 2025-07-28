/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type {
  CellProps,
  ColumnInstance,
  Hooks,
  Row,
} from '../../../react-table/react-table.js';
import { ExpanderColumn, EXPANDER_CELL_ID } from '../columns/index.js';

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
