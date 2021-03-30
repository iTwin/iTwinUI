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
  // UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  // UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  // UseFiltersOptions,
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
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<
    D extends object = {}
  > extends UseTableOptions<D>,
      UseRowSelectOptions<D>,
      // UseExpandedOptions<D>,
      // UseFiltersOptions<D>,
      // UseGlobalFiltersOptions<D>,
      // UseGroupByOptions<D>,
      // UsePaginationOptions<D>,
      // UseResizeColumnsOptions<D>,
      // UseRowStateOptions<D>,
      UseSortByOptions<D> {}

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
      UseSortByInstanceProps<D> {}

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
    extends UseSortByColumnOptions<D> {
    columnClassName?: string;
    cellClassName?: string;
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
      UseRowStateRowProps<D> {}
}
