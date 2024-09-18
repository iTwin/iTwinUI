import { useCallback, useMemo } from 'react';
import * as React from 'react';
import { Divider, Table, Text } from '@itwin/itwinui-react';
import type { Row } from '@itwin/itwinui-react/react-table';

export default function App() {
  const columns = useMemo(
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
  const data = useMemo(() => {
    const size = 100;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        name: `Name${i}`,
        description: `Description${i}`,
        //subRows: [{ name: 'Name', description: 'Description' }],
      };
    }
    return arr;
  }, []);

  const expandedSubComponent = useCallback(
    (row: Row) => (
      <div
        style={{
          padding: 16,
        }}
      >
        <Text>Extra information</Text>
        <pre>
          <code>
            {JSON.stringify(
              {
                values: row.values,
              },
              null,
              2,
            )}
          </code>
        </pre>
      </div>
    ),
    [],
  );

  return (
    <>
      <h1>This is a test table.</h1>
      <Divider style={{ width: '100%', color: 'white', height: '5px' }} />
      <Table
        enableVirtualization
        columns={columns}
        data={data}
        emptyTableContent={'Empty table.'}
        style={{
          marginTop: '10px',
          maxHeight: '90vh',
        }}
        subComponent={expandedSubComponent}
      />
    </>
  );
}
