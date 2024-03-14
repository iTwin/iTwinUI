import * as React from 'react';
import { Table } from '@itwin/itwinui-react';
import type { Column } from '@itwin/itwinui-react/react-table';
import { useSearchParams } from '@remix-run/react';

export default function Resizing() {
  const [searchParams] = useSearchParams();

  const disableResizing = searchParams.get('disableResizing') === 'true';
  const columnResizeMode = searchParams.get('columnResizeMode') || 'fit';
  const maxWidths = searchParams.getAll('maxWidth');
  const minWidths = searchParams.getAll('minWidth');

  return (
    <>
      <Table
        columns={[
          {
            Header: '#',
            accessor: 'index',
            width: 100,
            maxWidth: parseInt(maxWidths[0]) || undefined,
            minWidth: parseInt(minWidths[0]) || undefined,
          },
          {
            Header: 'Name',
            accessor: 'name',
            maxWidth: parseInt(maxWidths[1]) || undefined,
            minWidth: parseInt(minWidths[1]) || undefined,
            disableResizing,
          },
          {
            Header: 'Description',
            accessor: 'description',
            width: '200px',
          },
          {
            Header: 'ID',
            accessor: 'id',
            width: '8rem',
          },
        ]}
        data={data}
        emptyTableContent='No data.'
        isResizable
        isSortable
        columnResizeMode={columnResizeMode}
      />
    </>
  );
}

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
