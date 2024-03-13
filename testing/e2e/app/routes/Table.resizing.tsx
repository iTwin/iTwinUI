import * as React from 'react';
import { Table } from '@itwin/itwinui-react';
import type { Column } from '@itwin/itwinui-react/react-table';

export default function Resizing() {
  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isResizable
        isSortable
        // columnResizeMode={columnResizeMode}
      />
    </>
  );
}

const columns = [
  {
    id: 'index',
    Header: '#',
    accessor: 'index',
    width: 100,
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name',
  },
  {
    id: 'description',
    Header: 'Description',
    accessor: 'description',
    fieldType: 'text',
    width: '200px',
    disableResizing: true,
  },
  {
    id: 'id',
    Header: 'ID',
    accessor: 'id',
    width: '8rem',
    maxWidth: 300,
  },
] satisfies Column<{
  index: number;
  name: string;
  description: string;
  id: string;
}>[];

const data = [
  {
    index: 1,
    name: 'Name1',
    description: 'Description1',
    id: '111',
  },
  {
    index: 2,
    name: 'Name2',
    description: 'Description2',
    id: '222',
  },
  {
    index: 3,
    name: 'Name3',
    description: 'Description3',
    id: '333',
  },
];
