/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { EditableCell, DefaultCell, Table } from '@itwin/itwinui-react';

export default () => {
  const [data, setData] = React.useState([
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Fetching...' },
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
        cellRenderer,
        accessor: 'product',
      },
      {
        id: 'price',
        Header: 'Price',
        cellRenderer,
        accessor: 'price',
      },
    ],
    [cellRenderer],
  );

  return (
    <div className='demo-container'>
      <Table columns={columns} emptyTableContent='No data.' data={data} />
    </div>
  );
};
