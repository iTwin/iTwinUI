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
    extends Omit<TableOptions<D>, 'columns' | 'pageCount'> {
    initialRows: Row<D>[];
    columnResizeMode: TableOptions<D>['columnResizeMode'];
    tableWidth: number;
  }

  export interface TableState<D extends object> {}

  // export interface Hooks<D extends object>
  //   extends UseTableHooks<D>,
  //     UseExpandedHooks<D>,
  //     UseGroupByHooks<D>,
  //     UseRowSelectHooks<D>,
  //     UseSortByHooks<D> {}

  // export interface Cell<D extends object, V = any>
  //   extends UseTableCellProps<D, V>,
  //     UseGroupByCellProps<D>,
  //     UseRowStateCellProps<D> {}

  export interface ColumnInterface<D extends object> {
    /**
     * Custom class name applied to header column cell.
     */
    columnClassName?: string;
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
  }

  export interface ColumnInterfaceBasedOnValue<D extends object, V = any> {
    // Cell?: Renderer<CellProps<D, V>> | undefined;
    // Cell?: (props: CellProps<D, V>) => React.ReactNode;
    // testing1: Renderer<CellProps<D, V>> | undefined;
    testing1: Renderer<CellProps<D, V>> | undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ColumnGroupInterface<D extends object> {
    // columns: Array<Column<D>>;
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

  export type Column<D extends object = object> =
    | ColumnGroup<D>
    | ColumnWithLooseAccessor<D>
    | ColumnWithStrictAccessor<D>;

  // export type Column<D extends object = object> = ColumnWithStrictAccessor<D>;

  export type ColumnInstance<D extends object> = Omit<ColumnInterface<D>, 'id'>;

  export interface HeaderGroup<D extends object>
    extends ColumnInstance<D>,
      UseTableHeaderGroupProps<D> {}

  export interface Row<D extends object> extends UseTableRowProps<D> {
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

  export interface UseTableHooks<D extends object> extends Record<string, any> {
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
      (
        allColumns: Array<HeaderGroup<D>>,
        meta: Meta<D>,
      ) => Array<HeaderGroup<D>>
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

  /////////////////////////////////////////////////

  //#endregion

  // Additional API
  export const actions: Record<string, string>;
  export type ActionType = { type: string } & Record<string, any>;
  export const defaultColumn: Partial<Column> & Record<string, any>;

  // Helpers
  export type StringKey<D> = Extract<keyof D, string>;
  export type IdType<D> = StringKey<D> | string;
  export type CellValue<V = any> = V;

  export type Renderer<Props> =
    | ComponentType<Props>
    | ReactElement
    | string
    | number
    | ReactFragment;
}
