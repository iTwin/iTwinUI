/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const data = [
    { product: 'Product 1', price: '$15' },
    { product: 'Product 2', price: '$45' },
    { product: 'Product 3', price: '$30' },
  ];

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
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        isSortable
      />
    </div>
  );
};
