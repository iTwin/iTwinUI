/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
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

  const menuItems = useCallback((close) => {
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
        minWidth: 150,
        sticky: 'left',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 150,
        Cell: (props) => {
          return <>${props.value}</>;
        },
        sticky: 'left',
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
        Cell: (props) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: () => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              aria-label='More options'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [menuItems],
  );

  return (
    <div
      style={{
        height: '375px',
        maxHeight: '90vh',
        maxWidth: '1000px',
      }}
    >
      <Table
        caption='Products'
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        style={{ height: '100%' }}
        isResizable
      />
    </div>
  );
};
