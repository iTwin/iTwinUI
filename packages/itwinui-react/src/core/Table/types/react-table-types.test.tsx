/**
 * This test file to test some Table type related cases that have not been tested in other files
 * (e.g. storybook, unit tests, etc.)
 */

// To hide impertinent errors
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Table } from '../index.js';

// TableTypes should be imported as a type-only import.
// @ts-expect-error (TS 1485) - 'TableTypes' resolves to a type-only declaration and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
import { TableTypes as _TableTypes } from '../index.js';
import type { TableTypes } from '../index.js';

import type { Column } from 'react-table';

import React from 'react';

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
 * To test that passing other props to `Table` do not give any type errors.
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

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      className='test-table-class'
      style={{ color: 'red' }}
      aria-label='test-table'
    />
  );
};

/**
 * Confirm that `Column` from `react-table` is equivalent to `TableTypes.Column`.
 */
() => {
  const columns1: TableTypes.Column<{
    header1: string;
    header2: string;
  }>[] = [
    {
      Header: 'Header 1',
      accessor: 'header1',
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
    },
  ] as Column<{
    header1: string;
    header2: string;
  }>[];

  const columns2: Column<{
    header1: string;
    header2: string;
  }>[] = [
    {
      Header: 'Header 1',
      accessor: 'header1',
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
    },
  ] as TableTypes.Column<{
    header1: string;
    header2: string;
  }>[];

  const data: Array<{
    header1: string;
    header2: string;
  }> = [
    {
      header1: 'row1',
      header2: 'row1',
    },
    {
      header1: 'row2',
      header2: 'row2',
    },
  ];

  <div>
    <Table columns={columns1} data={data} emptyTableContent='No data.' />
    <Table columns={columns2} data={data} emptyTableContent='No data.' />
  </div>;
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
      // Cell:
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
