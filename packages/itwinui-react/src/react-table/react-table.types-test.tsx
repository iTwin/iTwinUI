/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This test file tests some Table type related cases that have not been tested in other files
 * (e.g. react-workshop, unit tests, etc.)
 */

// To hide impertinent errors
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  ActionColumn,
  Table,
  TablePaginator,
  tableFilters,
  EditableCell,
  DefaultCell,
  SelectionColumn,
  ExpanderColumn,
} from '../core/Table/index.js';
import type { TablePaginatorRendererProps } from '../core/Table/index.js';

// Table types can be imported with an alias or selective types can be imported too.
import * as TableTypes from './react-table.js';
import type { Column } from './react-table.js';

type TableProps<T extends Record<string, unknown> = Record<string, unknown>> =
  React.ComponentProps<typeof Table<T>>;

import React from 'react';
import {
  Anchor,
  DropdownMenu,
  IconButton,
  Input,
  MenuItem,
  Text,
  Tooltip,
} from '../index.js';

/**
 * Confirm that `satisfies` on columns does not give any unnecessary type errors.
 */
() => {
  const columns = [
    {
      Header: 'Header 1',
      accessor: 'header1',
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
    },
  ] satisfies Column<{
    header1: string;
    header2: string;
  }>[];

  const data = [
    {
      header1: 'row1',
      header2: 'row1',
    },
    {
      header1: 'row2',
      header2: 'row2',
    },
  ];

  return <Table columns={columns} data={data} emptyTableContent='No data.' />;
};

/**
 * To make sure we cannot pass nested columns.
 */
() => {
  // Don't show TS warning: 'columns' is declared but its value is never read.ts(6133)
  // @ts-ignore - Ignore declared but unused variable.
  const columns = [
    {
      Header: 'Header 1',
      accessor: 'header1',
      // There should be error: TS 2353
      // @ts-expect-error (TS 2353): `columns` should not exist inside of a column object.
      columns: [
        {
          Header: 'Header 2',
          accessor: 'header2',
        },
      ],
    },
  ] satisfies TableTypes.Column<{
    header1: string;
    header2: string;
  }>[];
};

/**
 * When creating variables (with satisfies) that are passed as props.
 */
() => {
  const cellRenderer = React.useCallback((props) => {
    return <div>{props.cellProps.row.original.header1}</div>;
  }, []) satisfies NonNullable<
    TableTypes.Column<{
      header1: string;
      header2: string;
    }>['cellRenderer']
  >;

  const columns = [
    {
      Header: 'Header 1',
      accessor: 'header1',
      cellRenderer: cellRenderer,
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
      Cell: (props) => <div>{props.row.original.header2}</div>,
    },
  ] satisfies TableTypes.Column<{
    header1: string;
    header2: string;
  }>[];

  const data = [
    {
      header1: 'row1',
      header2: 'row1',
    },
    {
      header1: 'row2',
      header2: 'row2',
    },
  ];

  return <Table columns={columns} data={data} emptyTableContent='No data.' />;
};

/**
 * When creating variables (without satisfies) that are passed as props.
 */
() => {
  const Cell = React.useCallback(
    (
      props: TableTypes.CellProps<
        {
          header1: string;
          header2: string;
        },
        string
      >,
    ) => {
      return <div>{props.row.original.header1}</div>;
    },
    [],
  );

  const columns = [
    {
      Header: 'Header 1',
      accessor: 'header1',
      Cell: Cell,
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
    },
  ] satisfies TableTypes.Column<{
    header1: string;
    header2: string;
  }>[];

  const data = [
    {
      header1: 'row1',
      header2: 'row1',
    },
    {
      header1: 'row2',
      header2: 'row2',
    },
  ];

  return <Table columns={columns} data={data} emptyTableContent='No data.' />;
};

/**
 * Passing custom `Filter` does not produce any type errors.
 * (Testing this since custom `Filter`s used to give type errors.)
 */
() => {
  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        Filter: tableFilters.TextFilter(),
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

  const data = React.useMemo(() => {
    return [
      { name: 'Name1', description: 'description' },
      { name: 'Name2', description: 'description' },
      { name: 'Name3', description: 'description' },
    ];
  }, []);

  return <Table columns={columns} emptyTableContent='No data.' data={data} />;
};

/**
 * Complex Table example.
 */
() => {
  type TableRowDataType = {
    index: number;
    name: string;
    description: string;
    ids: string[];
    startDate: Date;
    endDate: string;
    subRows: TableRowDataType[];
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

  const formatDate = React.useCallback(
    (date: Date) => {
      return formatter.format(date);
    },
    [formatter],
  );

  const menuItems = React.useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const isRowDisabled = React.useCallback((rowData: TableRowDataType) => {
    return rowData.name === 'Name2';
  }, []);
  const isCheckboxDisabled = React.useCallback(
    (rowData: (typeof data)[number]) => {
      return rowData.name === 'Name1';
    },
    [],
  );
  const isExpanderDisabled = React.useCallback(
    (rowData: (typeof data)[number]) => {
      return rowData.name === 'Name2';
    },
    [],
  );
  const isCellDisabled = React.useCallback((rowData: (typeof data)[number]) => {
    return rowData.name === 'Name3';
  }, []);

  const onCellEdit = React.useCallback(
    (columnId: string, value: string, rowData: TableRowDataType) => {
      console.log({ columnId, value, rowData });
    },
    [],
  );

  const cellRenderer = React.useCallback(
    (props: TableTypes.CellRendererProps<TableRowDataType>) => (
      <>
        {!isRowDisabled(props.cellProps.row.original) &&
        props.cellProps.value !== 'Fetching...' ? (
          <EditableCell {...props} onCellEdit={onCellEdit} />
        ) : (
          <DefaultCell
            {...props}
            status={
              props.cellProps.value === 'Fetching...' ? undefined : 'positive'
            }
            isDisabled={(rowData: (typeof data)[number]) =>
              isCellDisabled(rowData) || isRowDisabled(rowData)
            }
          />
        )}
      </>
    ),
    [isCellDisabled, isRowDisabled, onCellEdit],
  );

  const expandedSubComponent = React.useCallback(
    (row: TableTypes.Row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const onClickHandler = React.useCallback(
    (props: TableTypes.CellProps<TableRowDataType>) =>
      console.log(props.row.original.name),
    [],
  );

  const columns = React.useMemo(
    () => [
      SelectionColumn({
        isDisabled: isCheckboxDisabled,
      }),
      ExpanderColumn({
        subComponent: expandedSubComponent,
        isDisabled: isExpanderDisabled,
      }),
      {
        id: 'index',
        Header: '#',
        accessor: 'index',
        width: 80,
        fieldType: 'number',
        Filter: tableFilters.NumberRangeFilter(translatedLabels),
        filter: 'between',
        disableToggleVisibility: true,
        sticky: 'left',
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        fieldType: 'text',
        cellRenderer,
        Filter: tableFilters.TextFilter(translatedLabels),
        disableReordering: true,
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
        Cell: (props: TableTypes.CellProps<TableRowDataType>) => {
          return <>{props.row.original.ids.join(', ')}</>;
        },
        Filter: tableFilters.TextFilter(translatedLabels),
        filter: 'includes',
        minWidth: 200,
      },
      {
        id: 'startDate',
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props: TableTypes.CellProps<TableRowDataType>) => {
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
        Cell: (props: TableTypes.CellProps<TableRowDataType>) => {
          return <>{formatDate(new Date(props.row.original.endDate))}</>;
        },
        Filter: tableFilters.DateRangeFilter({
          translatedLabels,
        }),
        filter: 'betweenDate',
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props: TableTypes.CellProps<TableRowDataType>) => {
          return (
            <Anchor
              as='button'
              onClick={(e) => {
                e.stopPropagation(); // prevent row selection when clicking on link
                console.log(props.row.original.name);

                onClickHandler(props);
              }}
            >
              Click me!
            </Anchor>
          );
        },
        disableResizing: true,
      },
      {
        ...ActionColumn({ columnManager: true }),
        Cell: (props: TableTypes.CellProps<TableRowDataType>) => (
          <DropdownMenu menuItems={menuItems}>
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
              disabled={isRowDisabled(props.row.original)}
            >
              <svg />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [
      isCheckboxDisabled,
      expandedSubComponent,
      isExpanderDisabled,
      translatedLabels,
      cellRenderer,
      formatDate,
      onClickHandler,
      menuItems,
      isRowDisabled,
    ],
  ) satisfies TableTypes.Column<TableRowDataType>[];

  const data = React.useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        ids: ['1'],
        startDate: new Date('May 1, 2021'),
        endDate: '2021-05-31T21:00:00.000Z',
        subRows: [
          {
            index: 11,
            name: 'Name11',
            description: 'Description11',
            ids: ['11'],
            startDate: new Date('May 11, 2021'),
            endDate: '2021-05-31T21:00:00.000Z',
            subRows: [
              {
                index: 111,
                name: 'Name111',
                description: 'Description111',
                ids: ['111'],
                startDate: new Date('May 11, 2021'),
                endDate: '2021-05-31T21:00:00.000Z',
                subRows: [],
              },
            ],
          },
        ],
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        ids: ['2', '3', '4'],
        startDate: new Date('May 2, 2021'),
        endDate: '2021-06-01T21:00:00.000Z',
        subRows: [
          {
            index: 21,
            name: 'Name21',
            description: 'Description21',
            ids: ['21'],
            startDate: new Date('May 21, 2021'),
            endDate: '2021-06-01T21:00:00.000Z',
            subRows: [],
          },
          {
            index: 22,
            name: 'Name22',
            description: 'Description22',
            ids: ['22'],
            startDate: new Date('May 22, 2021'),
            endDate: '2021-06-01T21:00:00.000Z',
            subRows: [],
          },
        ],
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        ids: ['3', '4'],
        startDate: new Date('May 3, 2021'),
        endDate: '2021-06-02T21:00:00.000Z',
        subRows: [],
      },
    ],
    [],
  ) satisfies TableRowDataType[];

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
  }, []) satisfies NonNullable<TableProps<TableRowDataType>['onFilter']>;

  const onSelect = React.useCallback(
    (rows, state) =>
      console.log(
        `Selected rows: ${JSON.stringify(rows)}, Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps<TableRowDataType>['onSelect']>;

  const onRowClick = React.useCallback(
    (event: React.MouseEvent, row: TableTypes.Row) =>
      console.log(`Row clicked: ${JSON.stringify(row.original)}`),
    [],
  );

  const onSort = React.useCallback(
    (state) =>
      console.log(`Sort changed. Table state: ${JSON.stringify(state)}`),
    [],
  ) satisfies NonNullable<TableProps<TableRowDataType>['onSort']>;

  const onExpand = React.useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  ) satisfies NonNullable<TableProps<TableRowDataType>['onExpand']>;

  const onRowInViewport = React.useCallback((rowData) => {
    console.log(`Row in view: ${JSON.stringify(rowData)}`);
  }, []) satisfies NonNullable<TableProps<TableRowDataType>['onRowInViewport']>;

  const rowProps = React.useCallback(
    (row: TableTypes.Row<TableRowDataType>) => {
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

  const pageSizeList = React.useMemo(() => [10, 25, 50], []);
  const paginator = React.useCallback(
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

  const [globalFilter, setGlobalFilter] = React.useState('');
  const tableInstance =
    React.useRef<TableTypes.TableInstance<TableRowDataType>>();

  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(0);
  const [rowRefMap, setRowRefMap] = React.useState<Record<number, HTMLElement>>(
    {},
  );

  return (
    <div>
      <Input
        placeholder='Search...'
        value={globalFilter}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilter(e.target.value)
        }
      />
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        onFilter={onFilter}
        globalFilterValue={globalFilter}
        onSelect={onSelect}
        isSelectable
        isSortable
        isResizable
        enableColumnReordering
        onSort={onSort}
        onRowClick={onRowClick}
        onExpand={onExpand}
        subComponent={expandedSubComponent}
        onRowInViewport={onRowInViewport}
        selectionMode='multi'
        isRowDisabled={isRowDisabled}
        initialState={{
          filters: [{ id: 'name', value: '1' }],
          selectedRowIds: { '0': true, '1': true, '4': true, '5': true },
        }}
        stateReducer={
          React.useCallback((newState, action, prevState, instance) => {
            tableInstance.current = instance;
            return newState;
          }, []) satisfies NonNullable<
            TableTypes.TableOptions<TableRowDataType>['stateReducer']
          >
        }
        rowProps={rowProps}
        paginatorRenderer={paginator}
        density='condensed'
        // These flags prevent filters and sorting from resetting
        autoResetFilters={false}
        autoResetSortBy={false}
        columnResizeMode='expand'
        styleType='zebra-rows'
        enableVirtualization
        scrollToRow={React.useCallback(
          (
            rows: TableTypes.Row<TableRowDataType>[],
            data: TableRowDataType[],
          ) => rows.findIndex((row) => row.original.index === 1),
          [],
        )}
      />
      <Tooltip
        reference={rowRefMap[hoveredRowIndex]}
        content={`Hovered over ${data[hoveredRowIndex].name}.`}
        placement='bottom'
      />
    </div>
  );
};
