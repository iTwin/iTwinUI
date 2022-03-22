/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CellProps, ColumnInstance, HeaderProps, Hooks } from 'react-table';
import { Checkbox } from '../../Checkbox';

export const SELECTION_CELL_ID = 'iui-table-checkbox-selector';

export const useSelectionCell = <T extends Record<string, unknown>>(
  isSelectable: boolean,
  isRowDisabled?: (rowData: T) => boolean,
) => (hooks: Hooks<T>) => {
  if (!isSelectable) {
    return;
  }

  hooks.allColumns.push((columns: ColumnInstance<T>[]) => [
    {
      id: SELECTION_CELL_ID,
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 48,
      width: 48,
      maxWidth: 48,
      columnClassName: 'iui-slot',
      cellClassName: 'iui-slot',
      disableReordering: true,
      Header: ({
        getToggleAllRowsSelectedProps,
        rows,
        initialRows,
        state,
      }: HeaderProps<T>) => {
        const disabled = rows.every((row) => isRowDisabled?.(row.original));
        const checked = initialRows.every(
          (row) =>
            state.selectedRowIds[row.id] || isRowDisabled?.(row.original),
        );
        return (
          <Checkbox
            {...getToggleAllRowsSelectedProps()}
            checked={checked && !disabled}
            indeterminate={
              !checked && Object.keys(state.selectedRowIds).length > 0
            }
            disabled={disabled}
          />
        );
      },
      Cell: ({ row }: CellProps<T>) => (
        <Checkbox
          {...row.getToggleRowSelectedProps()}
          disabled={isRowDisabled?.(row.original)}
          onClick={(e) => e.stopPropagation()} // Prevents triggering on row click
        />
      ),
    },
    ...columns,
  ]);

  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // Fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0];
    selectionGroupHeader.canResize = false;
  });
};
