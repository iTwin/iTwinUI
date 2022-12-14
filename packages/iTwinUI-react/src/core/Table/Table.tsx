/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  actions as TableActions,
  CellProps,
  HeaderGroup,
  TableOptions,
  Row,
  TableState,
  useFlexLayout,
  useFilters,
  useRowSelect,
  useSortBy,
  useTable,
  ActionType,
  TableInstance,
  useExpanded,
  usePagination,
  useColumnOrder,
  Column,
  useGlobalFilter,
} from 'react-table';
import { ProgressRadial } from '../ProgressIndicators';
import {
  useTheme,
  CommonProps,
  useResizeObserver,
  SvgSortDown,
  SvgSortUp,
  useIsomorphicLayoutEffect,
} from '../utils';
import '@itwin/itwinui-css/css/table.css';
import { getCellStyle, getStickyStyle } from './utils';
import { TableRowMemoized } from './TableRowMemoized';
import { FilterToggle, TableFilterValue } from './filters';
import { customFilterFunctions } from './filters/customFilterFunctions';
import {
  useExpanderCell,
  useSelectionCell,
  useSubRowFiltering,
  useSubRowSelection,
  useResizeColumns,
  useColumnDragAndDrop,
  useScrollToRow,
  useStickyColumns,
} from './hooks';
import {
  onExpandHandler,
  onFilterHandler,
  onToggleHandler,
  onShiftSelectHandler,
  onSingleSelectHandler,
  onTableResizeEnd,
  onTableResizeStart,
} from './actionHandlers';
import VirtualScroll from '../utils/components/VirtualScroll';
import { SELECTION_CELL_ID } from './columns';

const singleRowSelectedAction = 'singleRowSelected';
const shiftRowSelectedAction = 'shiftRowSelected';
export const tableResizeStartAction = 'tableResizeStart';
const tableResizeEndAction = 'tableResizeEnd';

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
> = Omit<TableOptions<T>, 'disableSortBy'> & {
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
} & Omit<CommonProps, 'title'>;

// Original type for some reason is missing sub-columns
type ColumnType<T extends Record<string, unknown> = Record<string, unknown>> =
  Column<T> & {
    columns: ColumnType[];
  };
const flattenColumns = (columns: ColumnType[]): ColumnType[] => {
  const flatColumns: ColumnType[] = [];
  columns.forEach((column) => {
    flatColumns.push(column);
    if (column.columns) {
      flatColumns.push(...flattenColumns(column.columns));
    }
  });
  return flatColumns;
};

/**
 * Table based on [react-table](https://react-table.tanstack.com/docs/api/overview).
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
): JSX.Element => {
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
    ...rest
  } = props;

  useTheme();

  const ownerDocument = React.useRef<Document | undefined>();

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 0,
      minWidth: 0,
      width: 0,
    }),
    [],
  );

  // useRef prevents from rerendering when one of these callbacks changes
  const onBottomReachedRef = React.useRef(onBottomReached);
  const onRowInViewportRef = React.useRef(onRowInViewport);
  React.useEffect(() => {
    onBottomReachedRef.current = onBottomReached;
    onRowInViewportRef.current = onRowInViewport;
  }, [onBottomReached, onRowInViewport]);

  const hasManualSelectionColumn = React.useMemo(() => {
    const flatColumns = flattenColumns(columns as ColumnType[]);
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

  const instance = useTable<T>(
    {
      manualPagination: !paginatorRenderer, // Prevents from paginating rows in regular table without pagination
      paginateExpandedRows: false, // When false, it shows sub-rows in the current page instead of splitting them
      ...props,
      columns,
      defaultColumn,
      disableSortBy: !isSortable,
      stateReducer: tableStateReducer,
      filterTypes,
      selectSubRows,
      data,
      getSubRows,
      initialState: { pageSize, ...props.initialState },
      columnResizeMode,
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
    useSelectionCell(isSelectable, selectionMode, isRowDisabled),
    useColumnOrder,
    useColumnDragAndDrop(enableColumnReordering),
    useStickyColumns,
  );

  const {
    getTableProps,
    rows,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    allColumns,
    dispatch,
    page,
    gotoPage,
    setPageSize,
    flatHeaders,
    visibleColumns,
    setGlobalFilter,
  } = instance;
  const ariaDataAttributes = Object.entries(rest).reduce(
    (result, [key, value]) => {
      if (key.startsWith('data-') || key.startsWith('aria-')) {
        result[key] = value;
      }
      return result;
    },
    {} as Record<string, string>,
  );

  const areFiltersSet =
    allColumns.some(
      (column) => column.filterValue != null && column.filterValue !== '',
    ) || !!globalFilterValue;

  const showFilterButton = (column: HeaderGroup<T>) =>
    (data.length !== 0 || areFiltersSet) && column.canFilter;

  const showSortButton = (column: HeaderGroup<T>) =>
    data.length !== 0 && column.canSort;

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
    if (JSON.stringify(lastPassedColumns.current) !== JSON.stringify(columns)) {
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

  const { scrollToIndex, tableRowRef } = useScrollToRow<T>({ ...props, page });
  const columnRefs = React.useRef<Record<string, HTMLDivElement>>({});
  const previousTableWidth = React.useRef(0);
  const onTableResize = React.useCallback(
    ({ width }: DOMRectReadOnly) => {
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
    [dispatch, state.columnResizing.columnWidths, flatHeaders, instance],
  );
  const [resizeRef] = useResizeObserver(onTableResize);

  // Flexbox handles columns resize so we take new column widths before browser repaints.
  useIsomorphicLayoutEffect(() => {
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

  const headerRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  const getPreparedRow = React.useCallback(
    (index: number) => {
      const row = page[index];
      prepareRow(row);
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
          bodyRef={bodyRef.current}
          tableRowRef={enableVirtualization ? undefined : tableRowRef(row)}
        />
      );
    },
    [
      page,
      prepareRow,
      rowProps,
      intersectionMargin,
      state,
      onRowClickHandler,
      subComponent,
      isRowDisabled,
      hasAnySubRows,
      instance,
      expanderCell,
      enableVirtualization,
      tableRowRef,
    ],
  );

  const virtualizedItemRenderer = React.useCallback(
    (index: number) => getPreparedRow(index),
    [getPreparedRow],
  );

  const updateStickyState = () => {
    if (!bodyRef.current || flatHeaders.every((header) => !header.sticky)) {
      return;
    }

    if (bodyRef.current.scrollLeft !== 0) {
      dispatch({ type: TableActions.setScrolledRight, value: true });
    } else {
      dispatch({ type: TableActions.setScrolledRight, value: false });
    }

    // If scrolled a bit to the left looking from the right side
    if (
      bodyRef.current.scrollLeft !==
      bodyRef.current.scrollWidth - bodyRef.current.clientWidth
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

  const isHeaderDirectClick = React.useRef(false);

  return (
    <>
      <div
        ref={(element) => {
          ownerDocument.current = element?.ownerDocument;
          if (isResizable) {
            resizeRef(element);
          }
        }}
        id={id}
        {...getTableProps({
          className: cx('iui-table', className),
          style: {
            minWidth: 0, // Overrides the min-width set by the react-table but when we support horizontal scroll it is not needed
            ...style,
          },
        })}
        data-iui-size={density === 'default' ? undefined : density}
        {...ariaDataAttributes}
      >
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
            <div
              className='iui-table-header-wrapper'
              ref={headerRef}
              onScroll={() => {
                if (headerRef.current && bodyRef.current) {
                  bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
                  updateStickyState();
                }
              }}
              key={headerGroupProps.key}
            >
              <div className='iui-table-header'>
                <div {...headerGroupProps}>
                  {headerGroup.headers.map((column, index) => {
                    const { onClick, ...restSortProps } =
                      column.getSortByToggleProps();
                    const columnProps = column.getHeaderProps({
                      ...restSortProps,
                      className: cx(
                        'iui-table-cell',
                        {
                          'iui-actionable': column.canSort,
                          'iui-sorted': column.isSorted,
                          'iui-table-cell-sticky': !!column.sticky,
                        },
                        column.columnClassName,
                      ),
                      style: {
                        ...getCellStyle(column, !!state.isTableResizing),
                        ...getStickyStyle(column, visibleColumns),
                        flexWrap: 'unset',
                      },
                    });
                    return (
                      <div
                        {...columnProps}
                        {...column.getDragAndDropProps()}
                        key={columnProps.key}
                        title={undefined}
                        ref={(el) => {
                          if (el) {
                            columnRefs.current[column.id] = el;
                            column.resizeWidth =
                              el.getBoundingClientRect().width;
                          }
                        }}
                        onMouseDown={() => {
                          isHeaderDirectClick.current = true;
                        }}
                        onClick={(e) => {
                          // Prevents from triggering sort when resizing and mouse is released in the middle of header
                          if (isHeaderDirectClick.current) {
                            onClick?.(e);
                            isHeaderDirectClick.current = false;
                          }
                        }}
                        tabIndex={showSortButton(column) ? 0 : undefined}
                        onKeyDown={(e) => {
                          if (e.key == 'Enter' && showSortButton(column)) {
                            column.toggleSortBy();
                          }
                        }}
                      >
                        {column.render('Header')}
                        {(showFilterButton(column) ||
                          showSortButton(column)) && (
                          <div className='iui-table-header-actions-container'>
                            {showFilterButton(column) && (
                              <FilterToggle column={column} />
                            )}
                            {showSortButton(column) && (
                              <div className='iui-table-cell-end-icon'>
                                {column.isSortedDesc ||
                                (!column.isSorted && column.sortDescFirst) ? (
                                  <SvgSortDown
                                    className='iui-table-sort'
                                    aria-hidden
                                  />
                                ) : (
                                  <SvgSortUp
                                    className='iui-table-sort'
                                    aria-hidden
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        {isResizable &&
                          column.isResizerVisible &&
                          (index !== headerGroup.headers.length - 1 ||
                            columnResizeMode === 'expand') && (
                            <div
                              {...column.getResizerProps()}
                              className='iui-table-resizer'
                            >
                              <div className='iui-table-resizer-bar' />
                            </div>
                          )}
                        {enableColumnReordering &&
                          !column.disableReordering && (
                            <div className='iui-table-reorder-bar' />
                          )}
                        {column.sticky === 'left' &&
                          state.sticky.isScrolledToRight && (
                            <div className='iui-table-cell-shadow-right' />
                          )}
                        {column.sticky === 'right' &&
                          state.sticky.isScrolledToLeft && (
                            <div className='iui-table-cell-shadow-left' />
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div
          {...getTableBodyProps({
            className: cx('iui-table-body', {
              'iui-zebra-striping': styleType === 'zebra-rows',
            }),
            style: { outline: 0 },
          })}
          ref={bodyRef}
          onScroll={() => {
            if (headerRef.current && bodyRef.current) {
              headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
              updateStickyState();
            }
          }}
          tabIndex={-1}
          aria-multiselectable={
            (isSelectable && selectionMode === 'multi') || undefined
          }
        >
          {data.length !== 0 && (
            <>
              {enableVirtualization ? (
                <VirtualScroll
                  itemsLength={page.length}
                  itemRenderer={virtualizedItemRenderer}
                  scrollToIndex={scrollToIndex}
                />
              ) : (
                page.map((_, index) => getPreparedRow(index))
              )}
            </>
          )}
          {isLoading && data.length === 0 && (
            <div className='iui-table-empty'>
              <ProgressRadial indeterminate={true} />
            </div>
          )}
          {isLoading && data.length !== 0 && (
            <div className='iui-table-row'>
              <div
                className='iui-table-cell'
                style={{ justifyContent: 'center' }}
              >
                <ProgressRadial
                  indeterminate={true}
                  size='small'
                  style={{ float: 'none', marginLeft: 0 }}
                />
              </div>
            </div>
          )}
          {!isLoading && data.length === 0 && !areFiltersSet && (
            <div className='iui-table-empty'>
              <div>{emptyTableContent}</div>
            </div>
          )}
          {!isLoading &&
            (data.length === 0 || rows.length === 0) &&
            areFiltersSet && (
              <div className='iui-table-empty'>
                <div>{emptyFilteredTableContent}</div>
              </div>
            )}
        </div>
        {paginatorRenderer?.(paginatorRendererProps)}
      </div>
    </>
  );
};

export default Table;
