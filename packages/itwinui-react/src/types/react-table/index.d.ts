/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  DependencyList,
  EffectCallback,
  MouseEvent,
  ReactElement,
  ReactFragment,
  ReactNode,
} from 'react';

declare module 'react-table' {
  export {};

  /**
   * The empty definitions of below provides a base definition for the parts used by useTable, that can then be extended in the users code.
   *
   * @example
   *  export interface TableOptions<D extends object = {}}>
   *    extends
   *      UseExpandedOptions<D>,
   *      UseFiltersOptions<D> {}
   * see https://gist.github.com/ggascoigne/646e14c9d54258e40588a13aabf0102d for more details
   */
  export interface TableOptions<D extends object>
    extends Omit<UseTableOptions<D>, 'data' | 'columns'> {
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

  export interface TableInstance<D extends object>
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

  export interface TableState<D extends object>
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

  export interface ColumnInterface<D extends object>
    extends UseTableColumnOptions<D>,
      UseSortByColumnOptions<D>,
      UseFiltersColumnOptions<D>,
      UseResizeColumnsColumnOptions<D> {
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

  export interface ColumnInterfaceBasedOnValue<D extends object, V = any> {
    // Cell?: Renderer<CellProps<D, V>> | undefined;
    // Cell?: (props: CellProps<D, V>) => React.ReactNode;
    // testing1: Renderer<CellProps<D, V>> | undefined;
    testing1: Renderer<CellProps<D, V>> | undefined;
  }

  export type ColumnGroup<D extends object> = ColumnInterface<D> &
    ColumnGroupInterface<D> &
    (
      | { Header: string }
      | ({ id: IdType<D> } & {
          Header: Renderer<HeaderProps<D>>;
        })
    ) & { accessor?: Accessor<D> | undefined }; // Not used, but needed for backwards compatibility

  type ValueOf<T> = T[keyof T];

  // interface TableStoryDataType {
  //   product: number;
  //   price: number;
  //   // [K in string]: any;
  //   quantity: number;
  //   rating: number;
  //   deliveryTime: number;
  //   status: 'positive' | 'negative' | 'warning' | undefined;
  //   // subRows: TableStoryDataType[];
  //   // 1?: number;
  // };

  // // type testing = ColumnWithStrictAccessor<TableStoryDataType>
  // // type testing = ColumnInterfaceBasedOnValue<TableStoryDataType>
  // // type testing = CellProps<TableStoryDataType>
  // type testing = TableInstance<TableStoryDataType>

  // The accessors like `foo.bar` are not supported, use functions instead
  export type ColumnWithStrictAccessor<D extends object> = ColumnInterface<D> &
    // export type ColumnWithStrictAccessor<D extends object> = ValueOf<{
    ValueOf<{
      [K in keyof D]: {
        accessor: K;
      } & ColumnInterfaceBasedOnValue<D, D[K]>;
    }>;

  export type ColumnWithLooseAccessor<D extends object> = ColumnInterface<D> &
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

  // export type Column<D extends object = object> =
  //   | ColumnGroup<D>
  //   | ColumnWithLooseAccessor<D>
  //   | ColumnWithStrictAccessor<D>;

  export type Column<D extends object = object> = ColumnWithStrictAccessor<D>;

  export interface ColumnInstance<D extends object>
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

  export interface Row<D extends object>
    extends UseTableRowProps<D>,
      UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {
    initialSubRows: Row<D>[];
  }

  //#region useTable
  export function useTable<D extends object>(
    options: TableOptions<D>,
    ...plugins: Array<PluginHook<D>>
  ): TableInstance<D>;

  /**
   * NOTE: To use custom options, use "Interface Merging" to add the custom options
   */
  export type UseTableOptions<D extends object> = {
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
    getRowId: (
      originalRow: D,
      relativeIndex: number,
      parent?: Row<D>,
    ) => string;
    autoResetHiddenColumns: boolean;
  }>;

  export interface UseTableColumnOptions<D extends object> {
    id?: IdType<D> | undefined;
    Header?: Renderer<HeaderProps<D>> | undefined;
    Footer?: Renderer<FooterProps<D>> | undefined;
    width?: number | string | undefined;
    minWidth?: number | undefined;
    maxWidth?: number | undefined;
  }

  export interface UseTableInstanceProps<D extends object> {
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
    setHiddenColumns: (
      param: Array<IdType<D>> | UpdateHiddenColumns<D>,
    ) => void;
    toggleHideAllColumns: (value?: boolean) => void;
    getToggleHideAllColumnsProps: (
      props?: Partial<TableToggleHideAllColumnProps>,
    ) => TableToggleHideAllColumnProps;
    getHooks: () => Hooks<D>;
  }

  export type CellProps<D, V = any> = {
    column: ColumnInstance<D>;
    row: Row<D>;
    cell: Cell<D, V>;
    value: CellValue<V>;
  };
  // export type CellProps<D extends object, V = any> = TableInstance<D> & {
  //   column: ColumnInstance<D>;
  //   row: Row<D>;
  //   cell: Cell<D, V>;
  //   value: CellValue<V>;
  // };

  export type Accessor<D extends object> = (
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

  ///////////////////////////////////////////

  // Testing

  type TableStoryDataType = {
    product: string;
    price: number;
  };

  const data = [
    {
      product: 'product1',
      price: 1,
    },
  ] satisfies Array<TableStoryDataType>;

  const columns = [{}] satisfies Array<Column<TableStoryDataType>>;
}
