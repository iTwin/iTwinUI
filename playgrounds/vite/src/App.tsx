import { Table } from '@itwin/itwinui-react';

export default function App() {
  return (
    <>
      <Table
        columns={[
          {
            Header: '#',
            accessor: 'index',
            width: 100,
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Description',
            accessor: 'description',
            width: '200px',
          },
        ]}
        data={data}
        emptyTableContent='No data.'
        isResizable
      />
    </>
  );
}

const data = [
  {
    index: 1,
    name: 'Name1',
    description: 'Description1',
  },
  {
    index: 2,
    name: 'Name2',
    description: 'Description2',
  },
  {
    index: 3,
    name: 'Name3',
    description: 'Description3',
    subRows: [
      {
        index: 4,
        name: 'Name3.1',
        description: 'Description3.1',
      },
    ],
  },
];
