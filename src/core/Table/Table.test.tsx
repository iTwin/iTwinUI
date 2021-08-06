/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Table, TableProps } from './Table';
import * as IntersectionHooks from '../utils/hooks/useIntersection';
import { tableFilters } from './filters';
import { CellProps, Row } from 'react-table';
import { SvgChevronRight } from '@itwin/itwinui-icons-react';

const intersectionCallbacks = new Map<Element, () => void>();
jest
  .spyOn(IntersectionHooks, 'useIntersection')
  .mockImplementation((onIntersect) => {
    return (el: HTMLElement) => intersectionCallbacks.set(el, onIntersect);
  });

const mockIntersection = (element: Element) => {
  intersectionCallbacks.get(element)?.();
};

const columns = (onViewClick: () => void = jest.fn()) => [
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

const mockedData = (count = 3) =>
  [...new Array(count)].map((_, index) => ({
    name: `Name${index + 1}`,
    description: `Description${index + 1}`,
  }));

function renderComponent(
  initialsProps?: Partial<TableProps<{ name: string; description: string }>>,
  onViewClick?: () => void,
  renderContainer?: HTMLElement,
) {
  const defaultProps: TableProps = {
    columns: columns(onViewClick),
    data: mockedData(),
    emptyTableContent: 'Empty table',
    emptyFilteredTableContent: 'No results. Clear filter.',
  };

  const props = { ...defaultProps, ...initialsProps };
  return render(
    <Table {...props} />,
    renderContainer && { container: renderContainer },
  );
}

function assertRowsData(
  rows: NodeListOf<Element>,
  data: { name: string; description: string }[] = mockedData(),
) {
  expect(rows.length).toBe(3);
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const { name, description } = data[i];
    const cells = row.querySelectorAll('.iui-cell');
    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toEqual(name);
    expect(cells[1].textContent).toEqual(description);
    expect(cells[2].textContent).toEqual('View');
    fireEvent.click(cells[2].firstElementChild as HTMLElement);
  }
}

const setFilter = (container: HTMLElement, value: string) => {
  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  fireEvent.click(filterIcon);

  const filterInput = document.querySelector(
    '.iui-column-filter input',
  ) as HTMLInputElement;
  expect(filterInput).toBeTruthy();

  fireEvent.change(filterInput, { target: { value } });
  screen.getByText('Filter').click();
};

const clearFilter = (container: HTMLElement) => {
  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  fireEvent.click(filterIcon);

  screen.getByText('Clear').click();
};

beforeEach(() => {
  intersectionCallbacks.clear();
});

it('should render table with data', () => {
  const onViewClick = jest.fn();
  const { container } = renderComponent(undefined, onViewClick);

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows);
  expect(onViewClick).toHaveBeenCalledTimes(3);
});

it('should show spinner when loading', () => {
  const { container } = renderComponent({ data: [], isLoading: true });

  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(0);
});

it('should show empty message when there is no data', () => {
  const { container } = renderComponent({ data: [] });

  screen.getByText('Empty table');
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(0);
});

it('should render table with custom className', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const table = container.querySelector('.iui-table.test-className');
  expect(table).toBeTruthy();
});

it('should render table with custom style', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const table = container.querySelector('.iui-table') as HTMLElement;
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
    '.iui-table-header .iui-cell.test-className',
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
    '.iui-table-body .iui-cell.test-className',
  );
  expect(cell).toBeTruthy();
});

it('should handle checkbox clicks', () => {
  const onSelect = jest.fn();
  const { container } = renderComponent({ isSelectable: true, onSelect });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  expect(onSelect).not.toHaveBeenCalled();

  const checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);
  fireEvent.click(checkboxCells[2]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[1]], expect.any(Object));

  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(mockedData(), expect.any(Object));

  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith([], expect.any(Object));
});

it('should handle row clicks', () => {
  const onSelect = jest.fn();
  const onRowClick = jest.fn();
  const { container, getByText } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  fireEvent.click(getByText(mockedData()[1].name));
  expect(rows[1].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onRowClick).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText(mockedData()[2].name));
  expect(rows[1].classList).not.toContain('iui-selected');
  expect(rows[2].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onRowClick).toHaveBeenCalledTimes(2);

  fireEvent.click(getByText(mockedData()[1].name), { ctrlKey: true });
  expect(rows[1].classList).toContain('iui-selected');
  expect(rows[2].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(3);
  expect(onRowClick).toHaveBeenCalledTimes(3);
});

it('should not trigger onSelect when sorting and filtering', () => {
  const onSort = jest.fn();
  const onSelect = jest.fn();
  const onFilter = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSortable: true,
    onSelect,
    onSort,
    onFilter,
  });

  const nameHeader = container.querySelector(
    '.iui-table-header .iui-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();
  expect(nameHeader.classList).not.toContain('iui-sorted');

  nameHeader.click();
  expect(onSort).toHaveBeenCalled();
  expect(onSelect).not.toHaveBeenCalled();

  setFilter(container, '2');
  expect(onFilter).toHaveBeenCalled();
  expect(onSelect).not.toHaveBeenCalled();
});

it('should not show sorting icon if sorting is disabled', () => {
  const { container } = renderComponent({
    isSortable: false,
  });

  expect(container.querySelector('.iui-cell-end-icon .iui-sort')).toBeFalsy();
});

it('should not show sort icon if data is loading', () => {
  const { container } = renderComponent({
    isSortable: true,
    isLoading: true,
  });

  expect(container.querySelector('.iui-cell-end-icon .iui-sort')).toBeFalsy();
});

it('should not show sort icon if data is empty', () => {
  const { container } = renderComponent({
    isSortable: true,
    data: [],
  });

  expect(container.querySelector('.iui-cell-end-icon .iui-sort')).toBeFalsy();
});

it('should sort name column correctly', () => {
  const mocked = [
    { name: 'name1', description: 'Description1' },
    { name: 'name3', description: 'Description3' },
    { name: 'name2', description: 'Description2' },
  ];
  const sortedByName = [...mocked].sort((a, b) => (a.name > b.name ? 1 : -1));
  const onSort = jest.fn();
  const { container } = renderComponent({
    isSortable: true,
    data: mocked,
    onSort,
  });

  const nameHeader = container.querySelector(
    '.iui-table-header .iui-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();
  expect(nameHeader.classList).not.toContain('iui-sorted');
  let rows = container.querySelectorAll('.iui-table-body .iui-row');

  assertRowsData(rows, mocked);

  const sortIcon = container.querySelector(
    '.iui-cell-end-icon .iui-sort',
  ) as HTMLDivElement;
  expect(sortIcon).toBeTruthy();

  //first click
  nameHeader.click();
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(nameHeader.classList).toContain('iui-sorted');
  assertRowsData(rows, sortedByName);
  expect(onSort).toHaveBeenCalledWith(
    expect.objectContaining({
      sortBy: [
        {
          id: 'name',
          desc: false,
        },
      ],
    }),
  );

  //second click
  nameHeader.click();
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(nameHeader.classList).toContain('iui-sorted');
  assertRowsData(rows, [...sortedByName].reverse());
  expect(onSort).toHaveBeenCalledWith(
    expect.objectContaining({
      sortBy: [
        {
          id: 'name',
          desc: true,
        },
      ],
    }),
  );

  //third click resets it
  nameHeader.click();
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(nameHeader.classList).not.toContain('iui-sorted');
  assertRowsData(rows, mocked);
  expect(onSort).toHaveBeenCalledWith(
    expect.objectContaining({
      sortBy: [],
    }),
  );
});

it('should not show sort icon if disabled in column level', () => {
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          disableSortBy: true,
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSortable: true,
  });

  expect(container.querySelector('.iui-sort .iui-icon-wrapper')).toBeFalsy();
});

it('should trigger onBottomReached', () => {
  const onBottomReached = jest.fn();
  const { container } = renderComponent({
    data: mockedData(50),
    onBottomReached,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(50);

  expect(onBottomReached).not.toHaveBeenCalled();
  expect(intersectionCallbacks.size).toBe(50);
  mockIntersection(rows[49]);

  expect(onBottomReached).toHaveBeenCalledTimes(1);
});

it('should trigger onRowInViewport', () => {
  const onRowInViewport = jest.fn();
  const { container } = renderComponent({
    data: mockedData(50),
    onRowInViewport,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(50);

  expect(onRowInViewport).not.toHaveBeenCalled();
  expect(intersectionCallbacks.size).toBe(50);
  for (let i = 0; i < 10; i++) {
    mockIntersection(rows[i]);
  }

  expect(onRowInViewport).toHaveBeenCalledTimes(10);
});

it('should filter table', () => {
  const onFilter = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({ columns: mockedColumns, onFilter });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, '2');

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(1);
  expect(onFilter).toHaveBeenCalledWith(
    [{ fieldType: 'text', filterType: 'text', id: 'name', value: '2' }],
    expect.objectContaining({ filters: [{ id: 'name', value: '2' }] }),
  );
});

it('should clear filter', () => {
  const onFilter = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    initialState: { filters: [{ id: 'name', value: '2' }] },
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(1);

  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  fireEvent.click(filterIcon);

  const filterInput = document.querySelector(
    '.iui-column-filter input',
  ) as HTMLInputElement;
  expect(filterInput).toBeTruthy();
  expect(filterInput.value).toEqual('2');

  screen.getByText('Clear').click();

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);
  expect(onFilter).toHaveBeenCalledWith(
    [],
    expect.objectContaining({ filters: [] }),
  );
});

it('should not filter table when manualFilters flag is on', () => {
  const onFilter = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    manualFilters: true,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, '2');

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);
  expect(onFilter).toHaveBeenCalledWith(
    [{ fieldType: 'text', filterType: 'text', id: 'name', value: '2' }],
    expect.objectContaining({ filters: [{ id: 'name', value: '2' }] }),
  );
});

it('should not show filter icon when filter component is not set', () => {
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeFalsy();
});

it('should show message and active filter icon when there is no data after filtering', () => {
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({ columns: mockedColumns });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, 'invalid value');

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(0);
  screen.getByText('No results. Clear filter.');
  const filterIcon = container.querySelector(
    '.iui-filter-button.iui-active .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
});

it('should show message and active filter icon when there is no data after manual filtering', () => {
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container, rerender } = render(
    <Table
      data={mockedData()}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      emptyFilteredTableContent='No results. Clear filter.'
      manualFilters={true}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, 'invalid value');

  rerender(
    <Table
      data={[]}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      emptyFilteredTableContent='No results. Clear filter.'
      manualFilters={true}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(0);
  screen.getByText('No results. Clear filter.');
  const filterIcon = container.querySelector(
    '.iui-filter-button.iui-active .iui-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
});

it('should not trigger sorting when filter is clicked', () => {
  const onFilter = jest.fn();
  const onSort = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    onSort,
  });

  setFilter(container, '2');

  expect(onFilter).toHaveBeenCalled();
  expect(onSort).not.toHaveBeenCalled();
});

it('should render filter dropdown in the correct document', () => {
  const mockDocument = new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body><div></div></body></html>`,
    'text/html',
  );
  const mockContainer = mockDocument.querySelector('div') as HTMLDivElement;

  const onFilter = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent(
    { columns: mockedColumns, onFilter },
    undefined,
    mockContainer,
  );
  expect(container.querySelector('.iui-table')).toBeTruthy();

  const filterToggle = container.querySelector(
    '.iui-filter-button',
  ) as HTMLElement;
  expect(filterToggle).toBeTruthy();
  filterToggle.click();

  expect(mockDocument.querySelector('.iui-column-filter')).toBeTruthy();
  expect(document.querySelector('.iui-column-filter')).toBeFalsy();
});

it('should rerender table when columns change', () => {
  const data = mockedData();
  const { rerender } = render(
    <Table
      columns={[
        {
          Header: 'Header name',
          columns: [
            {
              id: 'name',
              Header: 'Name',
              Cell: () => 'test1',
            },
          ],
        },
      ]}
      data={data}
      emptyTableContent='No data.'
    />,
  );
  expect(screen.getAllByText('test1').length).toBe(3);

  rerender(
    <Table
      columns={[
        {
          Header: 'Header name',
          columns: [
            {
              id: 'name',
              Header: 'Name',
              Cell: () => 'test2',
            },
          ],
        },
      ]}
      data={data}
      emptyTableContent='No data.'
    />,
  );
  expect(screen.getAllByText('test2').length).toBe(3);
});

it('should expand correctly', () => {
  const onExpandMock = jest.fn();
  const { container, getByText } = renderComponent({
    subComponent: (row) => (
      <div>{`Expanded component, name: ${row.original.name}`}</div>
    ),
    onExpand: onExpandMock,
  });
  const {
    container: { firstChild: expanderIcon },
  } = render(<SvgChevronRight className='iui-icon' aria-hidden />);

  expect(
    container.querySelectorAll('.iui-button.iui-borderless > .iui-icon')[0],
  ).toEqual(expanderIcon);

  act(() => {
    fireEvent.click(container.querySelectorAll('.iui-button')[0]);
  });

  getByText('Expanded component, name: Name1');
});

it('should expand correctly with a custom expander cell', async () => {
  const onExpandMock = jest.fn();
  const { getByText, queryByText } = renderComponent({
    subComponent: (row) => (
      <div>{`Expanded component, name: ${row.original.name}`}</div>
    ),
    onExpand: onExpandMock,
    expanderCell: (props: CellProps<{ name: string; description: string }>) => {
      return (
        <button
          onClick={() => {
            props.row.toggleRowExpanded();
          }}
        >
          Expand {props.row.original.name}
        </button>
      );
    },
  });

  expect(queryByText('Expanded component, name: Name1')).toBeNull();
  expect(queryByText('Expanded component, name: Name3')).toBeNull();

  act(() => {
    fireEvent.click(getByText('Expand Name1'));
    fireEvent.click(getByText('Expand Name2'));
  });

  getByText('Expanded component, name: Name1');
  getByText('Expanded component, name: Name2');

  act(() => {
    fireEvent.click(getByText('Expand Name1'));
    fireEvent.click(getByText('Expand Name3'));
  });
  await waitFor(() =>
    expect(queryByText('Expanded component, name: Name1')).toBeNull(),
  );
  getByText('Expanded component, name: Name2');
  getByText('Expanded component, name: Name3');
  expect(onExpandMock).toHaveBeenCalledTimes(4);
});

it('should disable row and handle expansion accordingly', () => {
  const onExpand = jest.fn();
  const { container } = renderComponent({
    onExpand,
    subComponent: (row) => (
      <div>{`Expanded component, name: ${row.original.name}`}</div>
    ),
    isRowDisabled: (rowData) => rowData.name === 'Name2',
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);
  expect(rows[0].classList).not.toContain('iui-disabled');
  expect(rows[1].classList).toContain('iui-disabled');
  expect(rows[2].classList).not.toContain('iui-disabled');

  const expansionCells = container.querySelectorAll(
    '.iui-slot .iui-button',
  ) as NodeListOf<HTMLButtonElement>;
  expect(expansionCells.length).toBe(3);
  expect(expansionCells[0].disabled).toBe(false);
  expect(expansionCells[1].disabled).toBe(true);
  expect(expansionCells[2].disabled).toBe(false);

  fireEvent.click(expansionCells[1]);
  expect(onExpand).not.toHaveBeenCalled();

  fireEvent.click(expansionCells[0]);
  expect(onExpand).toHaveBeenCalled();
});

it('should disable row and handle selection accordingly', () => {
  const onSelect = jest.fn();
  const onRowClick = jest.fn();
  const { container } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
    isRowDisabled: (rowData) => rowData.name === 'Name2',
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);
  expect(rows[0].classList).not.toContain('iui-disabled');
  expect(rows[1].classList).toContain('iui-disabled');
  expect(rows[2].classList).not.toContain('iui-disabled');

  const checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);
  expect(checkboxCells[0].classList).not.toContain('iui-disabled');
  expect(checkboxCells[1].classList).not.toContain('iui-disabled');
  expect(checkboxCells[2].classList).toContain('iui-disabled');
  expect(checkboxCells[3].classList).not.toContain('iui-disabled');

  // Select disabled row
  fireEvent.click(checkboxCells[2]);
  expect(onSelect).not.toHaveBeenCalled();
  expect(onRowClick).not.toHaveBeenCalled();

  // Select first row
  fireEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0].querySelector(
    'input',
  ) as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);
  expect(headerCheckbox.checked).toBe(false);

  // Select all
  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[2]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(false);
  expect(headerCheckbox.checked).toBe(true);

  // Deselect all
  fireEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith([], expect.any(Object));
  expect(headerCheckbox.indeterminate).toBe(false);
  expect(headerCheckbox.checked).toBe(false);
});

it('should select and filter rows', () => {
  const onSelect = jest.fn();
  const mockedColumns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
          fieldType: 'text',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSelectable: true,
    onSelect,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  let checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);

  // Select first row
  fireEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0].querySelector(
    'input',
  ) as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);

  // Filter table
  setFilter(container, '2');
  expect(headerCheckbox.indeterminate).toBe(true);

  checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(2);

  // Select second row
  fireEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[1]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(true);

  // Clear filter
  clearFilter(container);
  const checkboxInputs = container.querySelectorAll<HTMLInputElement>(
    '.iui-slot .iui-checkbox input',
  );
  expect(checkboxInputs.length).toBe(4);
  expect(checkboxInputs[0].indeterminate).toBe(true);
  expect(checkboxInputs[1].checked).toBe(true);
  expect(checkboxInputs[2].checked).toBe(true);
  expect(checkboxInputs[3].checked).toBe(false);
});

it('should pass custom props to row', () => {
  const onMouseEnter = jest.fn();
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const rowProps = (row: Row<{ name: string; description: string }>) => {
    return { onMouseEnter: () => onMouseEnter(row.original), ref: onRef };
  };
  const { container } = renderComponent({ rowProps });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  fireEvent.mouseEnter(rows[0]);
  expect(onMouseEnter).toHaveBeenCalledWith(mockedData()[0]);
  expect(element).toBeTruthy();
});
