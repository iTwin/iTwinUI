/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Table } from '@itwin/itwinui-react';

export default () => {
  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        price: 15,
        date: '2021-05-31T21:00:00.000Z',
      },
      {
        product: 'Product 2',
        price: 45,
        date: '2021-06-01T21:00:00.000Z',
      },
      {
        product: 'Product 3',
        price: 10,
        date: '2021-06-02T21:00:00.000Z',
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
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
      },
      {
        id: 'date',
        Header: 'Date',
        accessor: 'date',
      },
    ],
    [],
  );

  const [globalFilter, setGlobalFilter] = React.useState('');

  return (
    <div className='demo-container'>
      <Input
        style={{ marginBottom: '5px' }}
        placeholder='Search...'
        value={globalFilter}
        onInput={(e) => setGlobalFilter(e.target.value)}
      />
      <Table
        caption='Products'
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        globalFilterValue={globalFilter}
      />
    </div>
  );
};
