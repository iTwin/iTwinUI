// import "./App.scss";
import { Table } from '@itwin/itwinui-react';
import { useState, useMemo } from 'react';

export default function App() {
  const columns = useMemo(
    () => [
      {
        Header: 'Header',
        columns: [
          {
            id: 'id1',
            accessor: 'id1',
            Header: 'id1',
            width: '20%',
          },
          {
            id: 'id2',
            accessor: 'id2',
            Header: 'id2',
            width: '20%',
          },
          {
            id: 'id3',
            accessor: 'id3',
            Header: 'id3',
            width: '60%',
          },
        ],
      },
    ],
    [],
  );

  const data = [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ];

  return (
    <div className='container'>
      <Table
        isResizable
        columns={columns}
        data={data}
        emptyTableContent='empty'
      />
    </div>
  );
}
