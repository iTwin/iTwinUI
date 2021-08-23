/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import {
  actions,
  ActionType,
  CellProps,
  Column,
  Row,
  TableInstance,
  TableState,
} from 'react-table';
import {
  Checkbox,
  Code,
  InputGroup,
  Table,
  Leading,
  tableFilters,
  TableFilterValue,
  TableProps,
  Tooltip,
} from '../../src/core';
import { Story, Meta } from '@storybook/react';
import { useMemo, useState } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { CreeveyMeta, CreeveyStoryParams } from 'creevey';

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
  parameters: {
    creevey: { skip: { stories: ['Lazy Loading', 'Row In Viewport'] } },
  },
} as Meta<TableProps> & CreeveyMeta;

export const Basic: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

export const Selectable: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

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

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              return (
                <a
                  className='iui-anchor'
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row selection when clicking on link
                    action(props.row.original.name)();
                  }}
                >
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      isSelectable={true}
      onSelect={onSelect}
      onRowClick={onRowClick}
      {...rest}
    />
  );
};

Selectable.args = { isSelectable: true };

export const Sortable: Story<TableProps> = (args) => {
  const { columns, data, isSortable, ...rest } = args;
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const onSort = useCallback(
    (state) => action(`Sort changed. Table state: ${JSON.stringify(state)}`)(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'name',
            Header: 'Name',
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
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name2', description: 'Description2' },
    ],
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      isSortable={isSortable}
      onSort={onSort}
      {...rest}
    />
  );
};

Sortable.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name3', description: 'Description3' },
    { name: 'Name2', description: 'Description2' },
  ],
  isSortable: true,
};

export const Filters: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
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

  const tableColumns = useMemo(
    (): Column<TableStoryDataType>[] => [
      {
        Header: 'Table',
        columns: [
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
              return props.row.original.ids.join(', ');
            },
            Filter: tableFilters.TextFilter(translatedLabels),
            filter: 'includes',
          },
          {
            id: 'startDate',
            Header: 'Start date',
            accessor: 'startDate',
            Cell: (props: CellProps<TableStoryDataType>) => {
              return formatDate(props.row.original.startDate);
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
              return formatDate(new Date(props.row.original.endDate));
            },
            Filter: tableFilters.DateRangeFilter({
              translatedLabels,
            }),
            filter: 'betweenDate',
          },
        ],
      },
    ],
    [formatDate, translatedLabels],
  );

  const tableData = useMemo(
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
    (filters: TableFilterValue<TableStoryDataType>[], state: TableState) => {
      action(
        `Filter changed. Filters: ${JSON.stringify(
          filters,
        )}, State: ${JSON.stringify(state)}`,
      )();
    },
    [],
  );

  return (
    <Table
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      onFilter={onFilter}
      {...rest}
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
Filters.parameters = {
  creevey: {
    tests: {
      async open() {
        const filter = (
          await this.browser.findElements({
            css: '.iui-filter-button',
          })
        )[1];
        await this.browser.actions().move({ origin: filter }).click().perform();
        await this.expect(
          await this.browser
            .findElement({ css: '.iui-table' })
            .takeScreenshot(),
        ).to.matchImage('opened');
      },
    },
  } as CreeveyStoryParams,
};

export const Expandable: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

  const onExpand = useCallback(
    (rows, state) =>
      action(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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

  const tableData = useMemo(
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
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      subComponent={expandedSubComponent}
      onExpand={onExpand}
      {...rest}
    />
  );
};

Expandable.args = {
  data: [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ],
  isSelectable: true,
};

Expandable.parameters = {
  creevey: {
    tests: {
      async open() {
        const closed = await this.takeScreenshot();
        const table = await this.browser.findElement({
          css: '.iui-table',
        });

        const expanderButtons = await table.findElements({
          css: '.iui-button',
        });
        await expanderButtons[0].click();
        await expanderButtons[2].click();

        const expanded = await this.takeScreenshot();
        await this.expect({ closed, expanded }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

export const ExpandableSubrows: Story<TableProps> = (args) => {
  const { data, ...rest } = args;

  const onExpand = useCallback(
    (rows, state) =>
      action(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      )(),
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
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
      },
    ],
    [],
  );

  return (
    <Table
      emptyTableContent='No data.'
      isSelectable
      isSortable
      {...rest}
      data={data}
      columns={tableColumns}
      onExpand={onExpand}
    />
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
ExpandableSubrows.argTypes = {
  data: { control: { disable: true } },
};

ExpandableSubrows.parameters = {
  creevey: {
    tests: {
      async expand() {
        const closed = await this.takeScreenshot();

        let expanders = await this.browser.findElements({
          css: '.iui-row-expander',
        });
        // Expand Row 1
        await expanders[0].click();
        expanders = await this.browser.findElements({
          css: '.iui-row-expander',
        });
        // Expand Row 1.2
        await expanders[1].click();

        const expanded = await this.takeScreenshot();

        await this.expect({ closed, expanded }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

export const LazyLoading: Story<TableProps> = (args) => {
  const { columns, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
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

  const [tableData, setTableData] = useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = useState(false);

  const onBottomReached = useCallback(() => {
    action('Bottom reached!')();
    setIsLoading(true);
    // Simulating request
    setTimeout(() => {
      setTableData(() => [
        ...tableData,
        ...generateData(tableData.length, tableData.length + 100),
      ]);
      setIsLoading(false);
    }, 1000);
  }, [tableData]);

  return (
    <Table
      columns={columns || tableColumns}
      emptyTableContent='No data.'
      onBottomReached={onBottomReached}
      isLoading={isLoading}
      {...rest}
      data={tableData}
    />
  );
};

LazyLoading.argTypes = {
  isLoading: { control: { disable: true } },
};

export const RowInViewport: Story<TableProps> = (args) => {
  const { columns, ...rest } = args;

  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return (
                <a className='iui-anchor' onClick={onClick}>
                  Click me!
                </a>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
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
        <a
          className='iui-anchor'
          onClick={() =>
            (parent.document.querySelector(
              '[id^="tabbutton-actions"]',
            ) as HTMLButtonElement)?.click()
          }
        >
          Actions
        </a>{' '}
        tab to see when callback is called and scroll the table.
      </div>
      <br />
      <Table
        columns={columns || tableColumns}
        emptyTableContent='No data.'
        onRowInViewport={onRowInViewport}
        {...rest}
        data={tableData}
      />
    </>
  );
};

RowInViewport.argTypes = {
  data: { control: { disable: true } },
};

export const DisabledRows: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

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

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
              <a
                className='iui-anchor'
                onClick={action(props.row.original.name)}
              >
                Click me!
              </a>
            )}
          </>
        ),
      },
    ],
    [isRowDisabled],
  );

  const tableData = useMemo(
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
      columns={columns || tableColumns}
      data={data || tableData}
      emptyTableContent='No data.'
      onRowClick={onRowClick}
      subComponent={expandedSubComponent}
      isRowDisabled={isRowDisabled}
      {...rest}
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

export const Loading: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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

  return (
    <Table
      columns={columns || tableColumns}
      data={data || []}
      isLoading={true}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

Loading.args = {
  data: [],
  isLoading: true,
};

export const NoData: Story<TableProps> = ({ columns, data, ...rest }) => {
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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

  return (
    <Table
      columns={columns || tableColumns}
      data={data || []}
      isLoading={false}
      emptyTableContent='No data.'
      {...rest}
    />
  );
};

NoData.args = {
  data: [],
};

export const ControlledState: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
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
          },
        ],
      },
    ],
    [],
  );

  const tableData = useMemo(
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
        {tableData.map((data, index) => (
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
        columns={columns || tableColumns}
        data={data || tableData}
        emptyTableContent='No data.'
        useControlledState={controlledState}
        stateReducer={tableStateReducer}
        isSelectable
        {...rest}
      />
    </>
  );
};

ControlledState.args = { isSelectable: true };

export const Full: Story<TableProps> = (args) => {
  const { columns, data, ...rest } = args;

  const [hoveredRowIndex, setHoveredRowIndex] = useState(0);

  const rowRefMap = React.useRef<Record<number, HTMLDivElement>>({});

  const isRowDisabled = useCallback(
    (rowData: { name: string; description: string }) => {
      return rowData.name === 'Name2';
    },
    [],
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
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
      },
    ],
    [],
  );

  const tableData = useMemo(
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
        columns={columns || tableColumns}
        data={data || tableData}
        emptyTableContent='No data.'
        subComponent={expandedSubComponent}
        isRowDisabled={isRowDisabled}
        rowProps={rowProps}
        isSelectable
        isSortable
        {...rest}
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
  emptyFilteredTableContent: 'No results found. Clear or try another filter.',
};

export const Condensed: Story<TableProps> = Basic.bind({});
Condensed.args = { density: 'condensed' };
