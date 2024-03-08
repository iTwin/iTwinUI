import { Button, Flex, Table, TablePaginator } from '@itwin/itwinui-react';
import { Column, CellProps } from '@itwin/itwinui-react/react-table';
import React from 'react';

const App = () => {
  const data = React.useMemo(
    () =>
      Array.from({ length: 1000 }).map((_, index) => ({
        product: `Product ${index + 1}`,
        price: Math.random() * 100,
        quantity: Math.floor(Math.random() * 2000),
        rating: `${Math.floor(Math.random() * 5) + 1}/5`,
        deliveryTime: Math.floor(Math.random() * 30),
      })),

    // () => [
    //   {
    //     product: 'Product 1',
    //     price: 5,
    //     quantity: 500,
    //     rating: '4/5',
    //     deliveryTime: 5,
    //   },
    //   {
    //     product: 'Product 2',
    //     price: 12,
    //     quantity: 1200,
    //     rating: '1/5',
    //     deliveryTime: 25,
    //   },
    //   {
    //     product: 'Product 3',
    //     price: 2.99,
    //     quantity: 1500,
    //     rating: '3/5',
    //     deliveryTime: 7,
    //   },
    //   {
    //     product: 'Product 4',
    //     price: 20,
    //     quantity: 50,
    //     rating: '4/5',
    //     deliveryTime: 2,
    //   },
    //   {
    //     product: 'Product 5',
    //     price: 1.99,
    //     quantity: 700,
    //     rating: '5/5',
    //     deliveryTime: 1,
    //   },
    //   {
    //     product: 'Product 6',
    //     price: 499,
    //     quantity: 30,
    //     rating: '5/5',
    //     deliveryTime: 20,
    //   },
    //   {
    //     product: 'Product 7',
    //     price: 13.99,
    //     quantity: 130,
    //     rating: '1/5',
    //     deliveryTime: 30,
    //   },
    //   {
    //     product: 'Product 8',
    //     price: 5.99,
    //     quantity: 500,
    //     rating: '4/5',
    //     deliveryTime: 5,
    //   },
    //   {
    //     product: 'Product 9',
    //     price: 12,
    //     quantity: 1200,
    //     rating: '1/5',
    //     deliveryTime: 25,
    //   },
    //   {
    //     product: 'Product 10',
    //     price: 2.99,
    //     quantity: 200,
    //     rating: '3/5',
    //     deliveryTime: 17,
    //   },
    // ],
    [],
  );

  const columns = React.useMemo(
    (): Column[] => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        width: 600,
        // disableReordering: true,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 600,
        // @ts-ignore
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`$${props.value}`}</>;
        },
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        width: 600,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        width: 600,
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        width: 600,
        // @ts-ignore
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`${props.value} day(s)`}</>;
        },
      },
    ],
    [],
  );

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Table
        style={{
          width: '80vw',
          height: '75vh',
        }}
        density='condensed'
        enableColumnReordering
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSelectable
        pageSize={25}
        paginatorRenderer={(props) => (
          <TablePaginator {...props} pageSizeList={[25, 50, 100]} />
        )}
      />
      <NoData />
    </Flex>
  );
};

export default App;

export const NoData = () => {
  type CustomStoryDataType = {
    name: string;
    description: string;
  };

  const columns = React.useMemo(
    (): Column[] => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        width: 1200,
        // disableReordering: true,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 1200,
        // eslint-disable-next-line
        // @ts-ignore
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`$${props.value}`}</>;
        },
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        width: 1200,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        width: 1200,
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        width: 1200,
        // eslint-disable-next-line
        // @ts-ignore
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`${props.value} day(s)`}</>;
        },
      },
    ],
    [],
  );

  return (
    <Table<CustomStoryDataType>
      style={{
        width: '80vw',
        height: '75vh',
      }}
      columns={columns}
      data={[]}
      isLoading={false}
      emptyTableContent='No data.'
    />
  );
};
