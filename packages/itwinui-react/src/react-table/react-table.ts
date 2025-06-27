/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */

import type {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  DependencyList,
  EffectCallback,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

/**
 * This allows custom strings and keeps intellisense for string unions.
 * See https://github.com/Microsoft/TypeScript/issues/29729
 */
type AnyString = string & {}; // eslint-disable-line @typescript-eslint/ban-types

//-------------------------------------------------------------------------------
// Custom Additions (parts from the old file called react-table-config.ts)

export type FieldType = 'text' | 'number' | 'date' | string;

export type CellRendererProps<D extends Record<string, unknown> = {}> = {
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

export type TableFilterProps<T extends Record<string, unknown>> =
  FilterProps<T> & {
    /**
     * Data of column on which filter is opened. It is provided by the table it self.
     */
    column: HeaderGroup<T>;
    /**
     * Function to close the filter. It is provided by the table it self.
     */
    close: () => void;
    /**
     * Function to set the filter value. It is provided by the table it self.
     */
    setFilter: (filterValue: unknown | undefined) => void;
    /**
     * Function to clear the filter value. It is provided by the table it self.
     */
    clearFilter: () => void;
  };

//-------------------------------------------------------------------------------
// Everything below is a hard fork of @types/react-table v7
// The original code is licensed under MIT - https://unpkg.com/browse/@types/react-table@7.7.15/LICENSE
//
// A few reasons for this hard fork are:
// - iTwinUI Table does not offer all the functionality that `react-table` offers. (no nested columns)
// - `@types/react-table` expects row data to extend `object`. However, iTwinUI Table's expects row data to extend `Record<string, unknown>`.
//   - This gave type errors like: `Type Record<string, unknown> is not assignable to type TableStoryDataType.`

export interface TableOptions<D extends Record<string, unknown>>
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
   *
   * Should not have a top-level `Header` or a `columns` sub-property. They are only allowed to be passed for backwards compatibility.
   * See [migration guide](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v2-migration-guide#breaking-changes).
   */
  columns: Array<Column<D>>;
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

export interface TableInstance<D extends Record<string, unknown> = {}>
  extends Omit<TableOptions<D>, 'columns' | 'pageCount'>,
    UseTableInstanceProps<D>,
    UseColumnOrderInstanceProps<D>,
    UseExpandedInstanceProps<D>,
    UseFiltersInstanceProps<D>,
    UseGlobalFiltersInstanceProps<D>,
    UseGroupByInstanceProps<D>,
    UsePaginationInstanceProps<D>,
    UseRowSelectInstanceProps<D>,
    UseRowStateInstanceProps<D>,
    UseSortByInstanceProps<D> {
  initialRows: Row<D>[];
  columnResizeMode: TableOptions<D>['columnResizeMode'];
  tableWidth: number;
}

export interface TableState<D extends Record<string, unknown> = {}>
  extends UseColumnOrderState<D>,
    UseExpandedState<D>,
    UseFiltersState<D>,
    UseGlobalFiltersState<D>,
    UseGroupByState<D>,
    UsePaginationState<D>,
    UseRowSelectState<D>,
    UseRowStateState<D>,
    UseSortByState<D> {
  hiddenColumns?: Array<IdType<D>> | undefined;

  // UseResizeColumnsState with fixed typings
  columnResizing: {
    /**
     * Width at the first time the mouse was clicked on the dragger.
     */
    startX?: number;
    /**
     * Width of the column we're resizing
     */
    columnWidth?: number;
    /**
     * Width of the next column (column on the right) of the column we're resizing
     */
    nextColumnWidth?: number;
    headerIdWidths?: Array<[string, number]>;
    nextHeaderIdWidths?: Array<[string, number]>;
    columnWidths: Record<string, number>;
    isResizingColumn?: string;
    // previousTableWidths?: Array<[string, number]>; // used to calculate the difference in widths when resizing columns
    previousState?: TableState<D>;
  };
  /**
   *
   */
  isTableResizing?: boolean;
  columnReorderStartIndex: number;
  sticky: {
    isScrolledToRight?: boolean;
    isScrolledToLeft?: boolean;
  };
  lastSelectedRowId?: string;
}

export interface Hooks<D extends Record<string, unknown> = {}>
  extends UseTableHooks<D>,
    UseExpandedHooks<D>,
    UseGroupByHooks<D>,
    UseRowSelectHooks<D>,
    UseSortByHooks<D> {}

export interface Cell<D extends Record<string, unknown> = {}, V = any>
  extends UseTableCellProps<D, V>,
    UseGroupByCellProps<D>,
    UseRowStateCellProps<D> {}

export interface ColumnInterface<D extends Record<string, unknown> = {}>
  // UseGroupByColumnOptions<D>,
  extends UseTableColumnOptions<D>,
    UseSortByColumnOptions<D>,
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
  Filter?: Renderer<FilterProps<D>> | Renderer<TableFilterProps<D>>;
  /**
   * String value or custom function to use for filtering.
   * Possible string values: `text`, `exactText`, `exactTextCase`, `includes`, `includesAll`, `includesSome`, `exact`, `equals`, `between`.
   * More info about these filters: https://github.com/TanStack/table/blob/v7/src/filterTypes.js
   */
  filter?: FilterType<D> | DefaultFilterTypes | AnyString;
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

export interface ColumnInterfaceBasedOnValue<
  D extends Record<string, unknown> = {},
  V = any,
> {
  Cell?: Renderer<CellProps<D, V>> | undefined;
}

export interface ColumnGroupInterface<D extends Record<string, unknown>> {
  // Commented out since we do not support nested columns
  // columns: Array<Column<D>>;
}

export type ColumnGroup<D extends Record<string, unknown> = {}> =
  ColumnInterface<D> &
    ColumnGroupInterface<D> &
    (
      | { Header: string }
      | ({ id: IdType<D> } & {
          Header: Renderer<HeaderProps<D>>;
        })
    ) & { accessor?: Accessor<D> | undefined }; // Not used, but needed for backwards compatibility

type ValueOf<T> = T[keyof T];

// The accessors like `foo.bar` are not supported, use functions instead
export type ColumnWithStrictAccessor<D extends Record<string, unknown> = {}> =
  ColumnInterface<D> &
    ValueOf<{
      [K in keyof D]: {
        accessor: K;
      } & ColumnInterfaceBasedOnValue<D, D[K]>;
    }>;

export type ColumnWithLooseAccessor<D extends Record<string, unknown> = {}> =
  ColumnInterface<D> &
    ColumnInterfaceBasedOnValue<D> &
    (
      | { Header: string }
      | { id: IdType<D> }
      | { accessor: keyof D extends never ? IdType<D> : never }
    ) & {
      accessor?:
        | (keyof D extends never ? IdType<D> | Accessor<D> : Accessor<D>)
        | undefined;
    };

export type Column<D extends Record<string, unknown> = {}> =
  | ColumnGroup<D>
  | ColumnWithLooseAccessor<D>
  | ColumnWithStrictAccessor<D>;

export interface ColumnInstance<D extends Record<string, unknown> = {}>
  extends Omit<ColumnInterface<D>, 'id'>,
    ColumnInterfaceBasedOnValue<D>,
    UseTableColumnProps<D>,
    UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {
  originalWidth: number;
  resizeWidth?: number;
  isResizerVisible?: boolean;
  getDragAndDropProps: () => TableKeyedProps;
  originalSticky?: 'left' | 'right' | 'none';
}

export interface HeaderGroup<D extends Record<string, unknown> = {}>
  extends ColumnInstance<D>,
    UseTableHeaderGroupProps<D> {}

export interface Row<D extends Record<string, unknown> = {}>
  extends UseTableRowProps<D>,
    UseExpandedRowProps<D>,
    UseGroupByRowProps<D>,
    UseRowSelectRowProps<D>,
    UseRowStateRowProps<D> {
  initialSubRows: Row<D>[];
}

export interface TableCommonProps {
  style?: CSSProperties | undefined;
  className?: string | undefined;
  role?: string | undefined;
}

export interface TableProps extends TableCommonProps {}

export interface TableBodyProps extends TableCommonProps {}

export interface TableKeyedProps extends TableCommonProps {
  key: React.Key;
}

export interface TableHeaderGroupProps extends TableKeyedProps {}

export interface TableFooterGroupProps extends TableKeyedProps {}

export interface TableHeaderProps extends TableKeyedProps {}

export interface TableFooterProps extends TableKeyedProps {}

export interface TableRowProps extends TableKeyedProps {}

export interface TableCellProps extends TableKeyedProps {}

export interface TableToggleCommonProps extends TableCommonProps {
  onChange?: ((e: ChangeEvent) => void) | undefined;
  checked?: boolean | undefined;
  title?: string | undefined;
  indeterminate?: boolean | undefined;
}

export interface MetaBase<D extends Record<string, unknown>> {
  instance: TableInstance<D>;
  userProps: any;
}

// inspired by ExtendState in  https://github.com/reduxjs/redux/blob/master/src/types/store.ts
export type Meta<
  D extends Record<string, unknown>,
  Extension = never,
  M = MetaBase<D>,
> = [Extension] extends [never] ? M : M & Extension;

//#region useTable
export declare function useTable<D extends Record<string, unknown> = {}>(
  options: TableOptions<D>,
  ...plugins: Array<PluginHook<D>>
): TableInstance<D>;

/**
 * NOTE: To use custom options, use "Interface Merging" to add the custom options
 */
export type UseTableOptions<D extends Record<string, unknown>> = {
  columns: ReadonlyArray<Column<D>>;
  data: readonly D[];
} & Partial<{
  initialState: Partial<TableState<D>>;
  stateReducer: (
    newState: TableState<D>,
    action: ActionType,
    previousState: TableState<D>,
    instance?: TableInstance<D>,
  ) => TableState<D>;
  useControlledState: (state: TableState<D>, meta: Meta<D>) => TableState<D>;
  defaultColumn: Partial<Column<D>>;
  getSubRows: (originalRow: D, relativeIndex: number) => D[];
  getRowId: (originalRow: D, relativeIndex: number, parent?: Row<D>) => string;
  autoResetHiddenColumns: boolean;
}>;

export type PropGetter<
  D extends Record<string, unknown>,
  Props,
  T extends object = never,
  P = Partial<Props>,
> = ((props: P, meta: Meta<D, T>) => P | P[]) | P | P[];

export type TablePropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableProps
>;

export type TableBodyPropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableBodyProps
>;

export type HeaderPropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableHeaderProps,
  { column: HeaderGroup<D> }
>;

export type FooterGroupPropGetter<D extends Record<string, unknown>> =
  PropGetter<D, TableFooterGroupProps, { column: HeaderGroup<D> }>;

export type HeaderGroupPropGetter<D extends Record<string, unknown>> =
  PropGetter<D, TableHeaderGroupProps, { column: HeaderGroup<D> }>;

export type FooterPropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableFooterProps,
  { column: HeaderGroup<D> }
>;

export type RowPropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableRowProps,
  { row: Row<D> }
>;

export type CellPropGetter<D extends Record<string, unknown>> = PropGetter<
  D,
  TableCellProps,
  { cell: Cell<D> }
>;

export interface ReducerTableState<D extends Record<string, unknown>>
  extends TableState<D>,
    Record<string, any> {}

export interface UseTableHooks<D extends Record<string, unknown>>
  extends Record<string, any> {
  useOptions: Array<
    (options: TableOptions<D>, args: TableOptions<D>) => TableOptions<D>
  >;
  stateReducers: Array<
    (
      newState: TableState<D>,
      action: ActionType,
      previousState?: TableState<D>,
      instance?: TableInstance<D>,
    ) => ReducerTableState<D> | undefined
  >;
  columns: Array<
    (columns: Array<Column<D>>, meta: Meta<D>) => Array<Column<D>>
  >;
  columnsDeps: Array<(deps: any[], meta: Meta<D>) => any[]>;
  allColumns: Array<
    (allColumns: Array<ColumnInstance<D>>, meta: Meta<D>) => Array<Column<D>>
  >;
  allColumnsDeps: Array<(deps: any[], meta: Meta<D>) => any[]>;
  visibleColumns: Array<
    (allColumns: Array<ColumnInstance<D>>, meta: Meta<D>) => Array<Column<D>>
  >;
  visibleColumnsDeps: Array<(deps: any[], meta: Meta<D>) => any[]>;
  headerGroups: Array<
    (allColumns: Array<HeaderGroup<D>>, meta: Meta<D>) => Array<HeaderGroup<D>>
  >;
  headerGroupsDeps: Array<(deps: any[], meta: Meta<D>) => any[]>;
  useInstanceBeforeDimensions: Array<(instance: TableInstance<D>) => void>;
  useInstance: Array<(instance: TableInstance<D>) => void>;
  prepareRow: Array<(row: Row<D>, meta: Meta<D>) => void>;
  useControlledState: Array<
    (state: TableState<D>, meta: Meta<D>) => TableState<D>
  >;

  getTableProps: Array<TablePropGetter<D>>;
  getTableBodyProps: Array<TableBodyPropGetter<D>>;
  getHeaderGroupProps: Array<HeaderGroupPropGetter<D>>;
  getFooterGroupProps: Array<FooterGroupPropGetter<D>>;
  getHeaderProps: Array<HeaderPropGetter<D>>;
  getFooterProps: Array<FooterPropGetter<D>>;
  getRowProps: Array<RowPropGetter<D>>;
  getCellProps: Array<CellPropGetter<D>>;
  useFinalInstance: Array<(instance: TableInstance<D>) => void>;
}

export interface UseTableColumnOptions<D extends Record<string, unknown>> {
  id?: IdType<D> | undefined;
  Header?: Renderer<HeaderProps<D>> | undefined;
  Footer?: Renderer<FooterProps<D>> | undefined;
  width?: number | string | undefined;
  minWidth?: number | undefined;
  maxWidth?: number | string | undefined;
}

type UpdateHiddenColumns<D extends Record<string, unknown>> = (
  oldHidden: Array<IdType<D>>,
) => Array<IdType<D>>;

export interface TableToggleHideAllColumnProps extends TableToggleCommonProps {}

export interface UseTableInstanceProps<D extends Record<string, unknown>> {
  state: TableState<D>;
  plugins: Array<PluginHook<D>>;
  dispatch: TableDispatch;
  columns: Array<ColumnInstance<D>>;
  allColumns: Array<ColumnInstance<D>>;
  visibleColumns: Array<ColumnInstance<D>>;
  headerGroups: Array<HeaderGroup<D>>;
  footerGroups: Array<HeaderGroup<D>>;
  headers: Array<ColumnInstance<D>>;
  flatHeaders: Array<ColumnInstance<D>>;
  rows: Array<Row<D>>;
  rowsById: Record<string, Row<D>>;
  getTableProps: (propGetter?: TablePropGetter<D>) => TableProps;
  getTableBodyProps: (propGetter?: TableBodyPropGetter<D>) => TableBodyProps;
  prepareRow: (row: Row<D>) => void;
  flatRows: Array<Row<D>>;
  totalColumnsWidth: number;
  allColumnsHidden: boolean;
  toggleHideColumn: (columnId: IdType<D>, value?: boolean) => void;
  setHiddenColumns: (param: Array<IdType<D>> | UpdateHiddenColumns<D>) => void;
  toggleHideAllColumns: (value?: boolean) => void;
  getToggleHideAllColumnsProps: (
    props?: Partial<TableToggleHideAllColumnProps>,
  ) => TableToggleHideAllColumnProps;
  getHooks: () => Hooks<D>;
}

export interface UseTableHeaderGroupProps<D extends Record<string, unknown>> {
  headers: Array<HeaderGroup<D>>;
  getHeaderGroupProps: (
    propGetter?: HeaderGroupPropGetter<D>,
  ) => TableHeaderProps;
  getFooterGroupProps: (
    propGetter?: FooterGroupPropGetter<D>,
  ) => TableFooterProps;
  totalHeaderCount: number; // not documented
}

export interface UseTableColumnProps<D extends Record<string, unknown>> {
  id: IdType<D>;
  columns?: Array<ColumnInstance<D>> | undefined;
  isVisible: boolean;
  render: (type: 'Header' | 'Footer' | string, props?: object) => ReactNode;
  totalLeft: number;
  totalWidth: number;
  getHeaderProps: (propGetter?: HeaderPropGetter<D>) => TableHeaderProps;
  getFooterProps: (propGetter?: FooterPropGetter<D>) => TableFooterProps;
  toggleHidden: (value?: boolean) => void;
  parent?: ColumnInstance<D> | undefined; // not documented
  getToggleHiddenProps: (userProps?: any) => any;
  depth: number; // not documented
  placeholderOf?: ColumnInstance | undefined;
}

export interface UseTableRowProps<D extends Record<string, unknown>> {
  cells: Array<Cell<D>>;
  allCells: Array<Cell<D>>;
  values: Record<IdType<D>, CellValue>;
  getRowProps: (propGetter?: RowPropGetter<D>) => TableRowProps;
  index: number;
  original: D;
  id: string;
  subRows: Array<Row<D>>;
}

export interface UseTableCellProps<D extends Record<string, unknown>, V = any> {
  column: ColumnInstance<D>;
  row: Row<D>;
  value: CellValue<V>;
  getCellProps: (propGetter?: CellPropGetter<D>) => TableCellProps;
  render: (type: 'Cell' | string, userProps?: object) => ReactNode;
}

export type HeaderProps<D extends Record<string, unknown>> =
  TableInstance<D> & {
    column: ColumnInstance<D>;
  };

export type FooterProps<D extends Record<string, unknown>> =
  TableInstance<D> & {
    column: ColumnInstance<D>;
  };

export type CellProps<
  D extends Record<string, unknown>,
  V = any,
> = TableInstance<D> & {
  column: ColumnInstance<D>;
  row: Row<D>;
  cell: Cell<D, V>;
  value: CellValue<V>;
};

export type Accessor<D extends Record<string, unknown>> = (
  originalRow: D,
  index: number,
  sub: {
    subRows: D[];
    depth: number;
    data: D[];
  },
) => CellValue;

//#endregion

// Plugins

//#region useAbsoluteLayout
export declare function useAbsoluteLayout<
  D extends Record<string, unknown> = {},
>(hooks: Hooks<D>): void;

//#endregion

//#region useBlockLayout
export declare function useBlockLayout<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

//#endregion

//#region useColumnOrder
export declare function useColumnOrder<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export interface UseColumnOrderState<D extends Record<string, unknown>> {
  columnOrder: Array<IdType<D>>;
}

export interface UseColumnOrderInstanceProps<
  D extends Record<string, unknown>,
> {
  setColumnOrder: (
    updater:
      | ((columnOrder: Array<IdType<D>>) => Array<IdType<D>>)
      | Array<IdType<D>>,
  ) => void;
}

//#endregion

//#region useExpanded
export declare function useExpanded<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export interface TableExpandedToggleProps extends TableKeyedProps {}

export type UseExpandedOptions<D extends Record<string, unknown>> = Partial<{
  manualExpandedKey: IdType<D>;
  paginateExpandedRows: boolean;
  expandSubRows: boolean;
  autoResetExpanded?: boolean | undefined;
}>;

export interface UseExpandedHooks<D extends Record<string, unknown>> {
  getToggleRowsExpandedProps: Array<PropGetter<D, TableCommonProps>>;
  getToggleAllRowsExpandedProps: Array<PropGetter<D, TableCommonProps>>;
}

export interface UseExpandedState<D extends Record<string, unknown>> {
  expanded: Record<IdType<D>, boolean>;
}

export interface UseExpandedInstanceProps<D extends Record<string, unknown>> {
  preExpandedRows: Array<Row<D>>;
  expandedRows: Array<Row<D>>;
  rows: Array<Row<D>>;
  expandedDepth: number;
  isAllRowsExpanded: boolean;
  toggleRowExpanded: (id: Array<IdType<D>>, value?: boolean) => void;
  toggleAllRowsExpanded: (value?: boolean) => void;
}

export interface UseExpandedRowProps<D extends Record<string, unknown>> {
  isExpanded: boolean;
  canExpand: boolean;
  subRows: Array<Row<D>>;
  toggleRowExpanded: (value?: boolean) => void;
  getToggleRowExpandedProps: (
    props?: Partial<TableExpandedToggleProps>,
  ) => TableExpandedToggleProps;
  depth: number;
}

//#endregion

//#region useFilters
export declare function useFilters<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export type UseFiltersOptions<D extends Record<string, unknown>> = Partial<{
  manualFilters: boolean;
  disableFilters: boolean;
  defaultCanFilter: boolean;
  filterTypes: FilterTypes<D>;
  autoResetFilters?: boolean | undefined;
}>;

export interface UseFiltersState<D extends Record<string, unknown>> {
  filters: Filters<D>;
}

export type UseFiltersColumnOptions<D extends Record<string, unknown>> =
  Partial<{
    Filter: Renderer<FilterProps<D>>;
    disableFilters: boolean;
    defaultCanFilter: boolean;
    filter: FilterType<D> | DefaultFilterTypes | AnyString;
  }>;

export interface UseFiltersInstanceProps<D extends Record<string, unknown>> {
  preFilteredRows: Array<Row<D>>;
  preFilteredFlatRows: Array<Row<D>>;
  preFilteredRowsById: Record<string, Row<D>>;
  filteredRows: Array<Row<D>>;
  filteredFlatRows: Array<Row<D>>;
  filteredRowsById: Record<string, Row<D>>;
  rows: Array<Row<D>>;
  flatRows: Array<Row<D>>;
  rowsById: Record<string, Row<D>>;
  setFilter: (
    columnId: IdType<D>,
    updater: ((filterValue: FilterValue) => FilterValue) | FilterValue,
  ) => void;
  setAllFilters: (
    updater: Filters<D> | ((filters: Filters<D>) => Filters<D>),
  ) => void;
}

export interface UseFiltersColumnProps<D extends Record<string, unknown>> {
  canFilter: boolean;
  setFilter: (
    updater: ((filterValue: FilterValue) => FilterValue) | FilterValue,
  ) => void;
  filterValue: FilterValue;
  preFilteredRows: Array<Row<D>>;
  filteredRows: Array<Row<D>>;
}

export type FilterProps<D extends Record<string, unknown>> = HeaderProps<D>;
export type FilterValue = any;
export type Filters<D extends Record<string, unknown>> = Array<{
  id: IdType<D>;
  value: FilterValue;
}>;
export type FilterTypes<D extends Record<string, unknown>> = Record<
  string,
  FilterType<D>
>;

export type DefaultFilterTypes =
  | 'text'
  | 'exactText'
  | 'exactTextCase'
  | 'includes'
  | 'includesAll'
  | 'includesSome'
  | 'exact'
  | 'equals'
  | 'between';

export interface FilterType<D extends Record<string, unknown>> {
  (
    rows: Array<Row<D>>,
    columnIds: Array<IdType<D>>,
    filterValue: FilterValue,
  ): Array<Row<D>>;

  autoRemove?: ((filterValue: FilterValue) => boolean) | undefined;
}

//#endregion

//#region useFlexLayout
export declare function useFlexLayout<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

//#endregion

//#region useGridLayout
export declare function useGridLayout<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

//#endregion

//#region useGlobalFilter
export declare function useGlobalFilter<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export type UseGlobalFiltersOptions<D extends Record<string, unknown>> =
  Partial<{
    globalFilter:
      | ((
          rows: Array<Row<D>>,
          columnIds: Array<IdType<D>>,
          filterValue: any,
        ) => Array<Row<D>>)
      | string;
    manualGlobalFilter: boolean;
    filterTypes: FilterTypes<D>;
    autoResetGlobalFilter?: boolean | undefined;
    disableGlobalFilter?: boolean | undefined;
  }>;

export interface UseGlobalFiltersState<D extends Record<string, unknown>> {
  globalFilter: any;
}

export type UseGlobalFiltersColumnOptions<D extends Record<string, unknown>> =
  Partial<{
    disableGlobalFilter?: boolean | undefined;
  }>;

export interface UseGlobalFiltersInstanceProps<
  D extends Record<string, unknown>,
> {
  preGlobalFilteredRows: Array<Row<D>>;
  preGlobalFilteredFlatRows: Array<Row<D>>;
  preGlobalFilteredRowsById: Record<string, Row<D>>;
  globalFilteredRows: Array<Row<D>>;
  globalFilteredFlatRows: Array<Row<D>>;
  globalFilteredRowsById: Record<string, Row<D>>;
  rows: Array<Row<D>>;
  flatRows: Array<Row<D>>;
  rowsById: Record<string, Row<D>>;
  setGlobalFilter: (filterValue: FilterValue) => void;
}

//#endregion

//#region useGroupBy
export declare function useGroupBy<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export interface TableGroupByToggleProps {
  title?: string | undefined;
  style?: CSSProperties | undefined;
  onClick?: ((e: MouseEvent) => void) | undefined;
}

export type UseGroupByOptions<D extends Record<string, unknown>> = Partial<{
  manualGroupBy: boolean;
  disableGroupBy: boolean;
  defaultCanGroupBy: boolean;
  aggregations: Record<string, AggregatorFn<D>>;
  groupByFn: (
    rows: Array<Row<D>>,
    columnId: IdType<D>,
  ) => Record<string, Array<Row<D>>>;
  autoResetGroupBy?: boolean | undefined;
}>;

export interface UseGroupByHooks<D extends Record<string, unknown>> {
  getGroupByToggleProps: Array<HeaderGroupPropGetter<D>>;
}

export interface UseGroupByState<D extends Record<string, unknown>> {
  groupBy: Array<IdType<D>>;
}

export type UseGroupByColumnOptions<D extends Record<string, unknown>> =
  Partial<{
    aggregate: Aggregator<D>;
    Aggregated: Renderer<CellProps<D>>;
    disableGroupBy: boolean;
    defaultCanGroupBy: boolean;
  }>;

export interface UseGroupByInstanceProps<D extends Record<string, unknown>> {
  preGroupedRows: Array<Row<D>>;
  preGroupedFlatRows: Array<Row<D>>;
  preGroupedRowsById: Record<string, Row<D>>;
  groupedRows: Array<Row<D>>;
  groupedFlatRows: Array<Row<D>>;
  groupedRowsById: Record<string, Row<D>>;
  onlyGroupedFlatRows: Array<Row<D>>;
  onlyGroupedRowsById: Record<string, Row<D>>;
  nonGroupedFlatRows: Array<Row<D>>;
  nonGroupedRowsById: Record<string, Row<D>>;
  rows: Array<Row<D>>;
  flatRows: Array<Row<D>>;
  rowsById: Record<string, Row<D>>;
  toggleGroupBy: (columnId: IdType<D>, value?: boolean) => void;
}

export interface UseGroupByColumnProps<D extends Record<string, unknown>> {
  canGroupBy: boolean;
  isGrouped: boolean;
  groupedIndex: number;
  toggleGroupBy: () => void;
  getGroupByToggleProps: (
    props?: Partial<TableGroupByToggleProps>,
  ) => TableGroupByToggleProps;
}

export interface UseGroupByRowProps<D extends Record<string, unknown>> {
  isGrouped: boolean;
  groupByID: IdType<D>;
  groupByVal: string;
  values: Record<IdType<D>, AggregatedValue>;
  subRows: Array<Row<D>>;
  leafRows: Array<Row<D>>;
  depth: number;
  id: string;
  index: number;
}

export interface UseGroupByCellProps<D extends Record<string, unknown>> {
  isGrouped: boolean;
  isPlaceholder: boolean;
  isAggregated: boolean;
}

export type DefaultAggregators =
  | 'sum'
  | 'average'
  | 'median'
  | 'uniqueCount'
  | 'count';

export type AggregatorFn<D extends Record<string, unknown>> = (
  columnValues: CellValue[],
  rows: Array<Row<D>>,
  isAggregated: boolean,
) => AggregatedValue;
export type Aggregator<D extends Record<string, unknown>> =
  | AggregatorFn<D>
  | DefaultAggregators
  | string;
export type AggregatedValue = any;
//#endregion

//#region usePagination
export declare function usePagination<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export type UsePaginationOptions<D extends Record<string, unknown>> = Partial<{
  pageCount: number;
  manualPagination: boolean;
  autoResetPage?: boolean | undefined;
  paginateExpandedRows: boolean;
}>;

export interface UsePaginationState<D extends Record<string, unknown>> {
  pageSize: number;
  pageIndex: number;
}

export interface UsePaginationInstanceProps<D extends Record<string, unknown>> {
  page: Array<Row<D>>;
  pageCount: number;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
}

//#endregion

//#region useResizeColumns
export declare function useResizeColumns<
  D extends Record<string, unknown> = {},
>(hooks: Hooks<D>): void;

export interface UseResizeColumnsOptions<D extends Record<string, unknown>> {
  disableResizing?: boolean | undefined;
  autoResetResize?: boolean | undefined;
}

export interface UseResizeColumnsState<D extends Record<string, unknown>> {
  columnResizing: {
    startX?: number | undefined;
    columnWidth: number;
    headerIdWidths: Record<string, number>;
    columnWidths: any;
    isResizingColumn?: string | undefined;
  };
}

export interface UseResizeColumnsColumnOptions<
  D extends Record<string, unknown>,
> {
  disableResizing?: boolean | undefined;
}

export interface TableResizerProps {}

export interface UseResizeColumnsColumnProps<
  D extends Record<string, unknown>,
> {
  getResizerProps: (props?: Partial<TableResizerProps>) => TableResizerProps;
  canResize: boolean;
  isResizing: boolean;
}

//#endregion

//#region useRowSelect
export declare function useRowSelect<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export interface TableToggleAllRowsSelectedProps
  extends TableToggleCommonProps {}

export interface TableToggleRowsSelectedProps extends TableToggleCommonProps {}

export type UseRowSelectOptions<D extends Record<string, unknown>> = Partial<{
  manualRowSelectedKey: IdType<D>;
  autoResetSelectedRows: boolean;
  selectSubRows: boolean;
}>;

export interface UseRowSelectHooks<D extends Record<string, unknown>> {
  getToggleRowSelectedProps: Array<PropGetter<D, TableToggleRowsSelectedProps>>;
  getToggleAllRowsSelectedProps: Array<
    PropGetter<D, TableToggleAllRowsSelectedProps>
  >;
  getToggleAllPageRowsSelectedProps: Array<
    PropGetter<D, TableToggleAllRowsSelectedProps>
  >;
}

export interface UseRowSelectState<D extends Record<string, unknown>> {
  selectedRowIds: Record<IdType<D>, boolean>;
}

export interface UseRowSelectInstanceProps<D extends Record<string, unknown>> {
  toggleRowSelected: (rowId: IdType<D>, set?: boolean) => void;
  toggleAllRowsSelected: (value?: boolean) => void;
  getToggleAllRowsSelectedProps: (
    props?: Partial<TableToggleAllRowsSelectedProps>,
  ) => TableToggleAllRowsSelectedProps;
  getToggleAllPageRowsSelectedProps: (
    props?: Partial<TableToggleAllRowsSelectedProps>,
  ) => TableToggleAllRowsSelectedProps;
  isAllRowsSelected: boolean;
  selectedFlatRows: Array<Row<D>>;
}

export interface UseRowSelectRowProps<D extends Record<string, unknown>> {
  isSelected: boolean;
  isSomeSelected: boolean;
  toggleRowSelected: (set?: boolean) => void;
  getToggleRowSelectedProps: (
    props?: Partial<TableToggleRowsSelectedProps>,
  ) => TableToggleRowsSelectedProps;
}

//#endregion

//#region useRowState
export declare function useRowState<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export type UseRowStateOptions<D extends Record<string, unknown>> = Partial<{
  initialRowStateAccessor: (row: Row<D>) => UseRowStateLocalState<D>;
  getResetRowStateDeps: (instance: TableInstance<D>) => any[];
  autoResetRowState?: boolean | undefined;
}>;

export interface UseRowStateState<D extends Record<string, unknown>> {
  rowState: Record<string, { cellState: UseRowStateLocalState<D> }>;
}

export interface UseRowStateInstanceProps<D extends Record<string, unknown>> {
  setRowState: (rowPath: string[], updater: UseRowUpdater) => void;
  setCellState: (
    rowPath: string[],
    columnId: IdType<D>,
    updater: UseRowUpdater,
  ) => void;
}

export interface UseRowStateRowProps<D extends Record<string, unknown>> {
  state: UseRowStateLocalState<D>;
  setState: (updater: UseRowUpdater) => void;
}

export interface UseRowStateCellProps<D extends Record<string, unknown>> {
  state: UseRowStateLocalState<D>;
  setState: (updater: UseRowUpdater) => void;
}

export type UseRowUpdater<T = unknown> = T | ((prev: T) => T);
export type UseRowStateLocalState<
  D extends Record<string, unknown>,
  T = unknown,
> = Record<IdType<D>, T>;
//#endregion

//#region useSortBy
export declare function useSortBy<D extends Record<string, unknown> = {}>(
  hooks: Hooks<D>,
): void;

export interface TableSortByToggleProps {
  title?: string | undefined;
  style?: CSSProperties | undefined;
  onClick?: ((e: MouseEvent) => void) | undefined;
}

export type UseSortByOptions<D extends Record<string, unknown>> = Partial<{
  manualSortBy: boolean;
  disableSortBy: boolean;
  defaultCanSort: boolean;
  disableMultiSort: boolean;
  isMultiSortEvent: (e: MouseEvent) => boolean;
  maxMultiSortColCount: number;
  disableSortRemove: boolean;
  disabledMultiRemove: boolean;
  orderByFn: (
    rows: Array<Row<D>>,
    sortFns: Array<OrderByFn<D>>,
    directions: boolean[],
  ) => Array<Row<D>>;
  sortTypes: Record<string, SortByFn<D>>;
  autoResetSortBy?: boolean | undefined;
}>;

export interface UseSortByHooks<D extends Record<string, unknown>> {
  getSortByToggleProps: Array<PropGetter<D, TableCommonProps>>;
}

export interface UseSortByState<D extends Record<string, unknown>> {
  sortBy: Array<SortingRule<D>>;
}

export type UseSortByColumnOptions<D extends Record<string, unknown>> =
  Partial<{
    defaultCanSort: boolean;
    disableSortBy: boolean;
    sortDescFirst: boolean;
    sortInverted: boolean;
    sortType: SortByFn<D> | DefaultSortTypes | string;
  }>;

export interface UseSortByInstanceProps<D extends Record<string, unknown>> {
  rows: Array<Row<D>>;
  preSortedRows: Array<Row<D>>;
  setSortBy: (sortBy: Array<SortingRule<D>>) => void;
  toggleSortBy: (
    columnId: IdType<D>,
    descending?: boolean,
    isMulti?: boolean,
  ) => void;
}

export interface UseSortByColumnProps<D extends Record<string, unknown>> {
  canSort: boolean;
  toggleSortBy: (descending?: boolean, multi?: boolean) => void;
  getSortByToggleProps: (
    props?: Partial<TableSortByToggleProps>,
  ) => TableSortByToggleProps;
  clearSortBy: () => void;
  isSorted: boolean;
  sortedIndex: number;
  isSortedDesc: boolean | undefined;
}

export type OrderByFn<D extends Record<string, unknown>> = (
  rowA: Row<D>,
  rowB: Row<D>,
) => number;
export type SortByFn<D extends Record<string, unknown>> = (
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>,
  desc?: boolean,
) => number;

export type DefaultSortTypes =
  | 'alphanumeric'
  | 'datetime'
  | 'basic'
  | 'string'
  | 'number';

export interface SortingRule<D> {
  id: IdType<D>;
  desc?: boolean | undefined;
}

//#endregion

type BuiltInAction =
  | 'init'
  | 'resetHiddenColumns'
  | 'toggleHideColumn'
  | 'setHiddenColumns'
  | 'toggleHideAllColumns'
  | 'resetPivot'
  | 'togglePivot'
  | 'resetColumnOrder'
  | 'setColumnOrder'
  | 'resetExpanded'
  | 'toggleRowExpanded'
  | 'toggleAllRowsExpanded'
  | 'resetFilters'
  | 'setFilter'
  | 'setAllFilters'
  | 'resetGlobalFilter'
  | 'setGlobalFilter'
  | 'columnStartResizing'
  | 'columnResizing'
  | 'columnDoneResizing'
  | 'resetResize'
  | 'resetGroupBy'
  | 'setGroupBy'
  | 'toggleGroupBy'
  | 'resetPage'
  | 'gotoPage'
  | 'setPageSize'
  | 'resetSelectedRows'
  | 'toggleAllRowsSelected'
  | 'toggleRowSelected'
  | 'toggleAllPageRowsSelected'
  | 'setRowState'
  | 'setCellState'
  | 'resetRowState'
  | 'resetSortBy'
  | 'setSortBy'
  | 'toggleSortBy'
  | 'clearSortBy';

type CustomAction =
  | 'setScrolledLeft'
  | 'setScrolledRight'
  | 'columnDragStart'
  | 'columnDragEnd'
  | 'singleRowSelected'
  | 'shiftRowSelected'
  | 'tableResizeStart'
  | 'tableResizeEnd';

type PossibleActionType = BuiltInAction | CustomAction | AnyString;

// Additional API
export declare const actions: Record<PossibleActionType, string>;
export type ActionType = { type: PossibleActionType } & Record<string, any>;
export declare const defaultColumn: Partial<Column> & Record<string, any>;

// Helpers
export type StringKey<D> = Extract<keyof D, string>;
export type IdType<D> = StringKey<D> | string;
export type CellValue<V = any> = V;

export type Renderer<Props> =
  | ComponentType<Props>
  | ReactElement<any>
  | string
  | number
  | Iterable<ReactNode>;

export interface PluginHook<D extends Record<string, unknown>> {
  (hooks: Hooks<D>): void;
  pluginName?: string | undefined;
}

export type TableDispatch<A = any> = (action: A) => void;

// utils
export declare function defaultOrderByFn<
  D extends Record<string, unknown> = {},
>(
  arr: Array<Row<D>>,
  funcs: Array<OrderByFn<D>>,
  dirs: boolean[],
): Array<Row<D>>;

export declare function defaultGroupByFn<
  D extends Record<string, unknown> = {},
>(rows: Array<Row<D>>, columnId: IdType<D>): Record<string, Array<Row<D>>>;

export declare function makePropGetter(hooks: Hooks, ...meta: any[]): any;

export declare function reduceHooks<T extends object = {}>(
  hooks: Hooks,
  initial: T,
  ...args: any[]
): T;

export declare function loopHooks(hooks: Hooks, ...args: any[]): void;

export declare function ensurePluginOrder<
  D extends Record<string, unknown> = {},
>(plugins: Array<PluginHook<D>>, befores: string[], pluginName: string): void;

export declare function functionalUpdate<
  D extends Record<string, unknown> = {},
>(updater: any, old: Partial<TableState<D>>): Partial<TableState<D>>;

export declare function useGetLatest<T>(obj: T): () => T;

export declare function safeUseLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList,
): void;

export declare function useMountedLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList,
): void;

export declare function useAsyncDebounce<F extends (...args: any[]) => any>(
  defaultFn: F,
  defaultWait?: number,
): F;

export declare function makeRenderer(
  instance: TableInstance,
  column: ColumnInstance,
  meta?: any,
): ReactElement<any>;
