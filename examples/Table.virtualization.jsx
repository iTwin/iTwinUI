/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const generateItem = React.useCallback((index, parentRow = '') => {
    const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
    return {
      product: `Product ${keyValue}`,
      price: ((index % 10) + 1) * 15,
    };
  }, []);

  const data = React.useMemo(
    () =>
      Array(1000)
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
        style={{ height: '300px' }}
        enableVirtualization
      />
    </div>
  );
};
