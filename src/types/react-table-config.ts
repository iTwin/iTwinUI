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
  // UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  // UseGlobalFiltersOptions,
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
  // UsePaginationOptions,
  UsePaginationState,
  // UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  // UseResizeColumnsOptions,
  UseResizeColumnsState,
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
    cellElementProps: TableCellProps;
    cellProps: CellProps<D>;
    children: React.ReactNode;
  };

  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<D extends object = {}>
    extends Omit<UseTableOptions<D>, 'data'>,
      UseRowSelectOptions<D>,
      UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      // UseGlobalFiltersOptions<D>,
      // UseGroupByOptions<D>,
      // UsePaginationOptions<D>,
      // UseResizeColumnsOptions<D>,
      // UseRowStateOptions<D>,
      UseSortByOptions<D> {
    /**
     * Table data list.
     * Must be memoized.
     *
     * Supports expandable sub-rows using the `subRows` field in data entries.
     * If some rows don't have sub-data, it is recommended to pass an empty array to `subRows` for consistent spacing.
     */
    data: D[];
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
  }

  export interface TableState<D extends object = {}>
    extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<D extends object = {}>
    // extends UseGlobalFiltersColumnOptions<D>,
    // UseGroupByColumnOptions<D>,
    // UseResizeColumnsColumnOptions<D>,
    extends UseSortByColumnOptions<D>,
      UseFiltersColumnOptions<D> {
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
  }

  export interface ColumnInstance<D extends object = {}>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

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
