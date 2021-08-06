/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  actions as TableActions,
  CellProps,
  ColumnInstance,
  HeaderGroup,
  HeaderProps,
  Hooks,
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
} from 'react-table';
import { Checkbox } from '../Checkbox';
import { ProgressRadial } from '../ProgressIndicators';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/table.css';
import { CommonProps } from '../utils/props';
import SvgSortDown from '@itwin/itwinui-icons-react/cjs/icons/SortDown';
import SvgSortUp from '@itwin/itwinui-icons-react/cjs/icons/SortUp';
import { getCellStyle } from './utils';
import { TableRowMemoized } from './TableRowMemoized';
import { IconButton } from '../Buttons';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import { FilterToggle, TableFilterValue } from './filters';
import { customFilterFunctions } from './filters/customFilterFunctions';

const singleRowSelectedAction = 'singleRowSelected';

/**
 * Table props.
 * columns and data must be memoized.
 */
export type TableProps<
  T extends Record<string, unknown> = Record<string, unknown>
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
   * If you want to use it in older browsers e.g. IE, then you need to have IntersectionObserver polyfill.
   */
  onBottomReached?: () => void;
  /**
   * Callback function when row is in viewport.
   * If you want to use it in older browsers e.g. IE, then you need to have IntersectionObserver polyfill.
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
  onFilter?: (filters: TableFilterValue<T>[], state: TableState<T>) => void;
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
  rowProps?: (row: Row<T>) => React.ComponentPropsWithRef<'div'>;
} & Omit<CommonProps, 'title'>;

/**
 * Table based on [react-table](https://react-table.tanstack.com/docs/api/overview).
 * @example
 * const columns = React.useMemo(() => [
 *  {
 *    Header: 'Header name',
 *    columns: [
 *      {
 *        id: 'name',
 *        Header: 'Name',
 *        accessor: 'name',
 *        width: 90,
 *      },
 *      {
 *        id: 'description',
 *        Header: 'description',
 *        accessor: 'description',
 *        maxWidth: 200,
 *      },
 *      {
 *        id: 'view',
 *        Header: 'view',
 *        Cell: () => {
 *          return <span onClick={onViewClick}>View</span>
 *        },
 *      },
 *    ],
 *  },
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
  T extends Record<string, unknown> = Record<string, unknown>
>(
  props: TableProps<T>,
): JSX.Element => {
  const {
    columns,
    isLoading = false,
    emptyTableContent,
    className,
    style,
    id,
    isSelectable = false,
    onSelect,
    onRowClick,
    isSortable = false,
    onSort,
    stateReducer,
    onBottomReached,
    onRowInViewport,
    intersectionMargin = 300,
    subComponent,
    onExpand,
    onFilter,
    emptyFilteredTableContent,
    filterTypes: filterFunctions,
    expanderCell,
    isRowDisabled,
    rowProps,
    ...rest
  } = props;

  useTheme();

  const [ownerDocument, setOwnerDocument] = React.useState<Document>();

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

  const useExpanderHook = (hooks: Hooks<T>) => {
    if (!subComponent) {
      return;
    }
    hooks.allColumns.push((columns: ColumnInstance<T>[]) => [
      {
        id: 'iui-table-expander',
        disableResizing: true,
        disableGroupBy: true,
        minWidth: 48,
        width: 48,
        maxWidth: 48,
        columnClassName: 'iui-slot',
        cellClassName: 'iui-slot',
        Cell: (props: CellProps<T>) => {
          const { row } = props;
          if (!subComponent(row)) {
            return null;
          } else if (expanderCell) {
            return expanderCell(props);
          } else {
            return (
              <IconButton
                className='iui-row-expander'
                styleType='borderless'
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  row.toggleRowExpanded();
                }}
                disabled={isRowDisabled?.(props.row.original)}
              >
                {<SvgChevronRight />}
              </IconButton>
            );
          }
        },
      },
      ...columns,
    ]);
  };

  const useSelectionHook = (hooks: Hooks<T>) => {
    if (!isSelectable) {
      return;
    }

    hooks.allColumns.push((columns: ColumnInstance<T>[]) => [
      // Let's make a column for selection
      {
        id: 'iui-table-checkbox-selector',
        disableResizing: true,
        disableGroupBy: true,
        minWidth: 48,
        width: 48,
        maxWidth: 48,
        columnClassName: 'iui-slot',
        cellClassName: 'iui-slot',
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => {
          const disabled = instance.rows.every((row) =>
            isRowDisabled?.(row.original),
          );
          const checked = instance.initialRows.every(
            (row) =>
              instance.state.selectedRowIds[row.id] ||
              isRowDisabled?.(row.original),
          );
          return (
            <Checkbox
              {...getToggleAllRowsSelectedProps()}
              checked={checked && !disabled}
              indeterminate={
                !checked &&
                Object.keys(instance.state.selectedRowIds).length > 0
              }
              disabled={disabled}
            />
          );
        },
        Cell: ({ row }: CellProps<T>) => (
          <span onClick={(e) => e.stopPropagation()}>
            <Checkbox
              {...row.getToggleRowSelectedProps()}
              disabled={isRowDisabled?.(row.original)}
            />
          </span>
        ),
      },
      ...columns,
    ]);

    hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
      // Fix the parent group of the selection button to not be resizable
      const selectionGroupHeader = headerGroups[0].headers[0];
      selectionGroupHeader.canResize = false;
    });
  };

  const onFilterHandler = (
    newState: TableState<T>,
    action: ActionType,
    previousState: TableState<T>,
    instance?: TableInstance<T>,
  ) => {
    const previousFilter = previousState.filters.find(
      (f) => f.id === action.columnId,
    );
    if (previousFilter?.value != action.filterValue) {
      const filters = newState.filters.map((f) => {
        const column = instance?.allColumns.find((c) => c.id === f.id);
        return {
          id: f.id,
          value: f.value,
          fieldType: column?.fieldType ?? 'text',
          filterType: column?.filter ?? 'text',
        };
      }) as TableFilterValue<T>[];
      onFilter?.(filters, newState);
    }
  };

  const onSelectHandler = (
    newState: TableState<T>,
    instance?: TableInstance<T>,
  ) => {
    if (!instance?.rows.length) {
      onSelect?.([], newState);
      return;
    }

    const selectedData: T[] = [];
    const newSelectedRowIds = {} as Record<string, boolean>;
    instance.initialRows.forEach((row) => {
      if (newState.selectedRowIds[row.id] && !isRowDisabled?.(row.original)) {
        newSelectedRowIds[row.id] = true;
        selectedData.push(row.original);
      }
    });
    newState.selectedRowIds = newSelectedRowIds;
    onSelect?.(selectedData, newState);
  };

  const onExpandHandler = (
    newState: TableState<T>,
    instance?: TableInstance<T>,
  ) => {
    if (!instance?.rows.length) {
      onExpand?.([], newState);
      return;
    }

    const expandedData: T[] = [];
    instance.rows.forEach((row) => {
      if (newState.expanded[row.id]) {
        expandedData.push(row.original);
      }
    });
    onExpand?.(expandedData, newState);
  };

  const tableStateReducer = (
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
        onFilterHandler(newState, action, previousState, instance);
        break;
      case TableActions.toggleRowExpanded:
      case TableActions.toggleAllRowsExpanded:
        onExpandHandler(newState, instance);
        break;
      case singleRowSelectedAction: {
        newState = {
          ...newState,
          selectedRowIds: { [action.id]: true } as Record<string, boolean>,
        };
      }
      case TableActions.toggleRowSelected:
      case TableActions.toggleAllRowsSelected:
      case TableActions.toggleAllPageRowsSelected: {
        onSelectHandler(newState, instance);
        break;
      }
      default:
        break;
    }
    return stateReducer
      ? stateReducer(newState, action, previousState, instance)
      : newState;
  };

  const instance = useTable<T>(
    {
      ...props,
      columns,
      defaultColumn,
      disableSortBy: !isSortable,
      stateReducer: tableStateReducer,
      filterTypes: { ...customFilterFunctions, ...filterFunctions },
    },
    useFlexLayout,
    useFilters,
    useSortBy,
    useExpanded,
    useRowSelect,
    useExpanderHook,
    useSelectionHook,
  );

  const {
    getTableProps,
    rows,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    data,
    state,
    allColumns,
    filteredFlatRows,
    dispatch,
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

  const areFiltersSet = allColumns.some((column) => !!column.filterValue);

  const onRowClickHandler = React.useCallback(
    (event: React.MouseEvent, row: Row<T>) => {
      const isDisabled = isRowDisabled?.(row.original);
      if (isSelectable && !isDisabled) {
        if (!row.isSelected && !event.ctrlKey) {
          dispatch({
            type: singleRowSelectedAction,
            id: row.id,
          });
        } else {
          row.toggleRowSelected(!row.isSelected);
        }
      }
      !isDisabled && onRowClick?.(event, row);
    },
    [dispatch, isSelectable, onRowClick, isRowDisabled],
  );

  return (
    <div
      ref={(element) => setOwnerDocument(element?.ownerDocument)}
      id={id}
      {...getTableProps({
        className: cx('iui-table', className),
        style,
      })}
      {...ariaDataAttributes}
    >
      <div className='iui-table-header'>
        {headerGroups.slice(1).map((headerGroup: HeaderGroup<T>) => {
          const headerGroupProps = headerGroup.getHeaderGroupProps({
            className: 'iui-row',
          });
          return (
            <div {...headerGroupProps} key={headerGroupProps.key}>
              {headerGroup.headers.map((column) => {
                const columnProps = column.getHeaderProps({
                  ...column.getSortByToggleProps(),
                  className: cx(
                    'iui-cell',
                    { 'iui-actionable': column.canSort },
                    { 'iui-sorted': column.isSorted },
                    column.columnClassName,
                  ),
                  style: { ...getCellStyle(column) },
                });
                return (
                  <div {...columnProps} key={columnProps.key} title={undefined}>
                    {column.render('Header')}
                    {!isLoading && (data.length != 0 || areFiltersSet) && (
                      <FilterToggle
                        column={column}
                        ownerDocument={ownerDocument}
                      />
                    )}
                    {!isLoading && data.length != 0 && column.canSort && (
                      <div className='iui-cell-end-icon'>
                        {column.isSorted && column.isSortedDesc ? (
                          <SvgSortUp
                            className='iui-icon iui-sort'
                            aria-hidden
                          />
                        ) : (
                          <SvgSortDown
                            className='iui-icon iui-sort'
                            aria-hidden
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div {...getTableBodyProps({ className: 'iui-table-body' })}>
        {data.length !== 0 &&
          rows.map((row: Row<T>) => {
            prepareRow(row);
            return (
              <TableRowMemoized
                row={row}
                rowProps={rowProps}
                isLast={row.index === data.length - 1}
                onRowInViewport={onRowInViewportRef}
                onBottomReached={onBottomReachedRef}
                intersectionMargin={intersectionMargin}
                state={state}
                key={row.getRowProps().key}
                onClick={onRowClickHandler}
                subComponent={subComponent}
                isDisabled={!!isRowDisabled?.(row.original)}
              />
            );
          })}
        {isLoading && data.length === 0 && (
          <div className={'iui-table-empty'}>
            <ProgressRadial indeterminate={true} />
          </div>
        )}
        {isLoading && data.length !== 0 && (
          <div className='iui-row'>
            <div className='iui-cell' style={{ justifyContent: 'center' }}>
              <ProgressRadial
                indeterminate={true}
                size='small'
                style={{ float: 'none', marginLeft: 0 }}
              />
            </div>
          </div>
        )}
        {!isLoading && data.length === 0 && !areFiltersSet && (
          <div className={'iui-table-empty'}>{emptyTableContent}</div>
        )}
        {!isLoading &&
          (data.length === 0 || filteredFlatRows.length === 0) &&
          areFiltersSet && (
            <div className={'iui-table-empty'}>{emptyFilteredTableContent}</div>
          )}
      </div>
    </div>
  );
};

export default Table;
