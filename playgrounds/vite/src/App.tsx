import { Table, tableFilters, Code } from '@itwin/itwinui-react';
import React, { useCallback } from 'react';

type TableProps<T extends Record<string, unknown> = Record<string, unknown>> =
  React.ComponentProps<typeof Table<T>>;

const App = () => {
  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps['onExpand']>;

  const isRowDisabled = useCallback((rowData: Record<string, unknown>) => {
    return rowData.name === 'Row 2.2' || rowData.name === 'Row 3';
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Filter: tableFilters.TextFilter(),
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
      subRows: [
        { name: 'Row 1.1', description: 'Description 1.1', subRows: [] },
        {
          name: 'Row 1.2',
          description: 'Description 1.2',
          subRows: [
            {
              name: 'Row 1.2.1',
              description: 'Description 1.2.1',
              subRows: [],
            },
            {
              name: 'Row 1.2.2',
              description: 'Description 1.2.2',
              subRows: [],
            },
            {
              name: 'Row 1.2.3',
              description: 'Description 1.2.3',
              subRows: [],
            },
            {
              name: 'Row 1.2.4',
              description: 'Description 1.2.4',
              subRows: [],
            },
          ],
        },
        { name: 'Row 1.3', description: 'Description 1.3', subRows: [] },
        { name: 'Row 1.4', description: 'Description 1.4', subRows: [] },
      ],
    },
    {
      name: 'Row 2',
      description: 'Description 2',
      subRows: [
        { name: 'Row 2.1', description: 'Description 2.1', subRows: [] },
        { name: 'Row 2.2', description: 'Description 2.2', subRows: [] },
        { name: 'Row 2.3', description: 'Description 2.3', subRows: [] },
      ],
    },
    { name: 'Row 3', description: 'Description 3', subRows: [] },
  ];
  return (
    <>
      <div>
        Each data entry should have <Code>subRows</Code> property. If{' '}
        <Code>subRows</Code> has any items, then expander will be shown for that
        row.
      </div>
      <br />
      <Table
        emptyTableContent='No data.'
        isRowDisabled={isRowDisabled}
        isSelectable
        isSortable
        data={data}
        columns={columns}
        onExpand={onExpand}
      />
    </>
  );
};

export default App;
