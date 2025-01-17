/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback, type JSX } from 'react';
import type {
  CellProps,
  CellRendererProps,
  Column,
  Row,
  TableInstance,
  TableOptions,
} from '@itwin/itwinui-react/react-table';
import {
  Checkbox,
  Code,
  InputGroup,
  DropdownMenu,
  MenuItem,
  IconButton,
  Table,
  Text,
  tableFilters,
  Tooltip,
  DefaultCell,
  EditableCell,
  TablePaginator,
  ActionColumn,
  Anchor,
  SelectionColumn,
  ExpanderColumn,
  Input,
  Radio,
  ProgressRadial,
  BaseFilter,
} from '@itwin/itwinui-react';
import type {
  TableFilterValue,
  TablePaginatorRendererProps,
} from '@itwin/itwinui-react';
import {
  SvgDetails,
  SvgMore,
  SvgSoundLoud,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';
import type { StoryDecorator } from '@ladle/react';

type TableProps<T extends Record<string, unknown> = Record<string, unknown>> =
  React.ComponentProps<typeof Table<T>>;

export default {
  title: 'Table',
};

export const Basic = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

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
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  ) satisfies Column[];

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  ) as Record<string, unknown>[];

  return <Table columns={columns} data={data} emptyTableContent='No data.' />;
};

export const SelectableSingle = () => {
  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      console.log(`Row clicked: ${JSON.stringify(row.original)}`),
    [],
  );

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
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          return (
            <Anchor
              as='button'
              onClick={(e) => {
                e.stopPropagation(); // prevent row selection when clicking on link
                console.log(props.row.original.name);
              }}
            >
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isSelectable={true}
      onRowClick={onRowClick}
      selectionMode='single'
    />
  );
};

export const SelectableMulti = () => {
  const onSelect = useCallback(
    (rows, state) =>
      console.log(
        `Selected rows: ${JSON.stringify(rows)}, Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps['onSelect']>;

  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      console.log(`Row clicked: ${JSON.stringify(row.original)}`),
    [],
  );

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
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          return (
            <Anchor
              as='button'
              onClick={(e) => {
                e.stopPropagation(); // prevent row selection when clicking on link
                console.log(props.row.original.name);
              }}
            >
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isSelectable={true}
      onSelect={onSelect}
      onRowClick={onRowClick}
      selectionMode='multi'
    />
  );
};

export const Sortable = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

  const onSort = useCallback(
    (state) =>
      console.log(`Sort changed. Table state: ${JSON.stringify(state)}`),
    [],
  ) satisfies NonNullable<TableProps['onSort']>;

  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'ID (Sorts Desc First)',
        accessor: 'id',
        sortDescFirst: true,
      },
      {
        id: 'name',
        Header: 'Name (Sorts Asc First)',
        accessor: 'name',
      },
      {
        id: 'description',
        Header: 'Description Not Sortable',
        accessor: 'description',
        maxWidth: 200,
        disableSortBy: true,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { id: '1', name: 'Name1', description: 'Description1' },
      { id: '3', name: 'Name3', description: 'Description3' },
      { id: '2', name: 'Name2', description: 'Description2' },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isSortable
      onSort={onSort}
    />
  );
};

export const Filters = () => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    ids: number[];
    startDate: Date;
    endDate: string;
  };

  const translatedLabels = React.useMemo(
    () => ({
      filter: 'Filter',
      clear: 'Clear',
      from: 'From',
      to: 'To',
    }),
    [],
  );

  const formatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    [],
  );

  const formatDate = useCallback(
    (date: Date) => {
      return formatter.format(date);
    },
    [formatter],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'index',
        Header: '#',
        accessor: 'index',
        width: 80,
        fieldType: 'number',
        Filter: tableFilters.NumberRangeFilter(translatedLabels),
        filter: 'between',
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        fieldType: 'text',
        Filter: tableFilters.TextFilter(translatedLabels),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        fieldType: 'text',
        Filter: tableFilters.TextFilter(translatedLabels),
        maxWidth: 200,
      },
      {
        id: 'ids',
        Header: 'IDs (enter one of the IDs in the filter)',
        accessor: 'ids',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{props.row.original.ids.join(', ')}</>;
        },
        Filter: tableFilters.TextFilter(translatedLabels),
        filter: 'includes',
      },
      {
        id: 'startDate',
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{formatDate(props.row.original.startDate)}</>;
        },
        Filter: tableFilters.DateRangeFilter({
          translatedLabels,
          showYearSelection: true,
        }),
        filter: 'betweenDate',
      },
      {
        id: 'endDate',
        Header: 'End date',
        // Converting string to Date for filtering
        accessor: (rowData) => new Date(rowData.endDate),
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{formatDate(new Date(props.row.original.endDate))}</>;
        },
        Filter: tableFilters.DateRangeFilter({
          translatedLabels,
          showYearSelection: true,
        }),
        filter: 'betweenDate',
      },
    ],
    [formatDate, translatedLabels],
  ) satisfies Column<TableStoryDataType>[];

  const data = React.useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        ids: [1],
        startDate: new Date('May 1, 2021'),
        endDate: '2021-05-31T21:00:00.000Z',
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        ids: [2, 3, 4],
        startDate: new Date('May 2, 2021'),
        endDate: '2021-06-01T21:00:00.000Z',
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        ids: [3, 4],
        startDate: new Date('May 3, 2021'),
        endDate: '2021-06-02T21:00:00.000Z',
      },
    ],
    [],
  ) satisfies TableStoryDataType[];

  const onFilter = React.useCallback((filters, state, filteredData) => {
    // rowInfo is used due to JSON errors when displaying row data
    let rowInfo = '[';
    filteredData?.forEach((row) => {
      rowInfo += `${JSON.stringify(row.original)},`;
    });
    rowInfo = rowInfo.slice(0, rowInfo.length - 1);
    rowInfo += ']';
    console.log(
      `Filter changed. Filters: ${JSON.stringify(
        filters,
      )}, State: ${JSON.stringify(state)}, Rows: ${rowInfo}`,
    );
  }, []) satisfies NonNullable<TableProps['onFilter']>;

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      onFilter={onFilter}
    />
  );
};

export const GlobalFilter = () => {
  type TableStoryDataType = {
    name: string;
    description: string;
  };

  const onClickHandler = React.useCallback(
    (props: CellProps<TableStoryDataType>) =>
      console.log(props.row.original.name),
    [],
  );

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
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [onClickHandler],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description7' },
      { name: 'Name2', description: 'Description7' },
      { name: 'Name3', description: 'Description8' },
      { name: 'Name4', description: 'Description8' },
      { name: 'Name5', description: 'Description9' },
      { name: 'Name6', description: 'Description9' },
    ],
    [],
  );

  const [globalFilter, setGlobalFilter] = React.useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', margin: '8px 0' }}>
        <Input
          placeholder='Search...'
          value={globalFilter}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(e.target.value)
          }
        />
      </div>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        globalFilterValue={globalFilter}
      />
    </div>
  );
};

export const Expandable = () => {
  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps['onExpand']>;

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
    ],
    [],
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
    (row: Row) => (
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
      subComponent={expandedSubComponent}
      onExpand={onExpand}
      isSelectable
    />
  );
};

export const ExpandableSubrows = () => {
  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps['onExpand']>;

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
        isSelectable
        isSortable
        data={data}
        columns={columns}
        onExpand={onExpand}
      />
    </>
  );
};

export const LazyLoading = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => ({
        name: `Name${start + index}`,
        description: `Description${start + index}`,
      }));
  };

  const [data, setData] = React.useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = React.useState(false);

  const onBottomReached = useCallback(() => {
    console.log('Bottom reached!');
    setIsLoading(true);
    // Simulating request
    setTimeout(() => {
      setData(() => [...data, ...generateData(data.length, data.length + 100)]);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  return (
    <Table
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      onBottomReached={onBottomReached}
      isLoading={isLoading}
      isSortable
      style={{ height: 440, maxHeight: '90vh' }}
      data={data}
      // Prevents from resetting filters and sorting when more data is loaded
      autoResetFilters={false}
      autoResetSortBy={false}
    />
  );
};

export const RowInViewport = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

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
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => ({
          name: `Name${index}`,
          description: `Description${index}`,
        })),
    [],
  );

  const onRowInViewport = useCallback((rowData) => {
    console.log(`Row in view: ${JSON.stringify(rowData)}`);
  }, []) satisfies NonNullable<TableProps['onRowInViewport']>;

  return (
    <>
      <div>
        Demo of <Code>IntersectionObserver</Code> hook that triggers{' '}
        <Code>onRowInViewport</Code> callback once the row is visible.
      </div>
      <div>
        Open{' '}
        <Anchor
          as='button'
          onClick={() =>
            (
              parent.document.querySelector(
                '[id^="tabbutton-actions"]',
              ) as HTMLButtonElement
            )?.click()
          }
        >
          Actions
        </Anchor>{' '}
        tab to see when callback is called and scroll the table.
      </div>
      <br />
      <Table
        columns={columns}
        emptyTableContent='No data.'
        onRowInViewport={onRowInViewport}
        data={data}
      />
    </>
  );
};

export const DisabledRows = () => {
  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      console.log(`Row clicked: ${JSON.stringify(row.original)}`),
    [],
  );

  const isRowDisabled = useCallback(
    (rowData: { name: string; description: string }) => {
      return rowData.name === 'Name2';
    },
    [],
  );

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
        Cell: (props: CellProps<{ name: string; description: string }>) => (
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
    (row: Row) => (
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

export const Loading = () => {
  type CustomStoryDataType = {
    name: string;
    description: string;
  };

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
    ],
    [],
  ) satisfies Column<CustomStoryDataType>[];

  return (
    <Table<CustomStoryDataType>
      columns={columns}
      data={[]}
      isLoading={true}
      emptyTableContent='No data.'
    />
  );
};

export const NoData = () => {
  type CustomStoryDataType = {
    name: string;
    description: string;
  };

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
    ],
    [],
  ) satisfies Column<CustomStoryDataType>[];

  return (
    <Table<CustomStoryDataType>
      columns={columns}
      data={[]}
      isLoading={false}
      emptyTableContent='No data.'
    />
  );
};

export const InitialState = () => {
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
        maxWidth: 200,
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name17', description: 'Description17' },
      { name: 'Name18', description: 'Description18' },
      { name: 'Name19', description: 'Description19' },
      { name: 'Name20', description: 'Description20' },
      { name: 'Name21', description: 'Description21' },
      { name: 'Name22', description: 'Description22' },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isSelectable
      initialState={{
        filters: [{ id: 'name', value: '1' }],
        selectedRowIds: { '0': true, '1': true, '4': true, '5': true },
      }}
    />
  );
};

export const ControlledState = () => {
  type DemoData = {
    id: string;
    name: string;
    description: string;
    subRows: DemoData[];
  };

  const tableInstance = React.useRef<TableInstance<DemoData>>(undefined);
  const [selectedRows, setSelectedRows] = React.useState<DemoData[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<DemoData[]>([]);

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
      },
    ],
    [],
  ) satisfies Column<DemoData>[];

  const data = React.useMemo(
    () => [
      {
        id: '1',
        name: 'Row 1',
        description: 'Description 1',
        subRows: [
          {
            id: '1.1',
            name: 'Row 1.1',
            description: 'Description 1.1',
            subRows: [],
          },
          {
            id: '1.2',
            name: 'Row 1.2',
            description: 'Description 1.2',
            subRows: [
              {
                id: '1.2.1',
                name: 'Row 1.2.1',
                description: 'Description 1.2.1',
                subRows: [],
              },
              {
                id: '1.2.2',
                name: 'Row 1.2.2',
                description: 'Description 1.2.2',
                subRows: [],
              },
              {
                id: '1.2.3',
                name: 'Row 1.2.3',
                description: 'Description 1.2.3',
                subRows: [],
              },
              {
                id: '1.2.4',
                name: 'Row 1.2.4',
                description: 'Description 1.2.4',
                subRows: [],
              },
            ],
          },
          {
            id: '1.3',
            name: 'Row 1.3',
            description: 'Description 1.3',
            subRows: [],
          },
          {
            id: '1.4',
            name: 'Row 1.4',
            description: 'Description 1.4',
            subRows: [],
          },
        ],
      },
      {
        id: '2',
        name: 'Row 2',
        description: 'Description 2',
        subRows: [
          {
            id: '2.1',
            name: 'Row 2.1',
            description: 'Description 2.1',
            subRows: [],
          },
          {
            id: '2.2',
            name: 'Row 2.2',
            description: 'Description 2.2',
            subRows: [],
          },
          {
            id: '2.3',
            name: 'Row 2.3',
            description: 'Description 2.3',
            subRows: [],
          },
        ],
      },
      { id: '3', name: 'Row 3', description: 'Description 3', subRows: [] },
    ],
    [],
  );

  return (
    <>
      <InputGroup label='Control selected rows' style={{ marginBottom: 11 }}>
        {data.map((data, index) => (
          <Checkbox
            key={index}
            label={data.name}
            checked={selectedRows.some((row) => row.name === data.name)}
            onChange={(e) => {
              tableInstance.current?.toggleRowSelected(
                data.id,
                e.target.checked,
              );
            }}
          />
        ))}
      </InputGroup>
      <InputGroup label='Control expanded rows' style={{ marginBottom: 11 }}>
        {data.map((data, index) => (
          <Checkbox
            key={index}
            label={data.name}
            checked={expandedRows.some((row) => row.name === data.name)}
            onChange={(e) => {
              tableInstance.current?.toggleRowExpanded(
                [data.id],
                e.target.checked,
              );
            }}
          />
        ))}
      </InputGroup>
      <Table
        columns={columns}
        emptyTableContent='No data.'
        stateReducer={
          useCallback((newState, action, prevState, instance) => {
            tableInstance.current = instance;
            return newState;
          }, []) satisfies NonNullable<TableOptions<DemoData>['stateReducer']>
        }
        isSelectable
        onSelect={
          useCallback((selected) => {
            setSelectedRows(selected ?? []);
          }, []) satisfies NonNullable<TableProps<DemoData>['onSelect']>
        }
        onExpand={
          useCallback((expanded) => {
            setExpandedRows(expanded ?? []);
          }, []) satisfies NonNullable<TableProps<DemoData>['onExpand']>
        }
        getRowId={
          useCallback((rowData) => rowData.id, []) satisfies NonNullable<
            TableOptions<DemoData>['getRowId']
          >
        }
        data={data}
      />
    </>
  );
};

export const Full = () => {
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(0);

  const [rowRefMap, setRowRefMap] = React.useState<Record<number, HTMLElement>>(
    {},
  );

  const isRowDisabled = useCallback(
    (rowData: { name: string; description: string }) => {
      return rowData.name === 'Name2';
    },
    [],
  );

  const menuItems = useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Filter: tableFilters.TextFilter(),
        disableToggleVisibility: true,
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: () => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              aria-label='More options'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
      },
    ],
    [menuItems],
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
    (row: Row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const rowProps = useCallback(
    (row: Row<{ name: string; description: string }>) => {
      return {
        onMouseEnter: () => {
          console.log(`Hovered over ${row.original.name}`);
          setHoveredRowIndex(row.index);
        },
        ref: (el: HTMLDivElement | null) => {
          if (el) {
            setRowRefMap((r) => {
              r[row.index] = el;
              return r;
            });
          }
        },
      };
    },
    [],
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        subComponent={expandedSubComponent}
        isRowDisabled={isRowDisabled}
        rowProps={rowProps}
        isSelectable
        isSortable
        isResizable
        enableColumnReordering
      />
      <Tooltip
        reference={rowRefMap[hoveredRowIndex]}
        content={`Hovered over ${data[hoveredRowIndex].name}.`}
        placement='bottom'
      />
    </>
  );
};

export const Full2 = () => {
  type TableStoryDataType = {
    product: string;
    price: number;
    quantity: number;
    rating: number;
    deliveryTime: number;
    status: 'positive' | 'negative' | 'warning' | undefined;
    subRows: TableStoryDataType[];
  };

  const generateItem = useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = (index % 4) + 1;
      return {
        product: `Product ${keyValue}`,
        price: ((index % 10) + 1) * 15,
        quantity: ((index % 10) + 1) * 150,
        rating: rating,
        deliveryTime: (index % 15) + 1,
        status:
          rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        subRows:
          depth < 2
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const isRowDisabled = useCallback((rowData: TableStoryDataType) => {
    return rowData.product.endsWith('3');
  }, []);

  const menuItems = useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        Filter: tableFilters.TextFilter(),
        disableToggleVisibility: true,
        disableReordering: true,
        width: 200,
        sticky: 'left',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 200,
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        disableReordering: true,
        sortType: 'number',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>${props.value}</>;
        },
        sticky: 'left',
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
        cellRenderer: (props: CellRendererProps<TableStoryDataType>) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.rating}/5
            </DefaultCell>
          );
        },
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        Filter: tableFilters.NumberRangeFilter(),
        filter: 'between',
        sortType: 'number',
        width: 400,
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: (props: CellProps<TableStoryDataType>) => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              aria-label='More options'
              disabled={isRowDisabled(props.row.original)}
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [isRowDisabled, menuItems],
  ) satisfies Column<TableStoryDataType>[];

  const rowProps = useCallback((row: Row<TableStoryDataType>) => {
    return {
      status: row.original.status satisfies TableStoryDataType['status'],
    };
  }, []);

  const [globalFilterValue, setGlobalFilterValue] = React.useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1000px',
        gap: '8px',
      }}
    >
      <Input
        placeholder='Search...'
        value={globalFilterValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilterValue(e.target.value)
        }
      />
      <div
        style={{
          height: '375px',
          maxHeight: '90vh',
        }}
      >
        <Table
          columns={columns}
          emptyTableContent='No data.'
          isRowDisabled={isRowDisabled}
          isSelectable
          isSortable
          isResizable
          enableColumnReordering
          data={data}
          style={{ height: '100%' }}
          enableVirtualization
          rowProps={rowProps}
          globalFilterValue={globalFilterValue}
        />
      </div>
    </div>
  );
};

export const Localized = () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Filter: tableFilters.TextFilter({
          filter: 'Localized filter',
          clear: 'Localized clear',
        }),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
    ],
    [],
  );

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => ({
        name: `Name${start + index}`,
        description: `Description${start + index}`,
      }));
  };

  const pageSizeList = React.useMemo(() => [50, 100, 150], []);
  const paginator = useCallback(
    (props: TablePaginatorRendererProps) => (
      <TablePaginator
        {...props}
        pageSizeList={pageSizeList}
        localization={{
          pageSizeLabel: (size: number) => `${size} per localized page`,
          rangeLabel: (
            startIndex: number,
            endIndex: number,
            totalRows: number,
            isLoading: boolean,
          ) =>
            isLoading
              ? `${startIndex}-${endIndex} localized`
              : `${startIndex}-${endIndex} of localized ${totalRows}`,
          previousPage: 'Previous localized page',
          nextPage: 'Next localized page',
          goToPageLabel: (page: number) => `Go to localized page ${page}`,
          rowsPerPageLabel: 'Rows per localized page',
          rowsSelectedLabel: (totalSelectedRowsCount: number) =>
            `${totalSelectedRowsCount} localized ${
              totalSelectedRowsCount === 1 ? 'row' : 'rows'
            } selected`,
        }}
      />
    ),
    [pageSizeList],
  );

  return (
    <>
      <Table
        emptyTableContent='No localized data.'
        isSelectable
        isSortable
        columns={columns}
        data={generateData(0, 100)}
        pageSize={50}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
      />
    </>
  );
};

Localized.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const Condensed = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps['onExpand']>;

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
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
    <Table
      isSelectable
      isSortable
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      density='condensed'
      onExpand={onExpand}
    />
  );
};

export const Editable = () => {
  type TableStoryDataType = {
    name: string;
    description: string;
  };

  const [data, setData] = React.useState(() => [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Fetching...' },
  ]);

  const isRowDisabled = useCallback((rowData: TableStoryDataType) => {
    return rowData.name === 'Name2';
  }, []);

  const onCellEdit = useCallback(
    (columnId: string, value: string, rowData: TableStoryDataType) => {
      console.log({ columnId, value, rowData });
      setData((oldData) => {
        const newData = [...oldData];
        const index = oldData.indexOf(rowData);
        const newObject = { ...newData[index] };
        newObject[columnId as keyof TableStoryDataType] = value;
        newData[index] = newObject;
        return newData;
      });
    },
    [],
  );

  const cellRenderer = useCallback(
    (props: CellRendererProps<TableStoryDataType>) => (
      <>
        {!isRowDisabled(props.cellProps.row.original) &&
        props.cellProps.value !== 'Fetching...' ? (
          <EditableCell {...props} onCellEdit={onCellEdit} />
        ) : (
          <DefaultCell {...props} />
        )}
      </>
    ),
    [isRowDisabled, onCellEdit],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer,
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        cellRenderer,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [cellRenderer],
  );

  return (
    <Table
      emptyTableContent='No data.'
      columns={columns}
      data={data}
      isRowDisabled={isRowDisabled}
      isSortable
      isSelectable
      // These flags prevent filters and sorting from resetting
      autoResetFilters={false}
      autoResetSortBy={false}
    />
  );
};

export const WithPaginator = () => {
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
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [],
  );

  type TableStoryDataType = {
    name: string;
    description: string;
    subRows: TableStoryDataType[];
  };

  const generateItem = useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index}` : `${index}`;
      return {
        name: `Name ${keyValue}`,
        description: `Description ${keyValue}`,
        subRows:
          depth < 2
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(5005)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const pageSizeList = React.useMemo(() => [50, 100, 150], []);
  const paginator = useCallback(
    (props: TablePaginatorRendererProps) => (
      <TablePaginator {...props} pageSizeList={pageSizeList} />
    ),
    [pageSizeList],
  );

  return (
    <>
      <Table
        emptyTableContent='No data.'
        isSelectable
        isSortable
        columns={columns}
        data={data}
        pageSize={50}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
      />
    </>
  );
};

WithPaginator.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const WithManualPaginatorAndFilter = () => {
  type RowData = {
    name: string;
    description: string;
  };

  const pageSizeList = React.useMemo(() => [50, 100, 150], []);
  const maxRowsCount = React.useMemo(() => 60000, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSizeList[0]);
  const [filter, setFilter] = React.useState({
    name: '',
    description: '',
  } as RowData);
  const [filteredData, setFilteredData] = React.useState(
    undefined as unknown as RowData[],
  );
  const [totalRowsCount, setTotalRowsCount] = React.useState(maxRowsCount);

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => {
        if (
          filteredData !== undefined &&
          !(filter.name === '' && filter.description === '')
        ) {
          return filteredData[index];
        } else {
          return {
            name: `Name${start + index}`,
            description: `Description${start + index}`,
          };
        }
      });
  };

  const [data, setData] = React.useState(() => generateData(0, 25));

  const isPassFilter = React.useCallback(
    (dataRow: RowData, filter: RowData) => {
      let isPassName = false;
      let isPassDescription = false;
      // check that the name passes a filter, if there is one
      if (!filter.name || (filter.name && dataRow.name.includes(filter.name))) {
        isPassName = true;
      }
      // check that the description passes a filter, if there is one
      if (
        !filter.description ||
        (filter.description && dataRow.description.includes(filter.description))
      ) {
        isPassDescription = true;
      }
      return isPassName && isPassDescription;
    },
    [],
  );

  const generateFilteredData = React.useCallback(
    (filter: RowData) => {
      let dataNumber = 0;
      const dataArray = [];
      let newData = { name: '', description: '' };
      do {
        do {
          newData = {
            name: `Name${dataNumber}`,
            description: `Description${dataNumber}`,
          };
          dataNumber++;
        } while (!isPassFilter(newData, filter) && dataNumber < maxRowsCount);
        if (isPassFilter(newData, filter)) {
          dataArray.push(newData);
        }
      } while (dataNumber < maxRowsCount);

      setFilteredData(dataArray);
      return dataArray;
    },
    [isPassFilter, maxRowsCount],
  );

  const onFilter = React.useCallback(
    (filters: TableFilterValue<Record<string, unknown>>[]) => {
      setFilter({
        name: filters.find((f) => f.id == 'name')?.value ?? '',
        description: filters.find((f) => f.id == 'description')?.value ?? '',
      } as RowData);
      setIsLoading(true);
      setData([]);
      setCurrentPage(0);
      // simulate a filtered request
      setTimeout(() => {
        setIsLoading(false);
        const filteredData = generateFilteredData({
          name: filters.find((f) => f.id === 'name')?.value ?? '',
          description: filters.find((f) => f.id === 'description')?.value ?? '',
        } as RowData);
        setData(filteredData.slice(0, currentPageSize));
        setTotalRowsCount(filteredData.length);
      }, 500);
    },
    [currentPageSize, generateFilteredData],
  );

  const columns = [
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
      maxWidth: 200,
      Filter: tableFilters.TextFilter(),
    },
  ];

  const paginator = useCallback(
    (props: TablePaginatorRendererProps) => (
      <TablePaginator
        {...props}
        onPageChange={(page) => {
          setIsLoading(true);
          setData([]);
          setCurrentPage(page);
          // Simulating a request
          setTimeout(() => {
            setIsLoading(false);
            if (
              filteredData !== undefined &&
              !(filter.name === '' && filter.description === '')
            ) {
              setData(
                filteredData.slice(
                  page * props.pageSize,
                  (page + 1) * props.pageSize,
                ),
              );
            } else {
              setData(
                generateData(
                  page * props.pageSize,
                  (page + 1) * props.pageSize,
                ),
              );
            }
          }, 500);
        }}
        onPageSizeChange={(size) => {
          if (
            filteredData !== undefined &&
            !(filter.name === '' && filter.description === '')
          ) {
            setData(
              filteredData.slice(currentPage * size, (currentPage + 1) * size),
            );
          } else {
            setData(generateData(currentPage * size, (currentPage + 1) * size));
          }
          setCurrentPageSize(size);
          props.onPageSizeChange(size);
        }}
        pageSizeList={pageSizeList}
        currentPage={currentPage}
        isLoading={false}
        // Imagining we know the total count of data items
        totalRowsCount={totalRowsCount}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, pageSizeList, totalRowsCount],
  );

  return (
    <>
      <Table
        emptyTableContent='No data.'
        isLoading={isLoading}
        columns={columns}
        data={data}
        pageSize={25}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
        manualPagination
        onFilter={onFilter}
        manualFilters={true}
      />
    </>
  );
};

WithManualPaginatorAndFilter.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const CustomFilter = () => {
  type RowData = {
    name: string;
    description: string;
  };

  const rowsCount = React.useMemo(() => 100, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(
    undefined as unknown as RowData[],
  );

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => {
        if (filteredData !== undefined && !filter) {
          return filteredData[index];
        } else {
          return {
            name: `Name${start + index}`,
            description: `Description${start + index}`,
          };
        }
      });
  };

  const [data, setData] = React.useState(() => generateData(0, 100));

  const isPassFilter = React.useCallback(
    (dataRow: RowData, filter: RowData) => {
      // check that the name passes a filter, if there is one
      if (!filter.name || (filter.name && dataRow.name.includes(filter.name))) {
        return true;
      }
      return false;
    },
    [],
  );

  const generateFilteredData = React.useCallback(
    (filter: RowData) => {
      let dataNumber = 0;
      const dataArray = [];
      let newData = { name: '', description: '' };
      do {
        do {
          newData = {
            name: `Name${dataNumber}`,
            description: `Description${dataNumber}`,
          };
          dataNumber++;
        } while (!isPassFilter(newData, filter) && dataNumber < rowsCount);
        if (isPassFilter(newData, filter)) {
          dataArray.push(newData);
        }
      } while (dataNumber < rowsCount);

      setFilteredData(dataArray);
      return dataArray;
    },
    [isPassFilter, rowsCount],
  );

  const CustomFilter = () => {
    const handleChange = (isChecked: boolean, filter: string) => {
      setFilter(isChecked ? filter : '');
      setIsLoading(true);
      setData([]);
      // simulate a filtered request
      setTimeout(() => {
        setIsLoading(false);
        const filteredData = generateFilteredData({
          name: isChecked ? filter : '',
          description: '',
        } as RowData);
        setData(filteredData.slice(0, rowsCount));
      }, 500);
    };

    return (
      <BaseFilter style={{ alignItems: 'flex-start' }}>
        <Radio
          label="Contains '3'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '3');
          }}
          checked={filter === '3'}
          autoFocus={filter === '3'} // moving focus to checked radio button when filter dialog opens
        />
        <Radio
          label="Contains '5'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '5');
          }}
          checked={filter === '5'}
          autoFocus={filter === '5'}
        />
        <Radio
          label="Contains '7'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '7');
          }}
          checked={filter === '7'}
          autoFocus={filter === '7'}
        />
        <Radio
          label='No filter'
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '');
          }}
          checked={filter === ''}
          autoFocus={filter === ''}
        />
      </BaseFilter>
    );
  };

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: CustomFilter,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      maxWidth: 200,
    },
  ] satisfies Column<RowData>[];

  return (
    <>
      <Table
        emptyTableContent='No data.'
        isLoading={isLoading}
        columns={columns}
        data={data}
        pageSize={100}
        style={{ height: '100%' }}
        manualPagination
        manualFilters={true}
      />
    </>
  );
};

CustomFilter.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const ResizableColumns = () => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    id: string;
    startDate: Date;
    endDate: Date;
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'index',
        Header: '#',
        accessor: 'index',
        width: 80,
        disableResizing: true,
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
        minWidth: 100,
      },
      {
        id: 'id',
        Header: 'ID',
        accessor: 'id',
        width: 100,
        disableResizing: true,
      },
      {
        id: 'startDate',
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return (
            <>{props.row.original.startDate.toLocaleDateString('en-US')}</>
          );
        },
        width: 100,
        disableResizing: true,
      },
      {
        id: 'endDate',
        Header: 'End date',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{props.row.original.endDate.toLocaleDateString('en-US')}</>;
        },
        maxWidth: 200,
      },
    ],
    [],
  ) satisfies Column<TableStoryDataType>[];

  const data = React.useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        id: '111',
        startDate: new Date('May 1, 2021'),
        endDate: new Date('Jun 1, 2021'),
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        id: '222',
        startDate: new Date('May 2, 2021'),
        endDate: new Date('Jun 2, 2021'),
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        id: '333',
        startDate: new Date('May 3, 2021'),
        endDate: new Date('Jun 3, 2021'),
      },
    ],
    [],
  );

  const [columnResizeMode, setColumnResizeMode] =
    React.useState<TableProps<TableStoryDataType>['columnResizeMode']>('fit');

  return (
    <>
      <InputGroup label='Resize mode' displayStyle='inline'>
        <Radio
          name='choice'
          value='fit'
          onChange={() => setColumnResizeMode('fit')}
          label='fit'
          checked={columnResizeMode === 'fit'}
        />
        <Radio
          name='choice'
          value='expand'
          onChange={() => setColumnResizeMode('expand')}
          label='expand'
          checked={columnResizeMode === 'expand'}
        />
      </InputGroup>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isResizable
        isSortable
        columnResizeMode={columnResizeMode}
      />
    </>
  );
};

export const ZebraStripedRows = () => {
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
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [],
  );

  type TableStoryDataType = {
    name: string;
    description: string;
    subRows: TableStoryDataType[];
  };

  const generateItem = useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index}` : `${index}`;
      return {
        name: `Name ${keyValue}`,
        description: `Description ${keyValue}`,
        subRows:
          depth < 2
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(10)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  return (
    <>
      <Table
        emptyTableContent='No data.'
        isSelectable
        isSortable
        styleType='zebra-rows'
        columns={columns}
        data={data}
        style={{ height: '100%' }}
      />
    </>
  );
};

export const HorizontalScroll = () => {
  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        price: 5,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 2',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 3',
        price: 2.99,
        quantity: 1500,
        rating: '3/5',
        deliveryTime: 7,
      },
      {
        product: 'Product 4',
        price: 20,
        quantity: 50,
        rating: '4/5',
        deliveryTime: 2,
      },
      {
        product: 'Product 5',
        price: 1.99,
        quantity: 700,
        rating: '5/5',
        deliveryTime: 1,
      },
      {
        product: 'Product 6',
        price: 499,
        quantity: 30,
        rating: '5/5',
        deliveryTime: 20,
      },
      {
        product: 'Product 7',
        price: 13.99,
        quantity: 130,
        rating: '1/5',
        deliveryTime: 30,
      },
      {
        product: 'Product 8',
        price: 5.99,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 9',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 10',
        price: 2.99,
        quantity: 200,
        rating: '3/5',
        deliveryTime: 17,
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        minWidth: 400,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 400,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`$${props.value}`}</>;
        },
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        width: 400,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        width: 400,
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        width: 400,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`${props.value} day(s)`}</>;
        },
      },
    ],
    [],
  ) satisfies Column<(typeof data)[0]>[];

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      style={{ height: '100%' }}
    />
  );
};

HorizontalScroll.decorators = [
  (Story) => (
    <div
      style={{
        height: '375px',
        maxHeight: '90vh',
        maxWidth: '1000px',
      }}
    >
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const Virtualized = () => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => console.log(props.row.original.name);

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
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(() => {
    const size = 100000;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        name: `Name${i}`,
        description: `Description${i}`,
      };
    }
    return arr;
  }, []);

  return (
    <Table
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      style={{ maxHeight: '90vh' }}
      data={data}
    />
  );
};

export const ScrollToRow = () => {
  type TableStoryDataType = {
    id: string;
    name: string;
    description: string;
  };
  const onClickHandler = React.useCallback(
    (props: CellProps<TableStoryDataType>) =>
      console.log(props.row.original.name),
    [],
  );

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
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<TableStoryDataType>) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [onClickHandler],
  );

  const data = React.useMemo(() => {
    const size = 100000;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        id: i.toString(),
        name: `Name${i}${i === 12345 ? ' - Scrolled to me!' : ''}`,
        description: `Description${i}${
          i === 12345 ? ' - Scrolled to me!' : ''
        }`,
      };
    }
    return arr;
  }, []);

  return (
    <Table
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      isSortable
      style={{ maxHeight: '90vh' }}
      data={data}
      scrollToRow={React.useCallback(
        (rows: Row<TableStoryDataType>[], data: TableStoryDataType[]) =>
          rows.findIndex((row) => row.original.id === data[12345].id),
        [],
      )}
    />
  );
};

export const VirtualizedSubRows = () => {
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
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [],
  );

  type TableStoryDataType = {
    name: string;
    description: string;
    subRows: TableStoryDataType[];
  };

  const generateItem = useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index}` : `${index}`;
      return {
        name: `Name ${keyValue}`,
        description: `Description ${keyValue}`,
        subRows:
          depth < 2
            ? Array(Math.round(index % 5))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  const data = React.useMemo(
    () =>
      Array(10000)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  return (
    <Table
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      style={{ maxHeight: '90vh' }}
      data={data}
    />
  );
};

export const DraggableColumns = () => {
  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        price: 5,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 2',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 3',
        price: 2.99,
        quantity: 1500,
        rating: '3/5',
        deliveryTime: 7,
      },
      {
        product: 'Product 4',
        price: 20,
        quantity: 50,
        rating: '4/5',
        deliveryTime: 2,
      },
      {
        product: 'Product 5',
        price: 1.99,
        quantity: 700,
        rating: '5/5',
        deliveryTime: 1,
      },
      {
        product: 'Product 6',
        price: 499,
        quantity: 30,
        rating: '5/5',
        deliveryTime: 20,
      },
      {
        product: 'Product 7',
        price: 13.99,
        quantity: 130,
        rating: '1/5',
        deliveryTime: 30,
      },
      {
        product: 'Product 8',
        price: 5.99,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 9',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 10',
        price: 2.99,
        quantity: 200,
        rating: '3/5',
        deliveryTime: 17,
      },
    ],
    [],
  );

  const columns = React.useMemo(
    (): Column[] => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        disableReordering: true,
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`$${props.value}`}</>;
        },
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{`${props.value} day(s)`}</>;
        },
      },
    ],
    [],
  );

  return (
    <Table
      enableColumnReordering
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isSelectable
    />
  );
};

export const CustomizedColumns = () => {
  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps<(typeof data)[number]>['onExpand']>;

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name4', description: 'Description4' },
    ],
    [],
  );

  const isCheckboxDisabled = useCallback((rowData: (typeof data)[number]) => {
    return rowData.name === 'Name1';
  }, []);
  const isExpanderDisabled = useCallback((rowData: (typeof data)[number]) => {
    return rowData.name === 'Name2';
  }, []);
  const isCellDisabled = useCallback((rowData: (typeof data)[number]) => {
    return rowData.name === 'Name3';
  }, []);
  const isRowDisabled = useCallback((rowData: (typeof data)[number]) => {
    return rowData.name === 'Name4';
  }, []);

  const subComponent = useCallback(
    (row: Row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const columns = React.useMemo(
    () => [
      SelectionColumn({
        isDisabled: isCheckboxDisabled,
      }),
      ExpanderColumn({ subComponent, isDisabled: isExpanderDisabled }),
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props) => (
          <DefaultCell<(typeof data)[number]>
            {...props}
            isDisabled={(rowData: (typeof data)[number]) =>
              isCellDisabled(rowData) || isRowDisabled(rowData)
            }
          />
        ),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
    ],
    [
      isCheckboxDisabled,
      subComponent,
      isExpanderDisabled,
      isCellDisabled,
      isRowDisabled,
    ],
  ) satisfies Column<(typeof data)[number]>[];

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      subComponent={subComponent}
      onExpand={onExpand}
      isSelectable
      isRowDisabled={isRowDisabled}
      rowProps={({ index }) => ({
        onClick: (e) => index === 0 && e.preventDefault(),
      })}
    />
  );
};

export const ColumnManager = () => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    id: string;
    startDate: Date;
    endDate: Date;
    price: string;
    color: string;
    stock: number;
    rating: string;
    location: string;
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'index',
        Header: '#',
        accessor: 'index',
        disableToggleVisibility: true,
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
      },
      {
        id: 'id',
        Header: 'ID',
        accessor: 'id',
      },
      {
        id: 'startDate',
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return (
            <>{props.row.original.startDate.toLocaleDateString('en-US')}</>
          );
        },
      },
      {
        id: 'endDate',
        Header: 'End date',
        accessor: 'endDate',
        Cell: (props: CellProps<TableStoryDataType>) => {
          return <>{props.row.original.endDate.toLocaleDateString('en-US')}</>;
        },
      },
      {
        id: 'Price',
        Header: 'Price',
        accessor: 'price',
      },
      {
        id: 'Color',
        Header: 'Color',
        accessor: 'color',
      },
      {
        id: '# in stock',
        Header: '# in stock',
        accessor: 'stock',
      },
      {
        id: 'Rating',
        Header: 'Rating',
        accessor: 'rating',
      },
      {
        id: 'Location',
        Header: 'Location',
        accessor: 'location',
      },
      ActionColumn({
        columnManager: true,
      }),
    ],
    [],
  ) satisfies Column<TableStoryDataType>[];
  const data = React.useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        id: '111',
        startDate: new Date('May 1, 2021'),
        endDate: new Date('Jun 1, 2021'),
        price: '$1.00',
        color: 'Red',
        stock: 10,
        rating: '5/5',
        location: 'Philadelphia, Pennsylvania',
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        id: '222',
        startDate: new Date('May 2, 2021'),
        endDate: new Date('Jun 2, 2021'),
        price: '$2.00',
        color: 'Green',
        stock: 20,
        rating: '4/5',
        location: 'Philadelphia, Pennsylvania',
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        id: '333',
        startDate: new Date('May 3, 2021'),
        endDate: new Date('Jun 3, 2021'),
        price: '$3.00',
        color: 'Green',
        stock: 30,
        rating: '3/5',
        location: 'Philadelphia, Pennsylvania',
      },
      {
        index: 4,
        name: 'Name4',
        description: 'Description4',
        id: '444',
        startDate: new Date('May 4, 2021'),
        endDate: new Date('Jun 4, 2021'),
        price: '$4.00',
        color: 'Yellow',
        stock: 40,
        rating: '2/5',
        location: 'Philadelphia, Pennsylvania',
      },
      {
        index: 5,
        name: 'Name5',
        description: 'Description5',
        id: '555',
        startDate: new Date('May 5, 2021'),
        endDate: new Date('Jun 5, 2021'),
        price: '$5.00',
        color: 'Purple',
        stock: 50,
        rating: '1/5',
        location: 'Philadelphia, Pennsylvania',
      },
    ],
    [],
  );

  return (
    <Table
      isSelectable
      columns={columns}
      data={data}
      emptyTableContent='No data.'
    />
  );
};

export const StickyColumns = () => {
  const data = React.useMemo(
    () => [
      {
        product: 'Product 1',
        price: 5,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 2',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 3',
        price: 2.99,
        quantity: 1500,
        rating: '3/5',
        deliveryTime: 7,
      },
      {
        product: 'Product 4',
        price: 20,
        quantity: 50,
        rating: '4/5',
        deliveryTime: 2,
      },
      {
        product: 'Product 5',
        price: 1.99,
        quantity: 700,
        rating: '5/5',
        deliveryTime: 1,
      },
      {
        product: 'Product 6',
        price: 499,
        quantity: 30,
        rating: '5/5',
        deliveryTime: 20,
      },
      {
        product: 'Product 7',
        price: 13.99,
        quantity: 130,
        rating: '1/5',
        deliveryTime: 30,
      },
      {
        product: 'Product 8',
        price: 5.99,
        quantity: 500,
        rating: '4/5',
        deliveryTime: 5,
      },
      {
        product: 'Product 9',
        price: 12,
        quantity: 1200,
        rating: '1/5',
        deliveryTime: 25,
      },
      {
        product: 'Product 10',
        price: 2.99,
        quantity: 200,
        rating: '3/5',
        deliveryTime: 17,
      },
    ],
    [],
  );

  const menuItems = useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        minWidth: 150,
        sticky: 'left',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        width: 150,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>${props.value}</>;
        },
        sticky: 'left',
      },
      {
        id: 'quantity',
        Header: 'Quantity',
        accessor: 'quantity',
        width: 400,
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        width: 400,
      },
      {
        id: 'deliveryTime',
        Header: 'Delivery Time',
        accessor: 'deliveryTime',
        width: 400,
        Cell: (props: CellProps<(typeof data)[0]>) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: () => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              aria-label='More options'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [menuItems],
  ) satisfies Column<(typeof data)[number]>[];

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      style={{ height: '100%' }}
      isResizable
    />
  );
};

StickyColumns.decorators = [
  (Story) => (
    <div
      style={{
        height: '375px',
        maxHeight: '90vh',
        maxWidth: '1000px',
      }}
    >
      <Story />
    </div>
  ),
] satisfies StoryDecorator[];

export const StatusAndCellIcons = () => {
  type CustomStoryDataType = {
    name: string;
    modified: string;
    size: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    status?: 'positive' | 'negative' | 'warning';
    isLoading?: boolean;
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props: CellRendererProps<CustomStoryDataType>) => (
          <DefaultCell
            {...props}
            startIcon={props.cellProps.row.original.startIcon}
            endIcon={
              props.cellProps.row.original.isLoading ? (
                <ProgressRadial value={40} size='small' />
              ) : (
                props.cellProps.row.original.endIcon
              )
            }
          />
        ),
      },
      {
        id: 'modified',
        Header: 'Modified',
        accessor: 'modified',
        maxWidth: 200,
        cellRenderer: (props: CellRendererProps<CustomStoryDataType>) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            />
          );
        },
      },
      {
        id: 'size',
        Header: 'Size',
        maxWidth: 200,
        accessor: 'size',
      },
    ],
    [],
  ) satisfies Column<CustomStoryDataType>[];

  const data = React.useMemo(
    () => [
      {
        name: 'alfa.mp3',
        modified: 'Just now',
        size: '76 KB',
        isLoading: true,
      },
      {
        name: 'beta.mp3',
        modified: 'Just now',
        size: '15 KB',
        startIcon: <SvgSoundLoud fill='#66c6ff' />,
      },
      {
        name: 'gamma.pdf',
        modified: 'A few moments ago',
        size: '9 MB',
        startIcon: <SvgDetails fill='#dd3e39' />,
        endIcon: <SvgStatusSuccess />,
        status: 'positive',
      },
      {
        name: 'delta.jpg',
        modified: 'A few moments ago',
        size: '963 MB',
        startIcon: <SvgDetails fill='#7957a3' />,
        endIcon: <SvgStatusWarning />,
        status: 'warning',
      },
      {
        name: 'theta.dgn',
        modified: 'A few moments ago',
        size: '64 KB',
        startIcon: <SvgDetails fill='#d16c00' />,
        endIcon: <SvgStatusError />,
        status: 'negative',
      },
    ],
    [],
  ) satisfies CustomStoryDataType[];

  const rowProps = useCallback((row: Row<CustomStoryDataType>) => {
    return {
      status: row.original.status,
      isLoading: row.original.isLoading,
    };
  }, []);

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      selectionMode='multi'
      isSelectable={true}
      rowProps={rowProps}
    />
  );
};
