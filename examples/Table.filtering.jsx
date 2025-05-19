/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table, tableFilters } from '@itwin/itwinui-react';

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
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
      },
      {
        id: 'date',
        Header: 'Date',
        accessor: 'date',
        Filter: tableFilters.DateRangeFilter(),
      },
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table
        caption='Products'
        columns={columns}
        emptyTableContent='No data.'
        data={data}
      />
    </div>
  );
};
