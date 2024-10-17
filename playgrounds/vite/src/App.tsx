/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';
import { Row } from '@itwin/itwinui-react/react-table';

export default () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
      },
    ],
    [],
  );
  const data = [
    {
      name: 'Row 1',
      description: 'Description 1',
    },
    {
      name: 'Row 2',
      description: 'Description 2',
    },
    {
      name: 'Row 3',
      description: 'Description 3',
    },
  ];

  const expandedSubComponent = React.useCallback(
    (row: Row) => (
      <div style={{ padding: 16 }}>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  return (
    <Table
      emptyTableContent='No data.'
      isSelectable
      isSortable
      data={data}
      subComponent={expandedSubComponent}
      columns={columns}
    />
  );
};
