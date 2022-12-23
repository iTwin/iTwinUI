/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CellProps, CellRendererProps, HeaderProps } from 'react-table';
import { Checkbox } from '../../Checkbox';
import { DefaultCell } from '../cells';

export const SELECTION_CELL_ID = 'iui-table-checkbox-selector';

/**
 * Selection column that adds selection checkbox column to the Table.
 * It is recommended to use it as the first column.
 * @example
 * const isCheckboxDisabled = useCallback((rowData) => {
 *   return rowData.name === 'Name1';
 * }, []);
 * const columns = useMemo(() => [
 *   SelectionColumn({ isDisabled: isCheckboxDisabled }),
 *   // Rest of your columns
 * ], [isCheckboxDisabled]);
 */
export const SelectionColumn = <T extends Record<string, unknown>>(
  props: {
    /** Function that returns whether row checkbox should be disabled. */
    isDisabled?: (rowData: T) => boolean;
  } = {},
) => {
  const { isDisabled } = props;
  return {
    id: SELECTION_CELL_ID,
    disableResizing: true,
    disableGroupBy: true,
    disableReordering: true,
    minWidth: 48,
    width: 48,
    maxWidth: 48,
    columnClassName: 'iui-slot',
    cellClassName: 'iui-slot',
    Header: ({
      getToggleAllRowsSelectedProps,
      toggleAllRowsSelected,
      rows,
      initialRows,
      state,
    }: HeaderProps<T>) => {
      const disabled = rows.every((row) => isDisabled?.(row.original));
      const checked = initialRows.every(
        (row) => state.selectedRowIds[row.id] || isDisabled?.(row.original),
      );
      const indeterminate =
        !checked && Object.keys(state.selectedRowIds).length > 0;
      return (
        <Checkbox
          {...getToggleAllRowsSelectedProps()}
          style={{}} // Removes pointer cursor as we have it in CSS and it is also showing pointer when disabled
          title='' // Removes default title that comes from react-table
          checked={checked && !disabled}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={() =>
            toggleAllRowsSelected(!rows.some((row) => row.isSelected))
          }
        />
      );
    },
    Cell: ({ row }: CellProps<T>) => (
      <Checkbox
        {...row.getToggleRowSelectedProps()}
        style={{}} // Removes pointer cursor as we have it in CSS and it is also showing pointer when disabled
        title='' // Removes default title that comes from react-table
        disabled={isDisabled?.(row.original)}
        onClick={(e) => e.stopPropagation()} // Prevents triggering on row click
      />
    ),
    cellRenderer: (props: CellRendererProps<T>) => (
      <DefaultCell
        {...props}
        isDisabled={(rowData) => !!isDisabled?.(rowData)}
      />
    ),
  };
};
