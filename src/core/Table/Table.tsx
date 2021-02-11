// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/flextables.css';
import React from 'react';
import {
  ColumnInstance,
  HeaderGroup,
  Row,
  TableOptions,
  useFlexLayout,
  useTable,
} from 'react-table';
import { ProgressRadial } from '../ProgressIndicators';
import { useTheme } from '../utils/hooks/useTheme';

/**
 * Table props.
 * columns and data must be memoized.
 */
export type TableProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = TableOptions<T> & {
  isLoading?: boolean;
  emptyTableContent: React.ReactNode;
};

/**
 * Table based on react-table
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
 *   emptyTableContent={'No data.'}
 *   isLoading={false}
 * />
 */
export const Table = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  props: TableProps<T>,
): JSX.Element => {
  const { columns, isLoading, emptyTableContent } = props;

  useTheme();

  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 0,
      minWidth: 0,
      width: 0,
    }),
    [],
  );

  const instance = useTable<T>(
    {
      ...props,
      columns,
      defaultColumn,
    },
    useFlexLayout,
  );

  const {
    getTableProps,
    rows,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    data,
  } = instance;

  const getStyle = (
    column: ColumnInstance<T>,
  ): React.CSSProperties | undefined => {
    const style = {} as React.CSSProperties;
    style.flex = `1 1 145px`;
    if (column.width) {
      const width =
        typeof column.width === 'string' ? column.width : `${column.width}px`;
      style.width = width;
      style.flex = `0 0 ${width}`;
    }
    if (column.maxWidth) {
      style.maxWidth = `${column.maxWidth}px`;
    }
    if (column.minWidth) {
      style.minWidth = `${column.minWidth}px`;
    }
    return style;
  };

  return (
    <div className='iui-tables-table' {...getTableProps()}>
      <div>
        {headerGroups.slice(1).map((headerGroup: HeaderGroup<T>) => {
          const headerGroupProps = headerGroup.getHeaderGroupProps({
            className: 'iui-tables-row',
          });
          return (
            <div {...headerGroupProps} key={headerGroupProps.key}>
              {headerGroup.headers.map((column) => {
                const columnProps = column.getHeaderProps({
                  className: 'iui-tables-cell iui-tables-head',
                  style: getStyle(column),
                });
                return (
                  <div {...columnProps} key={columnProps.key}>
                    {column.render('Header')}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className='iui-tables-body' {...getTableBodyProps()}>
        {!isLoading &&
          data.length !== 0 &&
          rows.map((row: Row<T>) => {
            prepareRow(row);
            const rowProps = row.getRowProps({
              className: 'iui-tables-row',
            });
            return (
              <div {...rowProps} key={rowProps.key}>
                {row.cells.map((cell) => {
                  const cellProps = cell.getCellProps({
                    className: 'iui-tables-cell',
                    style: getStyle(cell.column),
                  });
                  return (
                    <div {...cellProps} key={cellProps.key}>
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        {isLoading && (
          <div className={'iui-tables-message-container'}>
            <ProgressRadial indeterminate={true} />
          </div>
        )}
        {!isLoading && data.length === 0 && (
          <div className={'iui-tables-message-container'}>
            {emptyTableContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
