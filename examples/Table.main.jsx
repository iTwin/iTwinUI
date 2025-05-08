/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Table,
  TablePaginator,
  tableFilters,
  DefaultCell,
} from '@itwin/itwinui-react';

export default () => {
  const generateItem = React.useCallback((index, parentRow = '') => {
    const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
    return {
      product: `Product ${keyValue}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      price: ((index % 10) + 1) * 15,
      stock: (index % 3) * 10,
      status: (index % 3) * 10 === 0 ? 'negative' : undefined,
      height: ((index % 10) + 1) * 10,
      width: ((index % 10) + 1) * 5,
      depth: ((index % 10) + 1) * 2,
      weight: ((index % 10) + 1) * 3,
      volume: ((index % 10) + 1) * 4,
    };
  }, []);

  const data = React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        Filter: tableFilters.TextFilter(),
        minWidth: 150,
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        disableSortBy: true,
        minWidth: 200,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>${props.value}</>;
        },
      },
      {
        id: 'stock',
        Header: 'Stock',
        accessor: 'stock',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        cellRenderer: (props) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.stock}
            </DefaultCell>
          );
        },
      },
      {
        id: 'height',
        Header: 'Height',
        accessor: 'height',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>{props.value}m</>;
        },
      },
      {
        id: 'width',
        Header: 'Width',
        accessor: 'width',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>{props.value}m</>;
        },
      },
      {
        id: 'depth',
        Header: 'Depth',
        accessor: 'depth',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>{props.value}m</>;
        },
      },
      {
        id: 'weight',
        Header: 'Weight',
        accessor: 'weight',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>{props.value}kg</>;
        },
      },
      {
        id: 'volume',
        Header: 'Volume',
        accessor: 'volume',
        minWidth: 150,
        Filter: tableFilters.NumberRangeFilter(),
        Cell: (props) => {
          return <>{props.value} cubic meter</>;
        },
      },
    ],
    [],
  );

  const paginatorRenderer = React.useCallback((props) => {
    return <TablePaginator {...props} />;
  }, []);

  const rowProps = React.useCallback((row) => {
    return {
      status: row.original.status,
    };
  }, []);

  return (
    <div className='demo-container'>
      <Table
        caption='Products'
        className='table'
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        isSelectable
        isResizable
        isSortable
        columnResizeMode='expand'
        paginatorRenderer={paginatorRenderer}
        rowProps={rowProps}
      />
    </div>
  );
};
