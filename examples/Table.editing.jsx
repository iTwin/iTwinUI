/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { EditableCell, DefaultCell, Table } from '@itwin/itwinui-react';

export default () => {
  const [data, setData] = React.useState([
    { product: 'Product 1', price: '$15' },
    { product: 'Product 2', price: '$30' },
    { product: 'Product 3', price: 'Fetching...' },
  ]);

  const onCellEdit = React.useCallback((columnId, value, rowData) => {
    setData((oldData) => {
      const newData = [...oldData];
      const index = oldData.indexOf(rowData);
      const newObject = { ...newData[index] };
      newObject[columnId] = value;
      newData[index] = newObject;
      return newData;
    });
  }, []);

  const cellRenderer = React.useCallback(
    (props) => (
      <>
        {props.cellProps.value !== 'Fetching...' ? (
          <EditableCell {...props} onCellEdit={onCellEdit} />
        ) : (
          <DefaultCell {...props} />
        )}
      </>
    ),
    [onCellEdit],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        cellRenderer,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        cellRenderer,
      },
    ],
    [cellRenderer],
  );

  return (
    <Table
      caption='Products'
      className='demo-container'
      emptyTableContent='No data.'
      columns={columns}
      data={data}
    />
  );
};
