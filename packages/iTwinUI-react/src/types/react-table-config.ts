/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// react-table was written with plain JS therefore these type overrides are needed
// Link: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  // UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  // UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  // UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  // UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseTableOptions,
} from 'react-table';

declare module 'react-table' {
  export type FieldType = 'text' | 'number' | 'date' | string;

  export type CellRendererProps<D extends object = {}> = {
    /**
     * Cell HTML props passed from the Table.
     */
    cellElementProps: TableCellProps;
    /**
     * Table specific cell props like `column`, `row`.
     */
    cellProps: CellProps<D>;
    /**
     * Cell's content.
     */
    children: React.ReactNode;
    /**
     * Function that returns whether the cell is disabled.
     */
    isDisabled?: (rowData: D) => boolean;
  };

  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<D extends object = {}>
    extends Omit<UseTableOptions<D>, 'data' | 'columns'>,
      UseRowSelectOptions<D>,
      UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      // UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      Omit<UseResizeColumnsOptions<D>, 'disableResizing'>,
      // UseRowStateOptions<D>,
      UseSortByOptions<D> {
    /**
     * List of columns.
     */
    columns: Array<Column<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
    /**
     * Table data list.
     * Must be memoized.
     *
     * Supports expandable sub-rows using the `subRows` field in data entries.
     * If some rows don't have sub-data, it is recommended to pass an empty array to `subRows` for consistent spacing.
     */
    data: D[];
    /**
     * Column's resize mode.
     *  - `fit` - when resizing it affects current and the next column,
     *   e.g. when increasing width of current column, next column's width will decrease.
     *  - `expand` - when resizing it affects only the current column,
     *   e.g. when increasing width of the current column, next column's width remains the same.
     * @default 'fit'
     */
    columnResizeMode?: 'fit' | 'expand';
  }

  export interface Hooks<D extends object = {}>
    extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<D extends object = {}>
    extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {
    initialRows: Row<D>[];
    columnResizeMode: TableOptions['columnResizeMode'];
    tableWidth: number;
  }

  export interface TableState<D extends object = {}>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {
    // UseResizeColumnsState with fixed typings
    columnResizing: {
      startX?: number;
      columnWidth?: number;
      nextColumnWidth?: number;
      headerIdWidths?: Array<[string, number]>;
      nextHeaderIdWidths?: Array<[string, number]>;
      columnWidths: Record<string, number>;
      isResizingColumn?: string;
    };
    isTableResizing?: boolean;
    columnReorderStartIndex: number;
    sticky: {
      isScrolledToRight?: boolean;
      isScrolledToLeft?: boolean;
    };
    lastSelectedRowId?: string;
  }

  export interface ColumnInterface<D extends object = {}>
    // UseGroupByColumnOptions<D>,
    extends UseSortByColumnOptions<D>,
      UseFiltersColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D> {
    /**
     * Custom class name applied to header column cell.
     */
    columnClassName?: string;
    /**
     * Custom class name applied to each column's cell.
     */
    cellClassName?: string;
    /**
     * Type of the data in cell. Used for manual filtering.
     */
    fieldType?: FieldType;
    /**
     * Filter component used as a column filter. Should use filters from `tableFilters`.
     */
    Filter?: Renderer<FilterProps<D>>;
    /**
     * String value or custom function to use for filtering.
     * Possible string values: `text`, `exactText`, `exactTextCase`, `includes`, `includesAll`, `exact`, `equals`, `between`.
     * More info about these filters: https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
     */
    filter?: FilterType<D> | DefaultFilterTypes | string;
    /**
     * Function that should return whole cell element not only the content.
     * Must be memoized.
     * @example
     * {
     *   Header: 'Name',
     *   accessor: 'name',
     *   cellRenderer: (props) => <EditableCell {...props} onCellEdit={onCellEditHandler} />,
     * }
     */
    cellRenderer?: (props: CellRendererProps<D>) => React.ReactNode;
    /**
     * If true, column can't be reordered.
     * @default false
     */
    disableReordering?: boolean;
    /**
     * If true, column's visibility cannot be toggled.
     * @default false
     */
    disableToggleVisibility?: boolean;
    /**
     * Side on which column should be sticked to.
     */
    sticky?: 'left' | 'right';
  }

  export interface ColumnInstance<D extends object = {}>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {
    originalWidth: number;
    resizeWidth?: number;
    isResizerVisible?: boolean;
    getDragAndDropProps: () => TableKeyedProps;
    originalSticky?: 'left' | 'right' | 'none';
  }

  export interface Cell<D extends object = {}>
    extends UseGroupByCellProps<D>,
      UseRowStateCellProps<D> {}

  export interface Row<D extends object = {}>
    extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {
    initialSubRows: Row<D>[];
  }
}
