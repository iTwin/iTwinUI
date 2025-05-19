/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => ({
          product: `Product ${index + 1}`,
          price: ((index % 10) + 1) * 15,
        })),
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
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table columns={columns} emptyTableContent='No data.' data={data} />
    </div>
  );
};
