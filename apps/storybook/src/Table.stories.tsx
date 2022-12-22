/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import type {
  ActionType,
  CellProps,
  CellRendererProps,
  Column,
  Row,
  TableInstance,
  TableState,
} from 'react-table';
import { actions } from 'react-table';
import {
  Checkbox,
  Code,
  InputGroup,
  DropdownMenu,
  MenuItem,
  IconButton,
  Table,
  Leading,
  tableFilters,
  TableFilterValue,
  TableProps,
  Tooltip,
  DefaultCell,
  EditableCell,
  TablePaginator,
  TablePaginatorRendererProps,
  ActionColumn,
  Anchor,
  SelectionColumn,
  ExpanderColumn,
  Input,
  Radio,
  ProgressRadial,
} from '@itwin/itwinui-react';
import { Story, Meta } from '@storybook/react';
import { useMemo, useState } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import {
  SvgDetails,
  SvgMore,
  SvgSoundLoud,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'Core/Table',
  component: Table,
  args: {
    data: [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    emptyTableContent: 'No data.',
    density: 'default',
    emptyFilteredTableContent: 'No results found. Clear or try another filter.',
  },
  argTypes: {
    columns: { control: { disable: true } },
    isSelectable: { control: { disable: true } },
    selectionMode: { control: { disable: true } },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
    initialState: { table: { disable: true } },
    stateReducer: { table: { disable: true } },
    useControlledState: { table: { disable: true } },
    defaultColumn: { table: { disable: true } },
    getSubRows: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    manualRowSelectedKey: { table: { disable: true } },
    autoResetSelectedRows: { table: { disable: true } },
    selectSubRows: { table: { disable: true } },
    manualSortBy: { table: { disable: true } },
    defaultCanSort: { table: { disable: true } },
    disableMultiSort: { table: { disable: true } },
    isMultiSortEvent: { table: { disable: true } },
    maxMultiSortColCount: { table: { disable: true } },
    disableSortRemove: { table: { disable: true } },
    disabledMultiRemove: { table: { disable: true } },
    orderByFn: { table: { disable: true } },
    sortTypes: { table: { disable: true } },
    autoResetSortBy: { table: { disable: true } },
    autoResetHiddenColumns: { table: { disable: true } },
    autoResetFilters: { table: { disable: true } },
    filterTypes: { table: { disable: true } },
    defaultCanFilter: { table: { disable: true } },
    manualFilters: { table: { disable: true } },
    paginateExpandedRows: { table: { disable: true } },
    expandSubRows: { table: { disable: true } },
    autoResetExpanded: { table: { disable: true } },
    manualExpandedKey: { table: { disable: true } },
  },
} as Meta<TableProps>;

export const Basic: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
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

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      {...args}
    />
  );
};

export const SelectableSingle: Story<Partial<TableProps>> = (args) => {
  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      action(`Row clicked: ${JSON.stringify(row.original)}`)(),
    [],
  );

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          return (
            <Anchor
              onClick={(e) => {
                e.stopPropagation(); // prevent row selection when clicking on link
                action(props.row.original.name)();
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

  const data = useMemo(
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
      {...args}
    />
  );
};

SelectableSingle.args = { isSelectable: true, selectionMode: 'single' };

export const SelectableMulti: Story<Partial<TableProps>> = (args) => {
  const onSelect = useCallback(
    (rows, state) =>
      action(
        `Selected rows: ${JSON.stringify(rows)}, Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      action(`Row clicked: ${JSON.stringify(row.original)}`)(),
    [],
  );

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          return (
            <Anchor
              onClick={(e) => {
                e.stopPropagation(); // prevent row selection when clicking on link
                action(props.row.original.name)();
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

  const data = useMemo(
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
      {...args}
    />
  );
};

SelectableMulti.args = { isSelectable: true, selectionMode: 'multi' };

export const Sortable: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const onSort = useCallback(
    (state) => action(`Sort changed. Table state: ${JSON.stringify(state)}`)(),
    [],
  );

  const columns = useMemo(
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
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
      },
    ],
    [],
  );

  const data = useMemo(
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
      {...args}
    />
  );
};

Sortable.args = {
  data: [
    { id: '1', name: 'Name1', description: 'Description1' },
    { id: '3', name: 'Name3', description: 'Description3' },
    { id: '2', name: 'Name2', description: 'Description2' },
  ],
  isSortable: true,
};

export const Filters: Story<Partial<TableProps>> = (args) => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    ids: number[];
    startDate: Date;
    endDate: string;
  };

  const translatedLabels = useMemo(
    () => ({
      filter: 'Filter',
      clear: 'Clear',
      from: 'From',
      to: 'To',
    }),
    [],
  );

  const formatter = useMemo(
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

  const columns = useMemo(
    (): Column<TableStoryDataType>[] => [
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
        }),
        filter: 'betweenDate',
      },
    ],
    [formatDate, translatedLabels],
  );

  const data = useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        ids: ['1'],
        startDate: new Date('May 1, 2021'),
        endDate: '2021-05-31T21:00:00.000Z',
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        ids: ['2', '3', '4'],
        startDate: new Date('May 2, 2021'),
        endDate: '2021-06-01T21:00:00.000Z',
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        ids: ['3', '4'],
        startDate: new Date('May 3, 2021'),
        endDate: '2021-06-02T21:00:00.000Z',
      },
    ],
    [],
  );

  const onFilter = React.useCallback(
    (
      filters: TableFilterValue<TableStoryDataType>[],
      state: TableState,
      filteredData: Row<{ name: string; description: string }>[],
    ) => {
      // rowInfo is used due to JSON errors when displaying row data
      let rowInfo = '[';
      filteredData.forEach((row) => {
        rowInfo += `${JSON.stringify(row.original)},`;
      });
      rowInfo = rowInfo.slice(0, rowInfo.length - 1);
      rowInfo += ']';
      action(
        `Filter changed. Filters: ${JSON.stringify(
          filters,
        )}, State: ${JSON.stringify(state)}, Rows: ${rowInfo}`,
      )();
    },
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      onFilter={onFilter}
      {...args}
    />
  );
};

Filters.args = {
  data: [
    {
      index: 1,
      name: 'Name1',
      description: 'Description1',
      ids: ['1'],
      startDate: new Date('May 1, 2021'),
      endDate: '2021-05-31T21:00:00.000Z',
    },
    {
      index: 2,
      name: 'Name2',
      description: 'Description2',
      ids: ['2', '3', '4'],
      startDate: new Date('May 2, 2021'),
      endDate: '2021-06-01T21:00:00.000Z',
    },
    {
      index: 3,
      name: 'Name3',
      description: 'Description3',
      ids: ['3', '4'],
      startDate: new Date('May 3, 2021'),
      endDate: '2021-06-02T21:00:00.000Z',
    },
  ],
};

export const GlobalFilter: Story<Partial<TableProps>> = (args) => {
  type TableStoryDataType = {
    name: string;
    description: string;
  };

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const columns = useMemo(
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
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
      },
    ],
    [],
  );

  const data = useMemo<TableStoryDataType[]>(
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

  const [globalFilter, setGlobalFilter] = useState('');

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
        {...args}
      />
    </div>
  );
};

GlobalFilter.args = {
  data: [
    { name: 'Name1', description: 'Description7' },
    { name: 'Name2', description: 'Description7' },
    { name: 'Name3', description: 'Description8' },
    { name: 'Name4', description: 'Description8' },
    { name: 'Name5', description: 'Description9' },
    { name: 'Name6', description: 'Description9' },
  ],
};

export const Expandable: Story<Partial<TableProps>> = (args) => {
  const onExpand = useCallback(
    (rows, state) =>
      action(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

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
        maxWidth: 200,
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

  const expandedSubComponent = useCallback(
    (row: Row) => (
      <div style={{ padding: 16 }}>
        <Leading>Extra information</Leading>
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
      {...args}
    />
  );
};

Expandable.args = {
  isSelectable: true,
};

export const ExpandableSubrows: Story<Partial<TableProps>> = (args) => {
  const onExpand = useCallback(
    (rows, state) =>
      action(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const columns = useMemo(
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
        {...args}
        onExpand={onExpand}
      />
    </>
  );
};

ExpandableSubrows.args = {
  data: [
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
  ],
};

export const LazyLoading: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const columns = useMemo(
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
          return <Anchor onClick={onClick}>Click me!</Anchor>;
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

  const [data, setData] = useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = useState(false);

  const onBottomReached = useCallback(() => {
    action('Bottom reached!')();
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
      {...args}
      style={{ height: 440, maxHeight: '90vh' }}
      data={data}
      // Prevents from resetting filters and sorting when more data is loaded
      autoResetFilters={false}
      autoResetSortBy={false}
    />
  );
};

LazyLoading.args = {
  isSortable: true,
};

LazyLoading.argTypes = {
  isLoading: { control: { disable: true } },
};

export const RowInViewport: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
      },
    ],
    [],
  );

  const data = useMemo(
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
    action(`Row in view: ${JSON.stringify(rowData)}`)();
  }, []);

  return (
    <>
      <div>
        Demo of <Code>IntersectionObserver</Code> hook that triggers{' '}
        <Code>onRowInViewport</Code> callback once the row is visible.
      </div>
      <div>
        Open{' '}
        <Anchor
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
        {...args}
        data={data}
      />
    </>
  );
};

RowInViewport.argTypes = {
  data: { control: { disable: true } },
};

export const DisabledRows: Story<Partial<TableProps>> = (args) => {
  const onRowClick = useCallback(
    (event: React.MouseEvent, row: Row) =>
      action(`Row clicked: ${JSON.stringify(row.original)}`)(),
    [],
  );

  const isRowDisabled = useCallback(
    (rowData: { name: string; description: string }) => {
      return rowData.name === 'Name2';
    },
    [],
  );

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
              <Anchor onClick={action(props.row.original.name)}>
                Click me!
              </Anchor>
            )}
          </>
        ),
      },
    ],
    [isRowDisabled],
  );

  const data = useMemo(
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
        <Leading>Extra information</Leading>
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
      {...args}
    />
  );
};

DisabledRows.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ],
  isSelectable: true,
};

export const Loading: Story<Partial<TableProps>> = (args) => {
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
        maxWidth: 200,
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={[]}
      isLoading={true}
      emptyTableContent='No data.'
      {...args}
    />
  );
};

Loading.args = {
  data: [],
  isLoading: true,
};

export const NoData: Story<Partial<TableProps>> = (args) => {
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
        maxWidth: 200,
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={[]}
      isLoading={false}
      emptyTableContent='No data.'
      {...args}
    />
  );
};

NoData.args = {
  data: [],
};

export const InitialState: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const data = useMemo(
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
      {...args}
    />
  );
};

InitialState.args = {
  data: [
    { name: 'Name17', description: 'Description17' },
    { name: 'Name18', description: 'Description18' },
    { name: 'Name19', description: 'Description19' },
    { name: 'Name20', description: 'Description20' },
    { name: 'Name21', description: 'Description21' },
    { name: 'Name22', description: 'Description22' },
  ],
  initialState: {
    filters: [{ id: 'name', value: '1' }],
    selectedRowIds: { '0': true, '1': true, '4': true, '5': true },
  },
};
InitialState.argTypes = {
  initialState: { table: { disable: false } },
};

export const ControlledState: Story<Partial<TableProps>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

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

  const data = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  const controlledState = useCallback(
    (state) => {
      return {
        ...state,
        selectedRowIds: { ...selectedRows },
      };
    },
    [selectedRows],
  );

  // When using `useControlledState` we are fully responsible for the state part we are modifying.
  // Therefore we want to keep our outside state (`selectedRows`) in sync with inside table state (`state.selectedRowIds`).
  const tableStateReducer = (
    newState: TableState,
    action: ActionType,
    previousState: TableState,
    instance?: TableInstance,
  ): TableState => {
    switch (action.type) {
      case actions.toggleRowSelected: {
        const newSelectedRows = {
          ...selectedRows,
        };
        if (action.value) {
          newSelectedRows[action.id] = true;
        } else {
          delete newSelectedRows[action.id];
        }
        setSelectedRows(newSelectedRows);
        newState.selectedRowIds = newSelectedRows;
        break;
      }
      case actions.toggleAllRowsSelected: {
        if (!instance?.rowsById) {
          break;
        }
        const newSelectedRows = {} as Record<string, boolean>;
        if (action.value) {
          Object.keys(instance.rowsById).forEach(
            (id) => (newSelectedRows[id] = true),
          );
        }
        setSelectedRows(newSelectedRows);
        newState.selectedRowIds = newSelectedRows;
        break;
      }
      default:
        break;
    }
    return newState;
  };

  return (
    <>
      <InputGroup label='Control selected rows' style={{ marginBottom: 11 }}>
        {data.map((data, index) => (
          <Checkbox
            key={index}
            label={data.name}
            checked={selectedRows[index]}
            onChange={(e) => {
              setSelectedRows((rowIds) => {
                const selectedRowIds = { ...rowIds };
                if (e.target.checked) {
                  selectedRowIds[index] = true;
                } else {
                  delete selectedRowIds[index];
                }
                return selectedRowIds;
              });
            }}
          />
        ))}
      </InputGroup>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        useControlledState={controlledState}
        stateReducer={tableStateReducer}
        isSelectable
        {...args}
      />
    </>
  );
};

ControlledState.args = { isSelectable: true };

export const Full: Story<Partial<TableProps>> = (args) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(0);

  const rowRefMap = React.useRef<Record<number, HTMLDivElement>>({});

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

  const columns = useMemo(
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
          <DropdownMenu menuItems={menuItems}>
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
      },
    ],
    [menuItems],
  );

  const data = useMemo(
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
        <Leading>Extra information</Leading>
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
          action(`Hovered over ${row.original.name}`)();
          setHoveredRowIndex(row.index);
        },
        ref: (el: HTMLDivElement | null) => {
          if (el) {
            rowRefMap.current[row.index] = el;
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
        {...args}
      />
      <Tooltip
        reference={rowRefMap.current[hoveredRowIndex]}
        content={`Hovered over ${data[hoveredRowIndex].name}.`}
        placement='bottom'
      />
    </>
  );
};

Full.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ],
  isSelectable: true,
  isSortable: true,
  isResizable: true,
  enableColumnReordering: true,
};

export const Full2: Story<Partial<TableProps>> = (args) => {
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

  const data = useMemo(
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

  const columns = useMemo(
    (): Column<TableStoryDataType>[] => [
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
          <DropdownMenu menuItems={menuItems}>
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
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
  );

  const rowProps = useCallback((row: Row<{ status: string | undefined }>) => {
    return {
      status: row.original.status,
    };
  }, []);

  return (
    <Table
      columns={columns}
      emptyTableContent='No data.'
      isRowDisabled={isRowDisabled}
      isSelectable
      isSortable
      isResizable
      enableColumnReordering
      {...args}
      data={data}
      style={{ height: '100%' }}
      enableVirtualization
      rowProps={rowProps}
    />
  );
};

Full2.args = {
  isSelectable: true,
  isSortable: true,
  isResizable: true,
  enableColumnReordering: true,
};

Full2.argTypes = {
  data: { control: { disable: true } },
};

Full2.decorators = [
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
];

export const Localized: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const pageSizeList = useMemo(() => [10, 25, 50], []);
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
        {...args}
        columns={columns}
        data={generateData(0, 100)}
        pageSize={25}
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
];

Localized.argTypes = {
  data: { control: { disable: true } },
};
Localized.parameters = {
  docs: { source: { excludeDecorators: true } },
};

export const Condensed: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

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
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
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

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      density='condensed'
      {...args}
    />
  );
};
Condensed.args = {
  density: 'condensed',
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ],
};

export const Editable: Story<Partial<TableProps>> = (args) => {
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
      action('onCellEdit')({ columnId, value, rowData });
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
    (): Column<TableStoryDataType>[] => [
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
      {...args}
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

Editable.argTypes = {
  data: { control: { disable: true } },
};

export const WithPaginator: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const data = useMemo(
    () =>
      Array(5005)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const pageSizeList = useMemo(() => [10, 25, 50], []);
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
        {...args}
        columns={columns}
        data={data}
        pageSize={25}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
      />
    </>
  );
};

WithPaginator.args = {
  isSelectable: true,
  isSortable: true,
};

WithPaginator.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
];

WithPaginator.argTypes = {
  data: { control: { disable: true } },
};
WithPaginator.parameters = {
  docs: { source: { excludeDecorators: true } },
};

export const WithManualPaginator: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const generateData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => ({
        name: `Name${start + index}`,
        description: `Description${start + index}`,
      }));
  };

  const [data, setData] = useState(() => generateData(0, 25));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSizeList = useMemo(() => [10, 25, 50], []);
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
            setData(
              generateData(page * props.pageSize, (page + 1) * props.pageSize),
            );
          }, 500);
        }}
        onPageSizeChange={(size) => {
          setData(generateData(currentPage * size, (currentPage + 1) * size));
          props.onPageSizeChange(size);
        }}
        pageSizeList={pageSizeList}
        currentPage={currentPage}
        isLoading={false}
        // Imagining we know the total count of data items
        totalRowsCount={60000}
      />
    ),
    [currentPage, pageSizeList],
  );

  return (
    <>
      <Table
        emptyTableContent='No data.'
        {...args}
        isLoading={isLoading}
        columns={columns}
        data={data}
        pageSize={25}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
        manualPagination
      />
    </>
  );
};

WithManualPaginator.decorators = [
  (Story) => (
    <div style={{ height: '90vh' }}>
      <Story />
    </div>
  ),
];

WithManualPaginator.argTypes = {
  data: { control: { disable: true } },
};
WithManualPaginator.parameters = {
  docs: { source: { excludeDecorators: true } },
};

export const ResizableColumns: Story<Partial<TableProps>> = (args) => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    id: string;
    startDate: Date;
    endDate: Date;
  };

  const columns = useMemo(
    (): Column<TableStoryDataType>[] => [
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
  );

  const data = useMemo(
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
    React.useState<TableProps['columnResizeMode']>('fit');

  return (
    <>
      <InputGroup
        label='Resize mode'
        displayStyle='inline'
        style={{ marginBottom: 12 }}
      >
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
        {...args}
        columnResizeMode={columnResizeMode}
      />
    </>
  );
};

ResizableColumns.args = {
  isResizable: true,
  data: [
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
};

export const ZebraStripedRows: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const data = useMemo(
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
        {...args}
        columns={columns}
        data={data}
        style={{ height: '100%' }}
      />
    </>
  );
};

ZebraStripedRows.args = {
  isSelectable: true,
  isSortable: true,
  styleType: 'zebra-rows',
};

export const HorizontalScroll: Story<Partial<TableProps>> = (args) => {
  const data = useMemo(
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

  const columns = useMemo(
    (): Column<typeof data[number]>[] => [
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
        Cell: (props: CellProps<typeof data[0]>) => {
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
        Cell: (props: CellProps<typeof data[0]>) => {
          return <>{`${props.value} day(s)`}</>;
        },
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      style={{ height: '100%' }}
      {...args}
    />
  );
};

HorizontalScroll.args = {
  data: [
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
];

export const Virtualized: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

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
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: CellProps<{ name: string; description: string }>) => {
          const onClick = () => onClickHandler(props);
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
      },
    ],
    [],
  );

  const data = useMemo(() => {
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
      {...args}
      style={{ maxHeight: '90vh' }}
      data={data}
    />
  );
};

Virtualized.argTypes = {
  isLoading: { control: { disable: true } },
  data: { control: { disable: true } },
};

export const ScrollToRow: Story<Partial<TableProps>> = (args) => {
  type TableStoryDataType = {
    id: string;
    name: string;
    description: string;
  };
  const onClickHandler = React.useCallback(
    (props: CellProps<TableStoryDataType>) => action(props.row.original.name)(),
    [],
  );

  const columns = useMemo(
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
          return <Anchor onClick={onClick}>Click me!</Anchor>;
        },
      },
    ],
    [onClickHandler],
  );

  const data: TableStoryDataType[] = useMemo(() => {
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
      {...args}
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

ScrollToRow.argTypes = {
  isLoading: { control: { disable: true } },
  data: { control: { disable: true } },
};

export const VirtualizedSubRows: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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

  const data = useMemo(
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
      {...args}
      style={{ maxHeight: '90vh' }}
      data={data}
    />
  );
};

VirtualizedSubRows.argTypes = {
  isLoading: { control: { disable: true } },
  data: { control: { disable: true } },
};

export const DraggableColumns: Story<Partial<TableProps>> = (args) => {
  const data = useMemo(
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

  const columns = useMemo(
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
        Cell: (props: CellProps<typeof data[0]>) => {
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
        Cell: (props: CellProps<typeof data[0]>) => {
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
      {...args}
    />
  );
};

DraggableColumns.args = {
  data: [
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
  enableColumnReordering: true,
  isSelectable: true,
};

export const CustomizedColumns: Story<Partial<TableProps>> = (args) => {
  const onExpand = useCallback(
    (rows, state) =>
      action(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const data = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name4', description: 'Description4' },
    ],
    [],
  );

  const isCheckboxDisabled = useCallback((rowData: typeof data[number]) => {
    return rowData.name === 'Name1';
  }, []);
  const isExpanderDisabled = useCallback((rowData: typeof data[number]) => {
    return rowData.name === 'Name2';
  }, []);
  const isCellDisabled = useCallback((rowData: typeof data[number]) => {
    return rowData.name === 'Name3';
  }, []);
  const isRowDisabled = useCallback((rowData: typeof data[number]) => {
    return rowData.name === 'Name4';
  }, []);

  const subComponent = useCallback(
    (row: Row) => (
      <div style={{ padding: 16 }}>
        <Leading>Extra information</Leading>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const columns = useMemo(
    (): Column<typeof data[number]>[] => [
      SelectionColumn({ isDisabled: isCheckboxDisabled }),
      ExpanderColumn({ subComponent, isDisabled: isExpanderDisabled }),
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props) => (
          <DefaultCell
            {...props}
            isDisabled={(rowData) =>
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
  );

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
      {...args}
    />
  );
};

CustomizedColumns.args = {
  isSelectable: true,
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
    { name: 'Name4', description: 'Description4' },
  ],
};

export const ColumnManager: Story<Partial<TableProps>> = (args) => {
  type TableStoryDataType = {
    index: number;
    name: string;
    description: string;
    id: string;
    startDate: Date;
    endDate: Date;
  };

  const columns = useMemo(
    (): Column<TableStoryDataType>[] => [
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
  );
  const data = useMemo(
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
      {...args}
    />
  );
};

ColumnManager.args = {
  data: [
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
};

export const StickyColumns: Story<Partial<TableProps>> = (args) => {
  const data = useMemo(
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

  const columns = useMemo(
    (): Column<typeof data[number]>[] => [
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
        Cell: (props: CellProps<typeof data[0]>) => {
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
        Cell: (props: CellProps<typeof data[0]>) => {
          return <>{props.value} day(s)</>;
        },
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: () => (
          <DropdownMenu menuItems={menuItems}>
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [menuItems],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      style={{ height: '100%' }}
      isResizable
      {...args}
    />
  );
};

StickyColumns.args = {
  data: [
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
];

export const StatusAndCellIcons: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (
          props: CellRendererProps<{
            startIcon: JSX.Element;
            endIcon: JSX.Element;
          }>,
        ) => (
          <DefaultCell
            {...props}
            startIcon={props.cellProps.row.original.startIcon}
            endIcon={
              props.cellProps.row.original.isLoading ? (
                <ProgressRadial value={40} />
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
        cellRenderer: (
          props: CellRendererProps<{
            status: 'positive' | 'warning' | 'negative' | undefined;
          }>,
        ) => {
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
  );

  const data = useMemo(
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
  );

  const rowProps = useCallback(
    (
      row: Row<{
        name: string;
        modified: string;
        size: string;
        startIcon: JSX.Element;
        endIcon: JSX.Element;
        status?: 'positive' | 'negative' | 'warning';
        isLoading?: boolean;
      }>,
    ) => {
      return {
        status: row.original.status,
        isLoading: row.original.isLoading,
      };
    },
    [],
  );

  return (
    <Table
      {...args}
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      selectionMode='multi'
      isSelectable={true}
      rowProps={rowProps}
    />
  );
};

StatusAndCellIcons.args = {
  isSelectable: true,
  selectionMode: 'multi',
};
