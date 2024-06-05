import { Table, tableFilters } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';
import React from 'react';

export default function Resizing() {
  const [searchParams] = useSearchParams();

  const disableResizing = searchParams.get('disableResizing') === 'true';
  const columnResizeMode = searchParams.get('columnResizeMode') || 'fit';
  const maxWidths = searchParams.getAll('maxWidth');
  const minWidths = searchParams.getAll('minWidth');
  const isSelectable = searchParams.get('isSelectable') === 'true';
  const subRows = searchParams.get('subRows') === 'true';
  const filter = searchParams.get('filter') === 'true';
  const enableVirtualization = searchParams.get('virtualization') === 'true';
  const empty = searchParams.get('empty') === 'true';

  const virtualizedData = React.useMemo(() => {
    const size = 100000;
    const arr = new Array(size);
    if (!empty) {
      for (let i = 0; i < size; ++i) {
        arr[i] = {
          index: i,
          name: `Name${i}`,
          description: `Description${i}`,
          id: i,
        };
      }
    }
    return arr;
  }, []);

  const data = subRows
    ? [
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
          subRows: [
            {
              index: 2.1,
              name: 'Name2.1',
              description: 'Description2.1',
              id: '223',
            },
            {
              index: 2.2,
              name: 'Name2.2',
              description: 'Description2.2',
              id: '224',
            },
          ],
          id: '222',
        },
        {
          index: 3,
          name: 'Name3',
          description: 'Description3',
          subRows: [
            {
              index: 3.1,
              name: 'Name3.1',
              description: 'Description3.1',
              id: '334',
            },
            {
              index: 3.2,
              name: 'Name3.2',
              description: 'Description3.2',
              id: '335',
            },
          ],
          id: '333',
        },
      ]
    : [
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

  const isRowDisabled = React.useCallback(
    (rowData: Record<string, unknown>) => {
      return rowData.name === 'Name3.2';
    },
    [],
  );

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
            Filter: filter ? tableFilters.TextFilter() : undefined,
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
        data={enableVirtualization ? virtualizedData : data}
        emptyTableContent='No data.'
        isResizable
        isRowDisabled={isRowDisabled}
        isSelectable={isSelectable}
        isSortable
        columnResizeMode={columnResizeMode as 'fit' | 'expand' | undefined}
        enableVirtualization={enableVirtualization}
        style={enableVirtualization ? { maxHeight: '90vh' } : undefined}
      />
    </>
  );
}
