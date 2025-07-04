/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  actions as TableActions,
  useFlexLayout,
  useFilters,
  useRowSelect,
  useSortBy,
  useTable,
  useExpanded,
  usePagination,
  useColumnOrder,
  useGlobalFilter,
} from 'react-table';
import type {
  CellProps,
  HeaderGroup,
  TableOptions,
  Row,
  TableState,
  ActionType,
  TableInstance,
  Column,
} from '../../react-table/react-table.js';
import { ProgressRadial } from '../ProgressIndicators/ProgressRadial.js';
import {
  useGlobals,
  useResizeObserver,
  useLayoutEffect,
  Box,
  useWarningLogger,
  ShadowRoot,
  useMergedRefs,
  useLatestRef,
  useVirtualScroll,
  useId,
} from '../../utils/index.js';
import type { CommonProps } from '../../utils/index.js';
import { TableInstanceContext } from './utils.js';
import { TableRowMemoized } from './TableRowMemoized.js';
import type { TableFilterValue } from './filters/index.js';
import { customFilterFunctions } from './filters/customFilterFunctions.js';
import {
  useExpanderCell,
  useSelectionCell,
  useSubRowFiltering,
  useSubRowSelection,
  useResizeColumns,
  useColumnDragAndDrop,
  useScrollToRow,
  useStickyColumns,
} from './hooks/index.js';
import {
  onExpandHandler,
  onFilterHandler,
  onToggleHandler,
  onShiftSelectHandler,
  onSingleSelectHandler,
  onTableResizeEnd,
  onTableResizeStart,
} from './actionHandlers/index.js';
import { SELECTION_CELL_ID } from './columns/index.js';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { ColumnHeader } from './ColumnHeader.js';
import { TableExpandableContentMemoized } from './TableExpandableContentMemoized.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

const singleRowSelectedAction = 'singleRowSelected';
const shiftRowSelectedAction = 'shiftRowSelected';
export const tableResizeStartAction = 'tableResizeStart';
const tableResizeEndAction = 'tableResizeEnd';
export const iuiId = Symbol('iui-id');

export type TablePaginatorRendererProps = {
  /**
   * The zero-based index of the current page.
   */
  currentPage: number;
  /**
   * Total number of rows.
   */
  totalRowsCount: number;
  /**
   * Number of rows per page.
   */
  pageSize: number;
  /**
   * Callback when page is changed.
   */
  onPageChange: (page: number) => void;
  /**
   * Callback when page size is changed.
   */
  onPageSizeChange: (size: number) => void;
  /**
   * Modify the size of the pagination (adjusts the elements size).
   * @default 'default' if Table density is `default` else `small`
   */
  size?: 'default' | 'small';
  /**
   * Flag whether data is still loading and total rows count is not known.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Total number of rows selected (for mutli-selection mode only)
   */
  totalSelectedRowsCount?: number;
};

/**
 * Table props.
 * columns and data must be memoized.
 */
export type TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = Omit<TableOptions<T>, 'disableSortBy'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'role' | 'onSelect'> & {
    /**
     * Flag whether data is loading.
     * @default false
     */
    isLoading?: boolean;
    /**
     * Content shown when there is no data.
     */
    emptyTableContent: React.ReactNode;
    /**
     * Flag whether table rows can be selectable.
     * @default false
     */
    isSelectable?: boolean;
    /**
     * Handler for rows selection. Must be memoized.
     * This is triggered only by user initiated actions (i.e. data change will not call it).
     */
    onSelect?: (
      selectedData: T[] | undefined,
      tableState?: TableState<T>,
    ) => void;
    /**
     * Handler for when a row is clicked. Must be memoized.
     */
    onRowClick?: (event: React.MouseEvent, row: Row<T>) => void;
    /**
     * Modify the selection mode of the table.
     * The column with checkboxes will not be present with 'single' selection mode.
     * @default 'multi'
     */
    selectionMode?: 'multi' | 'single';
    /**
     * Flag whether table columns can be sortable.
     * @default false
     */
    isSortable?: boolean;
    /**
     * Callback function when sort changes.
     * Use with `manualSortBy` to handle sorting yourself e.g. sort in server-side.
     * Must be memoized.
     */
    onSort?: (state: TableState<T>) => void;
    /**
     * Callback function when scroll reaches bottom. Can be used for lazy-loading the data.
     */
    onBottomReached?: () => void;
    /**
     * Callback function when row is in viewport.
     */
    onRowInViewport?: (rowData: T) => void;
    /**
     * Margin in pixels when row is considered to be already in viewport. Used for `onBottomReached` and `onRowInViewport`.
     * @default 300
     */
    intersectionMargin?: number;
    /**
     * A function that will be used for rendering a component for each row if that row is expanded.
     * Component will be placed right after the row. Can return false/null if row should not be expandable.
     */
    subComponent?: (row: Row<T>) => React.ReactNode;
    /**
     * A function used for overriding default expander cell. `subComponent` must be present.
     * Make sure to trigger `cellProps.row.toggleRowExpanded()`.
     */
    expanderCell?: (cellProps: CellProps<T>) => React.ReactNode;
    /**
     * Handler for row expand events. Will trigger when expanding and collapsing rows.
     */
    onExpand?: (
      expandedData: T[] | undefined,
      tableState?: TableState<T>,
    ) => void;
    /**
     * Callback function when filters change.
     * Use with `manualFilters` to handle filtering yourself e.g. filter in server-side.
     * Must be memoized.
     */
    onFilter?: (
      filters: TableFilterValue<T>[],
      state: TableState<T>,
      filteredData?: Row<T>[],
    ) => void;
    /**
     * Value used for global filtering.
     * Use with `globalFilter` and/or `manualGlobalFilter` to handle filtering yourself e.g. filter in server-side.
     * Must be memoized.
     */
    globalFilterValue?: unknown;
    /**
     * Content shown when there is no data after filtering.
     */
    emptyFilteredTableContent?: React.ReactNode;
    /**
     * Function that should return true if a row is disabled (i.e. cannot be selected or expanded).
     * If not specified, all rows are enabled.
     */
    isRowDisabled?: (rowData: T) => boolean;
    /**
     * Function that should return custom props passed to the each row.
     * Must be memoized.
     */
    rowProps?: (row: Row<T>) => React.ComponentPropsWithRef<'div'> & {
      status?: 'positive' | 'warning' | 'negative';
      isLoading?: boolean;
    };
    /**
     * Modify the density of the table (adjusts the row height).
     * @default 'default'
     */
    density?: 'default' | 'condensed' | 'extra-condensed';
    /**
     * Flag whether to select a row when clicked anywhere inside of it.
     * @default true
     */
    selectRowOnClick?: boolean;
    /**
     * Function that takes `TablePaginatorRendererProps` as an argument and returns pagination component.
     *
     * Recommended to use `TablePaginator`. Passing `props` to `TablePaginator` handles all state management and is enough for basic use-cases.
     * @example
     * (props: TablePaginatorRendererProps) => (
     *   <TablePaginator {...props} />
     * )
     */
    paginatorRenderer?: (props: TablePaginatorRendererProps) => React.ReactNode;
    /**
     * Number of rows per page.
     * @default 25
     */
    pageSize?: number;
    /**
     * Flag whether columns are resizable.
     * In order to disable resizing for specific column, set `disableResizing: true` for that column.
     * @default false
     */
    isResizable?: boolean;
    /**
     * Style of the table.
     * @default 'default'
     */
    styleType?: 'default' | 'zebra-rows';
    /**
     * Virtualization is used for the scrollable table body.
     * Height on the table is required for virtualization to work.
     * @example
     * <Table enableVirtualization style={{height: 400}} {...} />
     * @default false
     * @beta
     */
    enableVirtualization?: boolean;
    /**
     * Flag whether columns can be reordered.
     * @default false
     */
    enableColumnReordering?: boolean;
    /**
     * Passes props to Table header wrapper.
     */
    headerWrapperProps?: React.ComponentProps<'div'>;
    /**
     * Passes props to Table header.
     */
    headerProps?: React.ComponentProps<'div'>;
    /**
     * Passes custom props to Table body.
     */
    bodyProps?: React.ComponentProps<'div'>;
    /**
     * Passes props to the `role="table"` element within the wrapper.
     *
     * - If `tableProps` or `role` is passed to `Table`, all ARIA attributes passed to `Table` will be passed to the wrapper.
     * - Else, all ARIA attributes will be passed to the inner element with `role="table"`.
     */
    tableProps?: React.ComponentProps<'div'>;
    /**
     * Passes custom props to empty table.
     */
    emptyTableContentProps?: React.ComponentProps<'div'>;
    /**
     * Function that returns index of the row that you want to scroll to.
     *
     * When using with lazy-loading table, you need to take care that row is already loaded.
     * It doesn't work with paginated tables.
     * @beta
     * @example
     * <Table
     *   scrollToRow={React.useCallback(
     *     (rows, data) => rows.findIndex((row) => row.original === data[250]),
     *     []
     *   )}
     *   {...restProps}
     * />
     * @example
     * <Table
     *   scrollToRow={React.useCallback(
     *     (rows, data) => rows.findIndex((row) => row.original.id === data[250].id),
     *     []
     *   )}
     *   {...restProps}
     * />
     */
    scrollToRow?: (rows: Row<T>[], data: T[]) => number;
    /**
     * Caption for the table.
     *
     * Although optional for backward compatibility, it is **recommended** to use it for accessibility purposes.
     *
     * @default "Table"
     */
    caption?: string;
    /**
     * If `tableProps` or `role` is passed to `Table`, all ARIA attributes passed to `Table` will be passed to the wrapper.
     * Else, all ARIA attributes will be passed to the inner element with `role="table"`.
     */
    role?: React.AriaRole;
  } & Omit<CommonProps, 'title'>;

const flattenColumns = <T extends Record<string, unknown>>(
  columns: Column<T>[],
): Column<T>[] => {
  const flatColumns: Column<T>[] = [];
  columns.forEach((column) => {
    flatColumns.push(column);
    if ('columns' in column) {
      // @ts-expect-error - Since nested columns are not supported from a types perspective
      flatColumns.push(...flattenColumns(column.columns));
    }
  });
  return flatColumns;
};

/**
 * Table based on [react-table](https://react-table.tanstack.com/docs/api/overview).
 *
 * **Note**: If `tableProps` or `role` is passed to `Table`, all ARIA attributes passed to `Table` will be passed to the wrapper.
 * Else, all ARIA attributes will be passed to the inner element with `role="table"`.
 *
 * ---
 *
 * @example
 * const columns = React.useMemo(() => [
 *   {
 *     id: 'name',
 *     Header: 'Name',
 *     accessor: 'name',
 *     width: 90,
 *   },
 *   {
 *     id: 'description',
 *     Header: 'description',
 *     accessor: 'description',
 *     maxWidth: 200,
 *   },
 *   {
 *     id: 'view',
 *     Header: 'view',
 *     Cell: () => {
 *       return <span onClick={onViewClick}>View</span>
 *     },
 *   },
 * ], [onViewClick])
 * const data = [
 *  { name: 'Name1', description: 'Description1' },
 *  { name: 'Name2', description: 'Description2' },
 *  { name: 'Name3', description: 'Description3' },
 * ]
 * <Table
 *   columns={columns}
 *   data={data}
 *   emptyTableContent='No data.'
 *   isLoading={false}
 *   isSortable={true}
 * />
 */
export const Table = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: TableProps<T>,
): React.JSX.Element => {
  const {
    data,
    columns,
    isLoading = false,
    emptyTableContent,
    className,
    style,
    id,
    isSelectable = false,
    onSelect,
    onRowClick,
    selectionMode = 'multi',
    isSortable = false,
    onSort,
    stateReducer,
    onBottomReached,
    onRowInViewport,
    intersectionMargin = 300,
    subComponent,
    onExpand,
    onFilter,
    globalFilterValue,
    emptyFilteredTableContent,
    filterTypes: filterFunctions,
    expanderCell,
    isRowDisabled,
    rowProps,
    density = 'default',
    selectSubRows = true,
    getSubRows,
    selectRowOnClick = true,
    paginatorRenderer,
    pageSize = 25,
    isResizable = false,
    columnResizeMode = 'fit',
    styleType = 'default',
    enableVirtualization = false,
    enableColumnReordering = false,
    headerWrapperProps,
    headerProps,
    bodyProps,
    tableProps,
    emptyTableContentProps,
    getRowId,
    caption = 'Table',
    role,
    scrollToRow,

    // Destructing remaining TableOptions<T> props to prevent passing them to the DOM.
    // https://github.com/iTwin/iTwinUI/issues/2553
    useControlledState,
    autoResetExpanded,
    autoResetFilters,
    autoResetGlobalFilter,
    autoResetHiddenColumns,
    autoResetPage,
    autoResetResize,
    autoResetSelectedRows,
    autoResetSortBy,
    defaultCanFilter,
    defaultCanSort,
    defaultColumn: defaultColumnProp,
    disableFilters,
    disableGlobalFilter,
    disableMultiSort,
    disableSortRemove,
    disabledMultiRemove,
    expandSubRows,
    globalFilter,
    initialState,
    isMultiSortEvent,
    manualExpandedKey,
    manualFilters,
    manualGlobalFilter,
    manualRowSelectedKey,
    manualSortBy,
    maxMultiSortColCount,
    orderByFn,
    pageCount,
    sortTypes,
    manualPagination,
    paginateExpandedRows,

    ..._rest
  } = props;

  const { ariaRestAttributes, nonAriaRestAttributes } = React.useMemo(
    () =>
      Object.entries(_rest).reduce(
        (result, [key, value]) => {
          if (key.startsWith('aria-')) {
            result.ariaRestAttributes[key] = value;
          } else {
            result.nonAriaRestAttributes[key] = value;
          }
          return result;
        },
        { ariaRestAttributes: {}, nonAriaRestAttributes: {} } as {
          ariaRestAttributes: Record<string, unknown>;
          nonAriaRestAttributes: Record<string, unknown>;
        },
      ),
    [_rest],
  );

  // Conditional behavior for ARIA attributes:
  // If tableProps or role is passed, keep all ARIA attributes on the outer element
  // Otherwise apply them on the inner table element
  const { outerAriaRestAttributes, innerAriaRestAttributes } =
    React.useMemo(() => {
      if (tableProps || role) {
        return {
          outerAriaRestAttributes: { ...ariaRestAttributes },
          innerAriaRestAttributes: {},
        };
      }

      return {
        outerAriaRestAttributes: {},
        innerAriaRestAttributes: { ...ariaRestAttributes },
      };
    }, [ariaRestAttributes, role, tableProps]);

  useGlobals();

  const ownerDocument = React.useRef<Document>(undefined);

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 0,
      minWidth: 0,
      width: 0,
      ...defaultColumnProp,
    }),
    [defaultColumnProp],
  );

  const rowHeight = React.useMemo(() => {
    //Set to the height of the table row based on the value of the density prop.
    if (density === 'condensed') {
      return 50;
    } else if (density === 'extra-condensed') {
      return 38;
    }
    return 62;
  }, [density]);

  const onBottomReachedRef = useLatestRef(onBottomReached);
  const onRowInViewportRef = useLatestRef(onRowInViewport);

  const hasManualSelectionColumn = React.useMemo(() => {
    const flatColumns = flattenColumns(columns);
    return flatColumns.some((column) => column.id === SELECTION_CELL_ID);
  }, [columns]);

  const disableUserSelect = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      ownerDocument.current &&
        (ownerDocument.current.documentElement.style.userSelect = 'none');
    }
  }, []);

  const enableUserSelect = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      ownerDocument.current &&
        (ownerDocument.current.documentElement.style.userSelect = '');
    }
  }, []);

  React.useEffect(() => {
    if (!isSelectable || selectionMode !== 'multi') {
      return;
    }

    const ownerDoc = ownerDocument.current;
    ownerDoc?.addEventListener('keydown', disableUserSelect);
    ownerDoc?.addEventListener('keyup', enableUserSelect);

    return () => {
      ownerDoc?.removeEventListener('keydown', disableUserSelect);
      ownerDoc?.removeEventListener('keyup', enableUserSelect);
    };
  }, [
    isSelectable,
    selectionMode,
    ownerDocument,
    disableUserSelect,
    enableUserSelect,
  ]);

  const previousFilter = React.useRef([] as TableFilterValue<T>[]);
  const currentFilter = React.useRef(previousFilter.current);
  const tableStateReducer = React.useCallback(
    (
      newState: TableState<T>,
      action: ActionType,
      previousState: TableState<T>,
      instance?: TableInstance<T>,
    ): TableState<T> => {
      switch (action.type) {
        case TableActions.toggleSortBy:
          onSort?.(newState);
          break;
        case TableActions.setFilter:
          currentFilter.current = onFilterHandler(
            newState,
            action,
            previousState,
            currentFilter.current,
            instance,
          );
          break;
        case TableActions.toggleRowExpanded:
        case TableActions.toggleAllRowsExpanded:
          onExpandHandler(newState, instance, onExpand);
          break;
        case singleRowSelectedAction: {
          newState = onSingleSelectHandler(
            newState,
            action,
            instance,
            onSelect,
            // If it has manual selection column, then we can't check whether row is disabled
            hasManualSelectionColumn ? undefined : isRowDisabled,
          );
          break;
        }
        case shiftRowSelectedAction: {
          newState = onShiftSelectHandler(
            newState,
            action,
            instance,
            onSelect,
            // If it has manual selection column, then we can't check whether row is disabled
            hasManualSelectionColumn ? undefined : isRowDisabled,
          );
          break;
        }
        case TableActions.toggleRowSelected:
        case TableActions.toggleAllRowsSelected:
        case TableActions.toggleAllPageRowsSelected: {
          onToggleHandler(
            newState,
            action,
            instance,
            onSelect,
            // If it has manual selection column, then we can't check whether row is disabled
            hasManualSelectionColumn ? undefined : isRowDisabled,
          );
          break;
        }
        case tableResizeStartAction: {
          newState = onTableResizeStart(newState);
          break;
        }
        case tableResizeEndAction: {
          newState = onTableResizeEnd(newState, action);
          break;
        }
        default:
          break;
      }
      return stateReducer
        ? stateReducer(newState, action, previousState, instance)
        : newState;
    },
    [
      hasManualSelectionColumn,
      isRowDisabled,
      onExpand,
      onSelect,
      onSort,
      stateReducer,
    ],
  );

  const filterTypes = React.useMemo(
    () => ({ ...customFilterFunctions, ...filterFunctions }),
    [filterFunctions],
  );

  const hasAnySubRows = React.useMemo(() => {
    return data.some((item, index) =>
      getSubRows ? getSubRows(item, index) : item.subRows,
    );
  }, [data, getSubRows]);

  const getSubRowsWithSubComponents = React.useCallback(
    (originalRow: T, relativeIndex: number) => {
      // If originalRow represents a sub-component, don't add any sub-rows to it
      if (originalRow[iuiId as any]) {
        return [];
      }

      // If sub-rows already exist, return them as they are.
      if (originalRow.subRows) {
        return originalRow.subRows as T[];
      }

      // If originalRow represents the top-most level row, add itself as a sub-row
      // that will represent a subComponent.
      // Add a symbol as a key on this sub-row to distinguish it from the real row.
      // This distinction is needed as the sub-row needs to have all fields of the row
      // since react-table expects even sub-rows to be rows (Row<T>).
      return [
        {
          [iuiId]: `subcomponent-${relativeIndex}`,
          ...originalRow,
        },
      ];
    },
    [],
  );

  /**
   * Gives `subComponent` a unique id since `subComponent` has the same react-table id as its parent row.
   * Avoiding duplicate react-table ids prevents react-table errors.
   */
  const getRowIdWithSubComponents = React.useCallback(
    (originalRow: T, relativeIndex: number, parent?: Row<T>) => {
      const defaultRowId = parent
        ? `${parent.id}.${relativeIndex}`
        : `${relativeIndex}`;
      const rowIdFromUser = getRowId?.(originalRow, relativeIndex, parent);
      // If the row contains the Symbol, it indicates that the current row is a sub-component row.
      // We need to append the ID passed by user with its according sub-component ID.
      if (rowIdFromUser !== undefined && originalRow[iuiId as any]) {
        return `${rowIdFromUser}-${defaultRowId}`;
      }

      return rowIdFromUser ?? defaultRowId;
    },
    [getRowId],
  );

  const instance = useTable<T>(
    {
      manualPagination: manualPagination ?? !paginatorRenderer, // Prevents from paginating rows in regular table without pagination
      paginateExpandedRows: paginateExpandedRows ?? false, // When false, it shows sub-rows in the current page instead of splitting them
      useControlledState,
      autoResetExpanded,
      autoResetFilters,
      autoResetGlobalFilter,
      autoResetHiddenColumns,
      autoResetPage,
      autoResetResize,
      autoResetSelectedRows,
      autoResetSortBy,
      defaultCanFilter,
      defaultCanSort,
      disableFilters,
      disableGlobalFilter,
      disableMultiSort,
      disableSortRemove,
      disabledMultiRemove,
      expandSubRows,
      globalFilter,
      isMultiSortEvent,
      manualExpandedKey,
      manualFilters,
      manualGlobalFilter,
      manualRowSelectedKey,
      manualSortBy,
      maxMultiSortColCount,
      orderByFn,
      pageCount: pageCount ?? -1,
      sortTypes,
      columns,
      defaultColumn,
      disableSortBy: !isSortable,
      stateReducer: tableStateReducer,
      filterTypes,
      selectSubRows,
      data,
      getSubRows: subComponent ? getSubRowsWithSubComponents : getSubRows,
      initialState: { pageSize, ...initialState },
      columnResizeMode,
      getRowId: subComponent ? getRowIdWithSubComponents : getRowId, // only call this wrapper function when sub-component is present
    },
    useFlexLayout,
    useResizeColumns(ownerDocument),
    useFilters,
    useSubRowFiltering(hasAnySubRows),
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useSubRowSelection,
    useExpanderCell(subComponent, expanderCell, isRowDisabled),
    useSelectionCell(isSelectable, selectionMode, isRowDisabled, density),
    useColumnOrder,
    useColumnDragAndDrop(enableColumnReordering),
    useStickyColumns,
  );

  const {
    getTableProps,
    rows,
    headerGroups: _headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    allColumns,
    dispatch,
    page,
    gotoPage,
    setPageSize,
    flatHeaders,
    setGlobalFilter,
  } = instance;

  let headerGroups = _headerGroups;

  const logWarning = useWarningLogger();

  if (columns.length === 1 && 'columns' in columns[0]) {
    headerGroups = _headerGroups.slice(1);
    if (process.env.NODE_ENV === 'development') {
      logWarning(
        `Table's \`columns\` prop should not have a top-level \`Header\` or sub-columns. They are only allowed to be passed for backwards compatibility.\n See https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v2-migration-guide#breaking-changes`,
      );
    }
  }

  if (
    process.env.NODE_ENV === 'development' &&
    subComponent &&
    data.some((item) => !!(item.subRows as T[] | undefined)?.length)
  ) {
    logWarning(
      `Passing both \`subComponent\` and \`data\` with \`subRows\` is not supported. There are features designed for \`subRows\` that are not compatible with \`subComponent\` and vice versa.`,
    );
  }

  const areFiltersSet =
    allColumns.some(
      (column) => column.filterValue != null && column.filterValue !== '',
    ) || !!globalFilterValue;

  const onRowClickHandler = React.useCallback(
    (event: React.MouseEvent, row: Row<T>) => {
      const isDisabled = isRowDisabled?.(row.original);
      const ctrlPressed = event.ctrlKey || event.metaKey;

      if (!isDisabled) {
        onRowClick?.(event, row);
      }
      if (
        isSelectable &&
        !isDisabled &&
        selectRowOnClick &&
        !event.isDefaultPrevented()
      ) {
        if (selectionMode === 'multi' && event.shiftKey) {
          dispatch({
            type: shiftRowSelectedAction,
            id: row.id,
            ctrlPressed: ctrlPressed,
          });
        } else if (
          !row.isSelected &&
          (selectionMode === 'single' || !ctrlPressed)
        ) {
          dispatch({
            type: singleRowSelectedAction,
            id: row.id,
          });
        } else {
          row.toggleRowSelected(!row.isSelected);
        }
      }
    },
    [
      isRowDisabled,
      isSelectable,
      selectRowOnClick,
      selectionMode,
      dispatch,
      onRowClick,
    ],
  );

  React.useEffect(() => {
    setGlobalFilter(globalFilterValue);
  }, [globalFilterValue, setGlobalFilter]);

  React.useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize, setPageSize]);

  React.useEffect(() => {
    if (previousFilter.current !== currentFilter.current) {
      previousFilter.current = currentFilter.current;
      onFilter?.(currentFilter.current, state, instance.filteredRows);
    }
  }, [state, instance.filteredRows, onFilter]);

  const lastPassedColumns = React.useRef([] as Column<T>[]);

  // Reset the column order whenever new columns are passed
  // This is to avoid the old columnOrder from affecting the new columns' columnOrder
  React.useEffect(() => {
    // Check if columns have changed (by value)
    if (
      lastPassedColumns.current.length > 0 &&
      JSON.stringify(lastPassedColumns.current) !== JSON.stringify(columns)
    ) {
      instance.setColumnOrder([]);
    }
    lastPassedColumns.current = columns;
  }, [columns, instance]);

  const paginatorRendererProps: TablePaginatorRendererProps = React.useMemo(
    () => ({
      currentPage: state.pageIndex,
      pageSize: state.pageSize,
      totalRowsCount: rows.length,
      size: density !== 'default' ? 'small' : 'default',
      isLoading,
      onPageChange: gotoPage,
      onPageSizeChange: setPageSize,
      totalSelectedRowsCount:
        selectionMode === 'single' ? 0 : instance.selectedFlatRows.length, // 0 when selectionMode = 'single' since totalSelectedRowCount is for multi-selection mode only
    }),
    [
      density,
      gotoPage,
      isLoading,
      rows.length,
      setPageSize,
      state.pageIndex,
      state.pageSize,
      instance.selectedFlatRows,
      selectionMode,
    ],
  );

  const tableRef = React.useRef<HTMLDivElement>(null);

  const { scrollToIndex, tableRowRef } = useScrollToRow<T>({
    ...props,
    scrollToRow,
    page,
  });
  const columnRefs = React.useRef<Record<string, HTMLDivElement>>({});
  const previousTableWidth = React.useRef(0);
  const onTableResize = React.useCallback(
    ({ width }: DOMRectReadOnly) => {
      // Handle table properties, but only when table is resizable
      if (!isResizable) {
        return;
      }

      instance.tableWidth = width;
      if (width === previousTableWidth.current) {
        return;
      }
      previousTableWidth.current = width;

      // Update column widths when table was resized
      flatHeaders.forEach((header) => {
        if (columnRefs.current[header.id]) {
          header.resizeWidth =
            columnRefs.current[header.id].getBoundingClientRect().width;
        }
      });

      // If no column was resized then leave table resize handling to the flexbox
      if (Object.keys(state.columnResizing.columnWidths).length === 0) {
        return;
      }

      dispatch({ type: tableResizeStartAction });
    },
    [
      dispatch,
      state.columnResizing.columnWidths,
      flatHeaders,
      instance,
      isResizable,
    ],
  );
  const [resizeRef] = useResizeObserver(onTableResize);

  // Flexbox handles columns resize so we take new column widths before browser repaints.
  useLayoutEffect(() => {
    if (state.isTableResizing) {
      const newColumnWidths: Record<string, number> = {};
      flatHeaders.forEach((column) => {
        if (columnRefs.current[column.id]) {
          newColumnWidths[column.id] =
            columnRefs.current[column.id].getBoundingClientRect().width;
        }
      });
      dispatch({ type: tableResizeEndAction, columnWidths: newColumnWidths });
    }
  });

  const { virtualizer, css: virtualizerCss } = useVirtualScroll({
    enabled: enableVirtualization,
    count: page.length,
    getScrollElement: () => tableRef.current,
    estimateSize: () => rowHeight,
    getItemKey: (index) => page[index].id,
    overscan: 1,
  });

  useLayoutEffect(() => {
    if (scrollToIndex) {
      virtualizer.scrollToIndex(scrollToIndex, { align: 'start' });
    }
  }, [virtualizer, scrollToIndex]);

  const getPreparedRow = React.useCallback(
    (
      index: number,
      virtualItem?: VirtualItem,
      virtualizer?: Virtualizer<Element, Element>,
    ) => {
      const row = page[index];
      prepareRow(row);
      const isRowASubComponent = !!row.original[iuiId as any] && !!subComponent;

      if (isRowASubComponent) {
        return (
          <TableExpandableContentMemoized
            key={row.getRowProps().key}
            virtualItem={virtualItem}
            ref={
              enableVirtualization
                ? virtualizer?.measureElement
                : tableRowRef(row)
            }
            isDisabled={!!isRowDisabled?.(row.original)}
          >
            {subComponent(row)}
          </TableExpandableContentMemoized>
        );
      }

      return (
        <TableRowMemoized
          row={row}
          rowProps={rowProps}
          isLast={index === page.length - 1}
          onRowInViewport={onRowInViewportRef}
          onBottomReached={onBottomReachedRef}
          intersectionMargin={intersectionMargin}
          state={state}
          key={row.getRowProps().key}
          onClick={onRowClickHandler}
          subComponent={subComponent}
          isDisabled={!!isRowDisabled?.(row.original)}
          tableHasSubRows={hasAnySubRows}
          tableInstance={instance}
          expanderCell={expanderCell}
          scrollContainerRef={tableRef.current}
          tableRowRef={enableVirtualization ? undefined : tableRowRef(row)}
          density={density}
          virtualItem={virtualItem}
          virtualizer={virtualizer}
        />
      );
    },
    [
      page,
      prepareRow,
      subComponent,
      rowProps,
      onRowInViewportRef,
      onBottomReachedRef,
      intersectionMargin,
      state,
      onRowClickHandler,
      isRowDisabled,
      hasAnySubRows,
      instance,
      expanderCell,
      enableVirtualization,
      tableRowRef,
      density,
    ],
  );

  const updateStickyState = () => {
    if (!tableRef.current || flatHeaders.every((header) => !header.sticky)) {
      return;
    }

    if (tableRef.current.scrollLeft !== 0) {
      dispatch({ type: TableActions.setScrolledRight, value: true });
    } else {
      dispatch({ type: TableActions.setScrolledRight, value: false });
    }

    // If scrolled a bit to the left looking from the right side
    if (
      tableRef.current.scrollLeft !==
      tableRef.current.scrollWidth - tableRef.current.clientWidth
    ) {
      dispatch({ type: TableActions.setScrolledLeft, value: true });
    } else {
      dispatch({ type: TableActions.setScrolledLeft, value: false });
    }
  };

  React.useEffect(() => {
    updateStickyState();
    // Call only on init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captionId = useId();

  return (
    <TableInstanceContext.Provider
      value={instance as TableInstance<Record<string, unknown>>}
    >
      <Box
        ref={useMergedRefs<HTMLDivElement>(
          tableRef,
          resizeRef,
          React.useCallback((element: HTMLDivElement) => {
            ownerDocument.current = element?.ownerDocument;
          }, []),
        )}
        id={id}
        {...getTableProps({
          className: cx('iui-table', className),
          style: {
            minWidth: 0, // Overrides the min-width set by the react-table but when we support horizontal scroll it is not needed
            ...style,
          },
        })}
        role={role} // To remove the role="table" from getTableProps()
        onScroll={() => updateStickyState()}
        data-iui-size={density === 'default' ? undefined : density}
        {...outerAriaRestAttributes}
        {...nonAriaRestAttributes}
      >
        <ShadowRoot>
          {/* Inner wrapper with role="table" to only include table elements */}
          <div
            role='table'
            {...innerAriaRestAttributes}
            {...tableProps}
            aria-labelledby={captionId}
          >
            <VisuallyHidden id={captionId}>{caption}</VisuallyHidden>

            <slot name='iui-table-header-wrapper' />
            <slot name='iui-table-body' />
          </div>

          {/* Non-table elements (e.g. paginator, loading indicator, empty state) should not be within role="table" */}
          <slot name='iui-table-body-extra' />
          <slot />
        </ShadowRoot>

        {headerGroups.map((headerGroup: HeaderGroup<T>) => {
          // There may be a better solution for this, but for now I'm filtering out the placeholder cells using header.id
          headerGroup.headers = headerGroup.headers.filter(
            (header) =>
              !header.id.includes('iui-table-checkbox-selector_placeholder') &&
              !header.id.includes('iui-table-expander_placeholder'),
          );
          const headerGroupProps = headerGroup.getHeaderGroupProps({
            className: 'iui-table-row',
          });
          return (
            <Box
              slot='iui-table-header-wrapper'
              as='div'
              key={headerGroupProps.key}
              {...headerWrapperProps}
              className={cx(
                'iui-table-header-wrapper',
                headerWrapperProps?.className,
              )}
            >
              <Box
                as='div'
                {...headerProps}
                className={cx('iui-table-header', headerProps?.className)}
              >
                <Box {...headerGroupProps} key={headerGroupProps.key}>
                  {headerGroup.headers.map((column, index) => {
                    const dragAndDropProps = column.getDragAndDropProps();
                    return (
                      <ColumnHeader
                        {...dragAndDropProps}
                        key={dragAndDropProps.key || column.id || index}
                        column={column as HeaderGroup<Record<string, unknown>>}
                        areFiltersSet={areFiltersSet}
                        columnHasExpanders={
                          hasAnySubRows &&
                          index ===
                            headerGroup.headers.findIndex(
                              (c) => c.id !== SELECTION_CELL_ID, // first non-selection column is the expander column
                            )
                        }
                        isLast={index === headerGroup.headers.length - 1}
                        isTableEmpty={data.length === 0}
                        isResizable={isResizable}
                        columnResizeMode={columnResizeMode}
                        enableColumnReordering={enableColumnReordering}
                        density={density}
                        ref={(el) => {
                          if (el) {
                            columnRefs.current[column.id] = el;
                          }
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
          );
        })}
        <Box
          slot='iui-table-body'
          as='div'
          {...bodyProps}
          {...getTableBodyProps({
            className: cx(
              'iui-table-body',
              {
                'iui-zebra-striping': styleType === 'zebra-rows',
              },
              bodyProps?.className,
            ),
          })}
          role={undefined} // To remove the role="rowgroup" from getTableBodyProps()
        >
          <ShadowRoot css={virtualizerCss} flush={false}>
            {enableVirtualization && data.length !== 0 ? (
              <div
                data-iui-virtualizer='root'
                style={{ minBlockSize: virtualizer.getTotalSize() }}
              >
                <slot />
              </div>
            ) : (
              <slot />
            )}
          </ShadowRoot>
          {data.length !== 0 && (
            <>
              {enableVirtualization
                ? virtualizer
                    .getVirtualItems()
                    .map((virtualItem) =>
                      getPreparedRow(
                        virtualItem.index,
                        virtualItem,
                        virtualizer,
                      ),
                    )
                : page.map((_, index) => getPreparedRow(index))}
            </>
          )}
        </Box>
        {isLoading && data.length === 0 && (
          <TableBodyExtraWrapper>
            <TableEmptyWrapper {...emptyTableContentProps}>
              <ProgressRadial indeterminate={true} />
            </TableEmptyWrapper>
          </TableBodyExtraWrapper>
        )}
        {!isLoading && data.length === 0 && !areFiltersSet && (
          <TableBodyExtraWrapper>
            <TableEmptyWrapper {...emptyTableContentProps}>
              <div>{emptyTableContent}</div>
            </TableEmptyWrapper>
          </TableBodyExtraWrapper>
        )}
        {!isLoading &&
          (data.length === 0 || rows.length === 0) &&
          areFiltersSet && (
            <TableBodyExtraWrapper>
              <TableEmptyWrapper {...emptyTableContentProps}>
                <div>{emptyFilteredTableContent}</div>
              </TableEmptyWrapper>
            </TableBodyExtraWrapper>
          )}
        {isLoading && data.length !== 0 && (
          <TableBodyExtraWrapper data-iui-loading='true'>
            <ProgressRadial indeterminate size='small' />
          </TableBodyExtraWrapper>
        )}
        {paginatorRenderer?.(paginatorRendererProps)}
      </Box>
    </TableInstanceContext.Provider>
  );
};
if (process.env.NODE_ENV === 'development') {
  Table.displayName = 'Table';
}

// ----------------------------------------------------------------------------

const TableBodyExtraWrapper = React.forwardRef(
  (
    props: React.PropsWithChildren<React.ComponentProps<'div'>>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { children, ...rest } = props;
    return (
      <Box
        as='div'
        ref={ref}
        slot='iui-table-body-extra'
        {...rest}
        className={cx('iui-table-body-extra', rest.className)}
      >
        {children}
      </Box>
    );
  },
);

const TableEmptyWrapper = React.forwardRef(
  (
    props: React.PropsWithChildren<React.ComponentProps<'div'>>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { children, ...rest } = props;
    return (
      <Box
        as='div'
        ref={ref}
        {...rest}
        className={cx('iui-table-empty', rest.className)}
      >
        {children}
      </Box>
    );
  },
);
