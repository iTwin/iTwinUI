/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table, TablePaginator } from '@itwin/itwinui-react';

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
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
      },
    ],
    [],
  );

  const pageSizeList = React.useMemo(() => [10, 25, 50], []);
  const paginator = React.useCallback(
    (props) => <TablePaginator {...props} pageSizeList={pageSizeList} />,
    [pageSizeList],
  );

  return (
    <div className='demo-container'>
      <Table
        caption='Products'
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        pageSize={50}
        density='condensed'
        paginatorRenderer={paginator}
        style={{ height: '300px' }}
      />
    </div>
  );
};
