import { useCallback, useMemo } from 'react';
import { Table, Text } from '@itwin/itwinui-react';
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
    const size = 1000;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        name: `Name${i}`,
        description: `Description${i}`,
        //subRows: [{ name: `Name${i}.1`, description: `Description${i}.1` }],
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
      <Table
        enableVirtualization
        columns={columns}
        data={data}
        emptyTableContent={'Empty table.'}
        style={{
          maxHeight: '90vh',
        }}
        subComponent={expandedSubComponent}
      />
    </>
  );
}
