// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
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
  },
} as Meta<TableProps>;

export const TableWithData: Story<TableProps> = (args) => {
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
              return <a onClick={onClick}>Click me!</a>;
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
      emptyTableContent={'No data.'}
      {...args}
    />
  );
};

export const Selectable: Story<TableProps> = (args) => {
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
              return <a onClick={onClick}>Click me!</a>;
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
      emptyTableContent={'No data.'}
      isSelectable={true}
      onSelect={onSelect}
      {...args}
    />
  );
};

export const Loading: Story<TableProps> = (args) => {
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
      emptyTableContent={'No data.'}
      {...args}
    />
  );
};

Loading.args = {
  data: [],
  isLoading: true,
};

export const NoData: Story<TableProps> = (args) => {
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
      emptyTableContent={'No data.'}
      {...args}
    />
  );
};

NoData.args = {
  data: [],
};
