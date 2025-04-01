/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table, tableFilters } from '@itwin/itwinui-react';

export default () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name17', description: 'Description17' },
      { name: 'Name18', description: 'Description18' },
      { name: 'Name19', description: 'Description19' },
      { name: 'Name20', description: 'Description20' },
      { name: 'Name21', description: 'Description21' },
      { name: 'Name22', description: 'Description22' },
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSelectable
        initialState={{
          filters: [{ id: 'name', value: '1' }],
          selectedRowIds: { 0: true, 1: true, 4: true, 5: true },
        }}
      />
    </div>
  );
};
