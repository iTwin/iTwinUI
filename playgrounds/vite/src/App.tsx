import { Anchor, Button, Table } from '@itwin/itwinui-react';
import { useMemo } from 'react';

const App = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'yo',
        columns: [
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
        ],
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return <Table columns={columns} data={data} emptyTableContent='No data.' />;
};

export default App;
