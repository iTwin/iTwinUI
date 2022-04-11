/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import {
  actions,
  ActionType,
  CellProps,
  CellRendererProps,
  Column,
  Row,
  TableInstance,
  TableState,
} from 'react-table';
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
} from '../../src/core';
import { Story, Meta } from '@storybook/react';
import { useMemo, useState } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { CreeveyMeta, CreeveyStoryParams } from 'creevey';
import { SvgMore } from '@itwin/itwinui-icons-react';

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
    creevey: {
      skip: {
        stories: [
          'Lazy Loading',
          'Row In Viewport',
          'Virtualized',
          'Virtualized Sub Rows',
        ],
      },
    },
  },
} as Meta<TableProps> & CreeveyMeta;

export const Basic: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const columns = useMemo(
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
              return <Anchor onClick={onClick}>Click me!</Anchor>;
            },
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

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      {...args}
    />
  );
};

export const Selectable: Story<Partial<TableProps>> = (args) => {
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
      {...args}
    />
  );
};

Selectable.args = { isSelectable: true };

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
              return <Anchor onClick={onClick}>Click me!</Anchor>;
            },
          },
        ],
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name2', description: 'Description2' },
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
    { name: 'Name1', description: 'Description1' },
    { name: 'Name3', description: 'Description3' },
    { name: 'Name2', description: 'Description2' },
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

ExpandableSubrows.parameters = {
  creevey: {
    tests: {
      async expand() {
        const closed = await this.browser
          .findElement({ css: '.iui-table' })
          .takeScreenshot();

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

        const expanded = await this.browser
          .findElement({ css: '.iui-table' })
          .takeScreenshot();

        await this.expect({ closed, expanded }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};

export const LazyLoading: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const columns = useMemo(
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
              return <Anchor onClick={onClick}>Click me!</Anchor>;
            },
          },
        ],
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
            (parent.document.querySelector(
              '[id^="tabbutton-actions"]',
            ) as HTMLButtonElement)?.click()
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

export const ControlledState: Story<Partial<TableProps>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const columns = useMemo(
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
        Header: 'Table',
        columns: [
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

export const Condensed: Story<Partial<TableProps>> = (args) => {
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const columns = useMemo(
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
              return <Anchor onClick={onClick}>Click me!</Anchor>;
            },
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
        Header: 'Table',
        columns: [
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

Editable.parameters = {
  creevey: {
    tests: {
      async focusAndHover() {
        const editableCells = await this.browser.findElements({
          css: '.iui-cell[contenteditable]',
        });
        await this.browser
          .actions()
          .click(editableCells[0])
          .sendKeys('test')
          .perform();
        await this.browser
          .actions()
          .move({ origin: editableCells[2] })
          .perform();
        await this.expect(
          await this.browser
            .findElement({ css: '.iui-table' })
            .takeScreenshot(),
        ).to.matchImage();
      },
    },
  } as CreeveyStoryParams,
};

export const WithPaginator: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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
  parameters: {
    docs: { source: { excludeDecorators: true } },
  },
};

export const WithManualPaginator: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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
  parameters: {
    docs: { source: { excludeDecorators: true } },
  },
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
        Header: 'Table',
        columns: [
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
              return props.row.original.startDate.toLocaleDateString('en-US');
            },
            width: 100,
            disableResizing: true,
          },
          {
            id: 'endDate',
            Header: 'End date',
            Cell: (props: CellProps<TableStoryDataType>) => {
              return props.row.original.endDate.toLocaleDateString('en-US');
            },
            maxWidth: 200,
          },
        ],
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

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      isResizable
      isSortable
      {...args}
    />
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
      Array(20)
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
    (): Column[] => [
      {
        Header: 'Table',
        columns: [
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
              return `$${props.value}`;
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
              return `${props.value} day(s)`;
            },
          },
        ],
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

export const VirtualizedSubRows: Story<Partial<TableProps>> = (args) => {
  const columns = useMemo(
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
        Header: 'Table',
        columns: [
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
              return `$${props.value}`;
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
              return `${props.value} day(s)`;
            },
          },
        ],
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
        Header: 'Table',
        columns: [
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
              return props.row.original.startDate.toLocaleDateString('en-US');
            },
          },
          {
            id: 'endDate',
            Header: 'End date',
            accessor: 'endDate',
            Cell: (props: CellProps<TableStoryDataType>) => {
              return props.row.original.endDate.toLocaleDateString('en-US');
            },
          },
          ActionColumn({ columnManager: true }),
        ],
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
      {
        index: 4,
        name: 'Name4',
        description: 'Description4',
        id: '444',
        startDate: new Date('May 4, 2021'),
        endDate: new Date('Jun 4, 2021'),
      },
      {
        index: 5,
        name: 'Name5',
        description: 'Description5',
        id: '555',
        startDate: new Date('May 5, 2021'),
        endDate: new Date('Jun 5, 2021'),
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
    {
      index: 4,
      name: 'Name4',
      description: 'Description4',
      id: '444',
      startDate: new Date('May 4, 2021'),
      endDate: new Date('Jun 4, 2021'),
    },
    {
      index: 5,
      name: 'Name5',
      description: 'Description5',
      id: '555',
      startDate: new Date('May 5, 2021'),
      endDate: new Date('Jun 5, 2021'),
    },
  ],
};

ColumnManager.parameters = {
  creevey: {
    tests: {
      async open() {
        const button = await this.browser.findElement({
          className: 'iui-button',
        });
        const closed = await this.takeScreenshot();
        await button.click();
        const opened = await this.takeScreenshot();
        await this.expect({
          closed,
          opened,
        }).to.matchImages();
      },
    },
  } as CreeveyStoryParams,
};
