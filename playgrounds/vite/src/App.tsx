/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Table,
  MenuItem,
  tableFilters,
  DefaultCell,
  ActionColumn,
  DropdownMenu,
  IconButton,
  Input,
} from '@itwin/itwinui-react';
import {
  CellProps,
  CellRendererProps,
  Row,
  Column,
} from '@itwin/itwinui-react/react-table';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  type TableStoryDataType = {
    product: string;
    price: number;
    quantity: number;
    rating: number;
    deliveryTime: number;
    status: 'positive' | 'negative' | 'warning' | undefined;
    subRows: TableStoryDataType[];
  };

  const generateItem = React.useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = (index % 4) + 1;
      return {
        product: `Product ${keyValue}`,
        price: ((index % 10) + 1) * 15,
        quantity: ((index % 10) + 1) * 150,
        rating: rating,
        deliveryTime: (index % 15) + 1,
        status:
          rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        subRows:
          depth < 2
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const isRowDisabled = React.useCallback((rowData: TableStoryDataType) => {
    return rowData.product.endsWith('3');
  }, []);

  const menuItems = React.useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        Filter: tableFilters.TextFilter(),
        disableToggleVisibility: true,
        disableReordering: true,
        width: 200,
        sticky: 'left',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 200,
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        disableReordering: true,
        sortType: 'number',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>${props.value}</>;
        },
        sticky: 'left',
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
        cellRenderer: (props: CellRendererProps<TableStoryDataType>) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.rating}/5
            </DefaultCell>
          );
        },
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: (props: CellProps<TableStoryDataType>) => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              aria-label='More options'
              disabled={isRowDisabled(props.row.original)}
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [isRowDisabled, menuItems],
  ) satisfies Column<TableStoryDataType>[];

  const rowProps = React.useCallback((row: Row<TableStoryDataType>) => {
    return {
      status: row.original.status satisfies TableStoryDataType['status'],
    };
  }, []);

  const [globalFilterValue, setGlobalFilterValue] = React.useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1000px',
        gap: '8px',
      }}
    >
      <Input
        placeholder='Search...'
        value={globalFilterValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilterValue(e.target.value)
        }
      />
      <div
        style={{
          height: '375px',
          maxHeight: '90vh',
        }}
      >
        <Table
          columns={columns}
          emptyTableContent='No data.'
          isRowDisabled={isRowDisabled}
          isSelectable
          isSortable
          isResizable
          enableColumnReordering
          data={data}
          style={{ height: '100%' }}
          enableVirtualization
          rowProps={rowProps}
          globalFilterValue={globalFilterValue}
        />
      </div>
    </div>
  );
};
