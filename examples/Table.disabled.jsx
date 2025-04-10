/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useCallback } from 'react';
import { Table, Anchor } from '@itwin/itwinui-react';

export default () => {
  const onRowClick = useCallback(
    (event, row) => console.log(`Row clicked: ${JSON.stringify(row.original)}`),
    [],
  );

  const isRowDisabled = useCallback((rowData) => {
    return rowData.name === 'Name2';
  }, []);

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        // Manually handling disabled state in custom cells
        Cell: (props) => (
          <>
            {isRowDisabled(props.row.original) ? (
              <>Click me!</>
            ) : (
              <Anchor
                as='button'
                onClick={() => console.log(props.row.original.name)}
              >
                Click me!
              </Anchor>
            )}
          </>
        ),
      },
    ],
    [isRowDisabled],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  const expandedSubComponent = useCallback(
    (row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      onRowClick={onRowClick}
      subComponent={expandedSubComponent}
      isRowDisabled={isRowDisabled}
      isSelectable
    />
  );
};
