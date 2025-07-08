import React from 'react';
import type { CellProps, Column } from '@itwin/itwinui-react/react-table';
import { Table, ActionColumn } from '@itwin/itwinui-react';

export default function App() {
  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        price: 5,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 2',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 3',
        price: 2.99,
        quantity: 1500,
        rating: '3/5',
        deliveryTime: 7,
      },
      {
        product: 'Product 4',
        price: 20,
        quantity: 50,
        rating: '4/5',
        deliveryTime: 2,
      },
      {
        product: 'Product 5',
        price: 1.99,
        quantity: 700,
        rating: '5/5',
        deliveryTime: 1,
      },
      {
        product: 'Product 6',
        price: 499,
        quantity: 30,
        rating: '5/5',
        deliveryTime: 20,
      },
      {
        product: 'Product 7',
        price: 13.99,
        quantity: 130,
        rating: '1/5',
        deliveryTime: 30,
      },
      {
        product: 'Product 8',
        price: 5.99,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 9',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 10',
        price: 2.99,
        quantity: 200,
        rating: '3/5',
        deliveryTime: 17,
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        minWidth: 150,
        maxWidth: '20%',
        sticky: 'left',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 150,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>${props.value}</>;
        },
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        width: 400,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        width: 400,
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        width: 400,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),

        sticky: 'right',
      },
    ],
    [],
  ) satisfies Column<(typeof data)[number]>[];

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        style={{ height: '100%' }}
        isResizable
      />
    </>
  );
}
