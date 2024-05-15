/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type {
  CellProps,
  CellRendererProps,
  HeaderProps,
} from '../../../react-table/react-table.js';
import { Checkbox } from '../../Checkbox/Checkbox.js';
import { DefaultCell } from '../cells/index.js';

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
    density?: 'default' | 'condensed' | 'extra-condensed';
  } = {},
) => {
  const { isDisabled, density } = props;
  const densityWidth =
    density === 'condensed' ? 42 : density === 'extra-condensed' ? 34 : 48;
  return {
    id: SELECTION_CELL_ID,
    disableResizing: true,
    disableGroupBy: true,
    disableReordering: true,
    minWidth: densityWidth,
    width: densityWidth,
    maxWidth: densityWidth,
    columnClassName: 'iui-slot',
    cellClassName: 'iui-slot',
    Header: ({
      getToggleAllRowsSelectedProps,
      toggleAllRowsSelected,
      rows,
      preFilteredFlatRows,
      state,
    }: HeaderProps<T>) => {
      const disabled = preFilteredFlatRows.every(
        (row) => isDisabled?.(row.original),
      );
      const checked = preFilteredFlatRows.every(
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
        onChange={() => {
          if (row.subRows.length > 0) {
            //This code ignores any sub-rows that are not currently available(i.e disabled or filtered out).
            //If all available sub-rows are selected, then it deselects them all, otherwise it selects them all.
            row.toggleRowSelected(
              !row.subRows.every(
                (subRow) => subRow.isSelected || isDisabled?.(subRow.original),
              ),
            );
          } else {
            row.toggleRowSelected();
          }
        }}
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
