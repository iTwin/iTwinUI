/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import { CellProps } from 'react-table';
import { Table } from '../../src/core';
import { TableProps } from '../../src/core/Table/Table';
import { Story, Meta } from '@storybook/react';
import { useMemo } from '@storybook/addons';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Core/Table',
  component: Table,
  parameters: {
    docs: {
      description: { component: 'Table component based on react-table' },
    },
  },
  args: {
    data: [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    emptyTableContent: 'No data.',
  },
  argTypes: {
    columns: {
      control: { disable: true },
    },
    isSelectable: {
      control: { disable: true },
    },
    style: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    initialState: {
      table: { disable: true },
    },
    stateReducer: {
      table: { disable: true },
    },
    useControlledState: {
      table: { disable: true },
    },
    defaultColumn: {
      table: { disable: true },
    },
    getSubRows: {
      table: { disable: true },
    },
    getRowId: {
      table: { disable: true },
    },
    manualRowSelectedKey: {
      table: { disable: true },
    },
    autoResetSelectedRows: {
      table: { disable: true },
    },
    selectSubRows: {
      table: { disable: true },
    },
    manualSortBy: {
      table: { disable: true },
    },
    defaultCanSort: {
      table: { disable: true },
    },
    disableMultiSort: {
      table: { disable: true },
    },
    isMultiSortEvent: {
      table: { disable: true },
    },
    maxMultiSortColCount: {
      table: { disable: true },
    },
    disableSortRemove: {
      table: { disable: true },
    },
    disabledMultiRemove: {
      table: { disable: true },
    },
    orderByFn: {
      table: { disable: true },
    },
    sortTypes: {
      table: { disable: true },
    },
    autoResetSortBy: {
      table: { disable: true },
    },
  },
} as Meta<TableProps>;

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
              return <a onClick={onClick}>Click me!</a>;
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
  const onClickHandler = (
    props: CellProps<{ name: string; description: string }>,
  ) => action(props.row.original.name)();

  const onSelect = useCallback(
    (rows, state) =>
      action(
        `Selected rows: ${JSON.stringify(rows)}, Table state: ${JSON.stringify(
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
          {
            id: 'click-me',
            Header: 'Click',
            width: 100,
            Cell: (props: CellProps<{ name: string; description: string }>) => {
              const onClick = () => onClickHandler(props);
              return <a onClick={onClick}>Click me!</a>;
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
      {...rest}
    />
  );
};

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
              return <a onClick={onClick}>Click me!</a>;
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
