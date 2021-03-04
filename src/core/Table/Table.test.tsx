// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Table, TableProps } from './Table';

const onViewClick = jest.fn();
const columns = [
  {
    Header: 'Header name',
    columns: [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        width: 90,
      },
      {
        id: 'description',
        Header: 'description',
        accessor: 'description',
        maxWidth: 200,
      },
      {
        id: 'view',
        Header: 'view',
        Cell: () => {
          return <span onClick={onViewClick}>View</span>;
        },
      },
    ],
  },
];

const mockedData = () => [
  { name: 'Name1', description: 'Description1' },
  { name: 'Name2', description: 'Description2' },
  { name: 'Name3', description: 'Description3' },
];

function renderComponent(initialsProps?: Partial<TableProps>) {
  const defaultProps: TableProps = {
    columns: columns,
    data: mockedData(),
    emptyTableContent: 'Empty table',
  };

  const props = { ...defaultProps, ...initialsProps };
  return render(<Table {...props} />);
}

function assertRowsData(rows: NodeListOf<Element>) {
  expect(rows.length).toBe(3);
  const data = mockedData();
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const { name, description } = data[i];
    const cells = row.querySelectorAll('.iui-tables-cell');
    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toEqual(name);
    expect(cells[1].textContent).toEqual(description);
    expect(cells[2].textContent).toEqual('View');
    fireEvent.click(cells[2].firstElementChild as HTMLElement);
  }
  expect(onViewClick).toHaveBeenCalledTimes(3);
}

it('should render table with data', () => {
  const { container } = renderComponent();

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-tables-body .iui-tables-row');
  assertRowsData(rows);
});

it('should show spinner when loading', () => {
  const { container } = renderComponent({ data: [], isLoading: true });

  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();
  const rows = container.querySelectorAll('.iui-tables-body .iui-tables-row');
  expect(rows.length).toBe(0);
});

it('should show empty message when there is no data', () => {
  const { container } = renderComponent({ data: [] });

  screen.getByText('Empty table');
  const rows = container.querySelectorAll('.iui-tables-body .iui-tables-row');
  expect(rows.length).toBe(0);
});

it('should render table with custom className', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const table = container.querySelector('.iui-tables-table.test-className');
  expect(table).toBeTruthy();
});

it('should render table with custom style', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const table = container.querySelector('.iui-tables-table') as HTMLElement;
  expect(table).toBeTruthy();
  expect(table.style.color).toEqual('red');
});

it('should render column with custom className', () => {
  const { container } = renderComponent({
    columns: [
      {
        Header: 'Header name',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
            columnClassName: 'test-className',
          },
        ],
      },
    ],
  });

  const column = container.querySelector(
    '.iui-tables-cell.iui-tables-head.test-className',
  );
  expect(column).toBeTruthy();
});

it('should render cell with custom className', () => {
  const { container } = renderComponent({
    columns: [
      {
        Header: 'Header name',
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
            cellClassName: 'test-className',
          },
        ],
      },
    ],
  });

  const cell = container.querySelector(
    '.iui-tables-body .iui-tables-cell.test-className',
  );
  expect(cell).toBeTruthy();
});

it('should handle checkbox clicks', () => {
  const onSelect = jest.fn();
  const { container } = renderComponent({ isSelectable: true, onSelect });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-tables-body .iui-tables-row');
  expect(rows.length).toBe(3);

  expect(onSelect).not.toHaveBeenCalled();

  const checkboxCells = container.querySelectorAll(
    '.iui-tables-slot .iui-checkbox',
  );
  expect(checkboxCells.length).toBe(4);
  fireEvent.click(checkboxCells[2]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[1]], expect.any(Object));

  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(mockedData(), expect.any(Object));

  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith([], expect.any(Object));
});
