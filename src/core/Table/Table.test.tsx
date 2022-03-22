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
import { CellProps, Column, Row } from 'react-table';
import { SvgChevronRight } from '@itwin/itwinui-icons-react';
import { EditableCell } from './cells';
import { TablePaginator } from './TablePaginator';
import * as UseOverflow from '../utils/hooks/useOverflow';
import * as UseResizeObserver from '../utils/hooks/useResizeObserver';
import userEvent from '@testing-library/user-event';

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
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
      {
        id: 'view',
        Header: 'View',
        Cell: () => {
          return <span onClick={onViewClick}>View</span>;
        },
      },
    ],
  },
];
type TestDataType = {
  name: string;
  description: string;
  subRows?: TestDataType[];
};

const mockedData = (count = 3): TestDataType[] =>
  [...new Array(count)].map((_, index) => ({
    name: `Name${index + 1}`,
    description: `Description${index + 1}`,
  }));

const mockedSubRowsData = () => [
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
        ],
      },
      { name: 'Row 1.3', description: 'Description 1.3', subRows: [] },
    ],
  },
  {
    name: 'Row 2',
    description: 'Description 2',
    subRows: [
      { name: 'Row 2.1', description: 'Description 2.1', subRows: [] },
      { name: 'Row 2.2', description: 'Description 2.2', subRows: [] },
    ],
  },
  { name: 'Row 3', description: 'Description 3', subRows: [] },
];

function renderComponent(
  initialsProps?: Partial<TableProps<TestDataType>>,
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

const flattenData = (data: TestDataType[]) => {
  const flatData: TestDataType[] = [];

  const handleItem = (item: TestDataType) => {
    flatData.push(item);
    if (item.subRows?.length) {
      item.subRows.forEach((subRow) => handleItem(subRow));
    }
  };
  data.forEach((item) => handleItem(item));

  return flatData;
};

function assertRowsData(rows: NodeListOf<Element>, data = mockedData()) {
  expect(rows.length).toBe(data.length);
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const { name, description } = data[i];
    const cells = row.querySelectorAll('.iui-cell');
    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toEqual(name);
    expect(cells[1].textContent).toEqual(description);
    expect(cells[2].textContent).toEqual('View');
    userEvent.click(cells[2].firstElementChild as HTMLElement);
  }
}

const setFilter = (container: HTMLElement, value: string) => {
  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  userEvent.click(filterIcon);

  const filterInput = document.querySelector(
    '.iui-column-filter input',
  ) as HTMLInputElement;
  expect(filterInput).toBeTruthy();

  userEvent.type(filterInput, value);
  userEvent.click(screen.getByText('Filter'));
};

const clearFilter = (container: HTMLElement) => {
  const filterIcon = container.querySelector(
    '.iui-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  userEvent.click(filterIcon);

  screen.getByText('Clear').click();
};

const expandAll = (container: HTMLElement, oldExpanders: Element[] = []) => {
  const allExpanders = Array.from(
    container.querySelectorAll('.iui-row-expander'),
  );
  const newExpanders = allExpanders.filter((e) => !oldExpanders.includes(e));
  newExpanders.forEach((button) => userEvent.click(button));
  if (newExpanders.length) {
    expandAll(container, allExpanders);
  }
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
  userEvent.click(checkboxCells[2]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[1]], expect.any(Object));

  userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(mockedData(), expect.any(Object));

  userEvent.click(checkboxCells[0]);
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

  userEvent.click(getByText(mockedData()[1].name));
  expect(rows[1].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onRowClick).toHaveBeenCalledTimes(1);

  userEvent.click(getByText(mockedData()[2].name));
  expect(rows[1].classList).not.toContain('iui-selected');
  expect(rows[2].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onRowClick).toHaveBeenCalledTimes(2);

  userEvent.click(getByText(mockedData()[1].name), { ctrlKey: true });
  expect(rows[1].classList).toContain('iui-selected');
  expect(rows[2].classList).toContain('iui-selected');
  expect(onSelect).toHaveBeenCalledTimes(3);
  expect(onRowClick).toHaveBeenCalledTimes(3);
});

it('should not select when clicked on row but selectRowOnClick flag is false', () => {
  const onSelect = jest.fn();
  const onRowClick = jest.fn();
  const { container, getByText } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
    selectRowOnClick: false,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  userEvent.click(getByText(mockedData()[1].name));
  expect(onSelect).not.toHaveBeenCalled();
  expect(onRowClick).toHaveBeenCalled();
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

  userEvent.click(nameHeader);
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
  userEvent.click(nameHeader);
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
  userEvent.click(nameHeader);
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
  userEvent.click(nameHeader);
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
    '.iui-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  userEvent.click(filterIcon);

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
    '.iui-filter-button .iui-button-icon',
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
    '.iui-filter-button.iui-active .iui-button-icon',
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
    '.iui-filter-button.iui-active .iui-button-icon',
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
    isSortable: true,
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
  } = render(<SvgChevronRight className='iui-button-icon' aria-hidden />);

  expect(
    container.querySelectorAll(
      '.iui-button.iui-borderless > .iui-button-icon',
    )[0],
  ).toEqual(expanderIcon);

  act(() => {
    userEvent.click(container.querySelectorAll('.iui-button')[0]);
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
    expanderCell: (props: CellProps<TestDataType>) => {
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
    userEvent.click(getByText('Expand Name1'));
    userEvent.click(getByText('Expand Name2'));
  });

  getByText('Expanded component, name: Name1');
  getByText('Expanded component, name: Name2');

  act(() => {
    userEvent.click(getByText('Expand Name1'));
    userEvent.click(getByText('Expand Name3'));
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

  userEvent.click(expansionCells[1]);
  expect(onExpand).not.toHaveBeenCalled();

  userEvent.click(expansionCells[0]);
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
  expect(checkboxCells[0]).not.toBeDisabled();
  expect(checkboxCells[1]).not.toBeDisabled();
  expect(checkboxCells[2]).toBeDisabled();
  expect(checkboxCells[3]).not.toBeDisabled();

  // Select disabled row
  userEvent.click(checkboxCells[2]);
  expect(onSelect).not.toHaveBeenCalled();
  expect(onRowClick).not.toHaveBeenCalled();

  // Select first row
  userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0] as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);
  expect(headerCheckbox.checked).toBe(false);

  // Select all
  userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[2]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(false);
  expect(headerCheckbox.checked).toBe(true);

  // Deselect all
  userEvent.click(checkboxCells[0]);
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
  userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0] as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);

  // Filter table
  setFilter(container, '2');
  expect(headerCheckbox.indeterminate).toBe(true);

  checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(2);

  // Select second row
  userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[1]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(true);

  // Clear filter
  clearFilter(container);
  const checkboxInputs = container.querySelectorAll<HTMLInputElement>(
    '.iui-slot .iui-checkbox',
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
  const rowProps = (row: Row<TestDataType>) => {
    return { onMouseEnter: () => onMouseEnter(row.original), ref: onRef };
  };
  const { container } = renderComponent({ rowProps });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  fireEvent.mouseEnter(rows[0]);
  expect(onMouseEnter).toHaveBeenCalledWith(mockedData()[0]);
  expect(element).toBeTruthy();
});

it.each(['condensed', 'extra-condensed'] as const)(
  'should render %s table',
  (density) => {
    const { container } = renderComponent({
      density: density,
    });
    expect(container.querySelector(`.iui-table.iui-${density}`)).toBeTruthy();
  },
);

it('should render sub-rows and handle expansions', () => {
  const onExpand = jest.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({ data, onExpand });

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows, data);

  expandAll(container);

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows, flattenData(data));

  expect(onExpand).toHaveBeenNthCalledWith(1, [data[0]], expect.any(Object));
  expect(onExpand).toHaveBeenNthCalledWith(
    2,
    [data[0], data[1]],
    expect.any(Object),
  );
  expect(onExpand).toHaveBeenNthCalledWith(
    3,
    [data[0], data[0].subRows[1], data[1]],
    expect.any(Object),
  );
});

it('should render filtered sub-rows', () => {
  const data = mockedSubRowsData();
  const columns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => {
            return <span>View</span>;
          },
        },
      ],
    },
  ];
  const { container } = renderComponent({ data, columns });

  expandAll(container);

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows, flattenData(data));

  setFilter(container, '2');
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows, [
    { name: 'Row 1', description: 'Description 1' },
    { name: 'Row 1.2', description: 'Description 1.2' },
    { name: 'Row 1.2.1', description: 'Description 1.2.1' },
    { name: 'Row 1.2.2', description: 'Description 1.2.2' },
    { name: 'Row 2', description: 'Description 2' },
    { name: 'Row 2.1', description: 'Description 2.1' },
    { name: 'Row 2.2', description: 'Description 2.2' },
  ]);

  clearFilter(container);
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows, flattenData(data));
});

it('should handle sub-rows selection', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(3);
  checkboxes[0].click();

  expandAll(container);

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index < 6),
  );

  expect(onSelect).toHaveBeenCalledWith(
    flattenData([data[0]]),
    expect.any(Object),
  );
});

it('should show indeterminate checkbox when some sub-rows are selected', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  // Click row 1.2 checkbox
  checkboxes[2].click();

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  expect(checkboxes[0].indeterminate).toBe(true);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index > 1 && index < 5),
  );

  expect(onSelect).toHaveBeenCalledWith(
    [data[0].subRows[1], ...data[0].subRows[1].subRows],
    expect.any(Object),
  );
});

it('should show indeterminate checkbox when a sub-row of a sub-row is selected', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  // Click row 1.2.1 checkbox
  checkboxes[3].click();

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  // Row 1
  expect(checkboxes[0].indeterminate).toBe(true);
  // Row 1.2
  expect(checkboxes[2].indeterminate).toBe(true);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index === 3),
  );

  expect(onSelect).toHaveBeenCalledWith(
    [data[0].subRows[1].subRows[0]],
    expect.any(Object),
  );
});

it('should show indeterminate checkbox when sub-row selected after filtering', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const columns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => {
            return <span>View</span>;
          },
        },
      ],
    },
  ];
  const { container } = renderComponent({
    data,
    columns,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, '2');
  expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(7);
  // Click row 1.2 checkbox
  checkboxes[1].click();

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(7);
  expect(checkboxes[0].indeterminate).toBe(true);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index > 0 && index < 4),
  );

  expect(onSelect).toHaveBeenCalledWith(
    [data[0].subRows[1], ...data[0].subRows[1].subRows],
    expect.any(Object),
  );
});

it('should show indeterminate checkbox when clicking on a row itself after filtering', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const columns = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          Filter: tableFilters.TextFilter(),
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => {
            return <span>View</span>;
          },
        },
      ],
    },
  ];
  const { container } = renderComponent({
    data,
    columns,
    onSelect,
    isSelectable: true,
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  setFilter(container, '2');
  expandAll(container);

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(7);
  // Click row 1
  userEvent.click(rows[0]);

  const checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(7);
  expect(checkboxes[0].indeterminate).toBe(true);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index > 0 && index < 4),
  );

  expect(onSelect).toHaveBeenCalledWith(
    [data[0].subRows[1], ...data[0].subRows[1].subRows],
    expect.any(Object),
  );
});

it('should only select one row even if it has sub-rows when selectSubRows is false', () => {
  const onSelect = jest.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
    selectSubRows: false,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(3);
  checkboxes[0].click();

  expandAll(container);

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index < 1),
  );

  expect(onSelect).toHaveBeenCalledWith([data[0]], expect.any(Object));
});

it('should render sub-rows with custom expander', () => {
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    expanderCell: (props: CellProps<TestDataType>) => {
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

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  userEvent.click(screen.getByText('Expand Row 1'));
  userEvent.click(screen.getByText('Expand Row 1.2'));
  userEvent.click(screen.getByText('Expand Row 2'));

  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(10);
});

it('should edit cell data', () => {
  const onCellEdit = jest.fn();
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          cellRenderer: (props) => (
            <EditableCell {...props} onCellEdit={onCellEdit} />
          ),
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => {
            return <span>View</span>;
          },
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  assertRowsData(rows);

  const editableCells = container.querySelectorAll(
    '.iui-cell[contenteditable]',
  );
  expect(editableCells).toHaveLength(3);

  fireEvent.input(editableCells[1], {
    target: { innerText: 'test data' },
  });
  fireEvent.blur(editableCells[1]);
  expect(onCellEdit).toHaveBeenCalledWith('name', 'test data', mockedData()[1]);
});

it('should handle unwanted actions on editable cell', () => {
  const onCellEdit = jest.fn();
  const onSelect = jest.fn();
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          cellRenderer: (props) => (
            <EditableCell {...props} onCellEdit={onCellEdit} />
          ),
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => {
            return <span>View</span>;
          },
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isSelectable: true,
    onSelect,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const editableCells = container.querySelectorAll(
    '.iui-cell[contenteditable]',
  );
  expect(editableCells).toHaveLength(3);

  fireEvent.keyDown(editableCells[1], { key: 'Enter' });
  expect(onCellEdit).not.toHaveBeenCalled();

  fireEvent.drop(editableCells[1]);
  expect(onCellEdit).not.toHaveBeenCalled();

  fireEvent.input(editableCells[1], {
    target: { innerText: 'test\n\r\r\ndata 1' },
  });
  fireEvent.blur(editableCells[1]);
  expect(onCellEdit).toHaveBeenCalledWith(
    'name',
    'test data 1',
    mockedData()[1],
  );

  userEvent.click(editableCells[1]);
  expect(onSelect).not.toHaveBeenCalled();
});

it('should render data in pages', () => {
  jest
    .spyOn(UseOverflow, 'useOverflow')
    .mockImplementation((items) => [jest.fn(), items.length]);
  const { container } = renderComponent({
    data: mockedData(100),
    pageSize: 10,
    paginatorRenderer: (props) => <TablePaginator {...props} />,
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows).toHaveLength(10);
  expect(rows[0].querySelector('.iui-cell')?.textContent).toEqual('Name1');
  expect(rows[9].querySelector('.iui-cell')?.textContent).toEqual('Name10');

  const pages = container.querySelectorAll<HTMLButtonElement>(
    '.iui-paginator .iui-paginator-page-button',
  );
  expect(pages).toHaveLength(10);
  pages[3].click();
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows).toHaveLength(10);
  expect(rows[0].querySelector('.iui-cell')?.textContent).toEqual('Name31');
  expect(rows[9].querySelector('.iui-cell')?.textContent).toEqual('Name40');
});

it('should change page size', () => {
  const { container } = renderComponent({
    data: mockedData(100),
    paginatorRenderer: (props) => (
      <TablePaginator {...props} pageSizeList={[10, 25, 50]} />
    ),
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows).toHaveLength(25);
  expect(rows[0].querySelector('.iui-cell')?.textContent).toEqual('Name1');
  expect(rows[24].querySelector('.iui-cell')?.textContent).toEqual('Name25');

  const pageSizeSelector = container.querySelector(
    '.iui-dropdown',
  ) as HTMLButtonElement;
  expect(pageSizeSelector).toBeTruthy();
  pageSizeSelector.click();

  screen.getByText('50 per page').click();
  rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows).toHaveLength(50);
  expect(rows[0].querySelector('.iui-cell')?.textContent).toEqual('Name1');
  expect(rows[49].querySelector('.iui-cell')?.textContent).toEqual('Name50');
});

it('should handle resize by increasing width of current column and decreasing the next ones', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 150 });
  fireEvent.mouseUp(resizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  expect(headerCells[0].style.width).toBe('150px');
  expect(headerCells[1].style.width).toBe('50px');
  expect(headerCells[2].style.width).toBe('100px');
});

it('should handle resize with touch', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.touchStart(resizer, { touches: [{ clientX: 100 }] });
  fireEvent.touchMove(resizer, { touches: [{ clientX: 150 }] });
  fireEvent.touchEnd(resizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  expect(headerCells[0].style.width).toBe('150px');
  expect(headerCells[1].style.width).toBe('50px');
  expect(headerCells[2].style.width).toBe('100px');
});

it('should prevent from resizing past 1px width', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 198 });
  fireEvent.mouseMove(resizer, { clientX: 300 });
  fireEvent.mouseUp(resizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  expect(headerCells[0].style.width).toBe('198px');
  expect(headerCells[1].style.width).toBe('2px');
  expect(headerCells[2].style.width).toBe('100px');
});

it('should prevent from resizing past max-width', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          maxWidth: 150,
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
          maxWidth: 150,
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  // Current column
  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 150 });
  fireEvent.mouseMove(resizer, { clientX: 200 });
  fireEvent.mouseUp(resizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  expect(headerCells[0].style.width).toBe('150px');
  expect(headerCells[1].style.width).toBe('50px');
  expect(headerCells[2].style.width).toBe('100px');

  // Next column
  fireEvent.mouseDown(resizer, { clientX: 150 });
  fireEvent.mouseMove(resizer, { clientX: 50 });
  fireEvent.mouseMove(resizer, { clientX: 10 });
  fireEvent.mouseUp(resizer);

  expect(headerCells[0].style.width).toBe('50px');
  expect(headerCells[1].style.width).toBe('150px');
  expect(headerCells[2].style.width).toBe('100px');
});

it('should prevent from resizing past min-width', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
          minWidth: 50,
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
          minWidth: 50,
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  // Current column
  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 50 });
  fireEvent.mouseMove(resizer, { clientX: 10 });
  fireEvent.mouseUp(resizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  expect(headerCells[0].style.width).toBe('50px');
  expect(headerCells[1].style.width).toBe('150px');
  expect(headerCells[2].style.width).toBe('100px');

  // Next column
  fireEvent.mouseDown(resizer, { clientX: 50 });
  fireEvent.mouseMove(resizer, { clientX: 150 });
  fireEvent.mouseMove(resizer, { clientX: 190 });
  fireEvent.mouseUp(resizer);

  expect(headerCells[0].style.width).toBe('150px');
  expect(headerCells[1].style.width).toBe('50px');
  expect(headerCells[2].style.width).toBe('100px');
});

it('should not resize column with disabled resize but resize closest ones', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
          disableResizing: true,
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
          disableResizing: true,
        },
        {
          id: 'edit',
          Header: 'edit',
          Cell: () => 'Edit',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  // Current column
  const nameResizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(nameResizer).toBeTruthy();

  fireEvent.mouseDown(nameResizer, { clientX: 100 });
  fireEvent.mouseMove(nameResizer, { clientX: 150 });
  fireEvent.mouseUp(nameResizer);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(4);

  expect(headerCells[0].style.width).toBe('150px');
  expect(headerCells[1].style.width).toBe('100px');
  expect(headerCells[2].style.width).toBe('100px');
  expect(headerCells[3].style.width).toBe('50px');

  // Description column shouldn't have resizer because resizing is disabled for it
  // and next column also isn't resizable
  const descriptionResizer = container.querySelector(
    '.iui-cell:nth-of-type(2) .iui-resizer',
  ) as HTMLDivElement;
  expect(descriptionResizer).toBeFalsy();

  // Last column
  const viewResizer = container.querySelector(
    '.iui-cell:nth-of-type(3) .iui-resizer',
  ) as HTMLDivElement;
  expect(viewResizer).toBeTruthy();

  fireEvent.mouseDown(viewResizer, { clientX: 350 });
  fireEvent.mouseMove(viewResizer, { clientX: 250 });
  fireEvent.mouseUp(viewResizer);

  expect(headerCells[0].style.width).toBe('50px');
  expect(headerCells[1].style.width).toBe('100px');
  expect(headerCells[2].style.width).toBe('100px');
  expect(headerCells[3].style.width).toBe('150px');
});

it('should not show resizer when there are no next resizable columns', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
          disableResizing: true,
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const descriptionResizer = container.querySelector(
    '.iui-cell:nth-of-type(2) .iui-resizer',
  ) as HTMLDivElement;
  expect(descriptionResizer).toBeFalsy();
});

it('should not trigger sort when resizing', () => {
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);
  const onSort = jest.fn();
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
    isSortable: true,
    onSort,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-row');
  expect(rows.length).toBe(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 150 });
  fireEvent.mouseUp(resizer);
  fireEvent.click(resizer);

  expect(onSort).not.toHaveBeenCalled();
});

it('should handle table resize only when some columns were resized', () => {
  const htmlWidthMock = jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100 } as DOMRect);

  let triggerResize: (size: DOMRectReadOnly) => void = jest.fn();
  jest
    .spyOn(UseResizeObserver, 'useResizeObserver')
    .mockImplementation((onResize) => {
      triggerResize = onResize;
      return [
        jest.fn(),
        ({ disconnect: jest.fn() } as unknown) as ResizeObserver,
      ];
    });
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
        },
      ],
    },
  ];
  const { container } = renderComponent({ columns, isResizable: true });

  // Initial render
  triggerResize({ width: 300 } as DOMRectReadOnly);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);
  headerCells.forEach((cell) => expect(cell.style.width).toBe('0px'));

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.mouseDown(resizer, { clientX: 100 });
  fireEvent.mouseMove(resizer, { clientX: 150 });
  fireEvent.mouseUp(resizer);

  act(() => {
    htmlWidthMock.mockReturnValue({ width: 50 } as DOMRect);
    triggerResize({ width: 150 } as DOMRectReadOnly);
  });
  headerCells.forEach((cell) => expect(cell.style.width).toBe('50px'));
});

it('should not render resizer when resizer is disabled', () => {
  const { container } = renderComponent(undefined);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells).toHaveLength(3);

  const resizer = container.querySelector('.iui-resizer') as HTMLDivElement;
  expect(resizer).toBeFalsy();
});

it('should render zebra striped table', () => {
  const { container } = renderComponent({ styleType: 'zebra-rows' });

  expect(
    container.querySelector('.iui-table-body.iui-zebra-striping'),
  ).toBeTruthy();
});

it('should sync body horizontal scroll with header scroll', () => {
  const { container } = renderComponent();

  const header = container.querySelector('.iui-table-header') as HTMLDivElement;
  const body = container.querySelector('.iui-table-body') as HTMLDivElement;

  expect(header.scrollLeft).toBe(0);
  expect(body.scrollLeft).toBe(0);

  fireEvent.scroll(body, {
    target: { scrollLeft: 100 },
  });

  expect(header.scrollLeft).toBe(100);
  expect(body.scrollLeft).toBe(100);
});

it.each([
  {
    testCase: 'dragging Name to View',
    srcIndex: 0,
    dstIndex: 2,
    resultingColumns: ['Description', 'View', 'Name'],
  },
  {
    testCase: 'dragging View to Name',
    srcIndex: 2,
    dstIndex: 0,
    resultingColumns: ['View', 'Name', 'Description'],
  },
  {
    testCase: 'dragging Name to itself and it should not change',
    srcIndex: 0,
    dstIndex: 0,
    resultingColumns: ['Name', 'Description', 'View'],
  },
  {
    testCase: 'dragging Name to Description',
    srcIndex: 0,
    dstIndex: 1,
    resultingColumns: ['Description', 'Name', 'View'],
  },
  {
    testCase: 'dragging View to Description',
    srcIndex: 2,
    dstIndex: 1,
    resultingColumns: ['Name', 'View', 'Description'],
  },
])(
  'should handle column reorder by $testCase',
  ({ srcIndex, dstIndex, resultingColumns }) => {
    const onSort = jest.fn();
    jest.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockReturnValue(0);
    jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(100);
    const { container, rerender } = render(
      <Table
        columns={columns()}
        data={mockedData()}
        emptyTableContent='Empty table'
        emptyFilteredTableContent='No results. Clear filter.'
        enableColumnReordering
        isSortable
        onSort={onSort}
      />,
    );

    const headerCells = container.querySelectorAll<HTMLDivElement>(
      '.iui-table-header .iui-cell',
    );
    headerCells.forEach((cell) =>
      expect(cell.getAttribute('draggable')).toBe('true'),
    );

    const srcColumn = headerCells[srcIndex];
    const dstColumn = headerCells[dstIndex];

    fireEvent.dragStart(srcColumn);
    fireEvent.dragEnter(dstColumn);
    fireEvent.dragOver(dstColumn);
    // If dragging over itself
    if (srcIndex === dstIndex) {
      expect(dstColumn).not.toHaveClass('iui-reorder-column-left');
      expect(dstColumn).not.toHaveClass('iui-reorder-column-right');
    } else {
      expect(dstColumn).toHaveClass(
        'iui-reorder-column-' + (srcIndex < dstIndex ? 'right' : 'left'),
      );
    }
    fireEvent.drop(dstColumn);

    // Should not trigger sort
    expect(onSort).not.toHaveBeenCalled();

    rerender(
      <Table
        columns={columns()}
        data={mockedData()}
        emptyTableContent='Empty table'
        emptyFilteredTableContent='No results. Clear filter.'
        enableColumnReordering
        isSortable
        onSort={onSort}
      />,
    );

    container
      .querySelectorAll<HTMLDivElement>('.iui-table-header .iui-cell')
      .forEach((cell, index) =>
        expect(cell.textContent).toBe(resultingColumns[index]),
      );
  },
);

it('should not have `draggable` attribute on columns with `disableReordering` enabled', () => {
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Header name',
      columns: [
        {
          id: 'name',
          Header: 'Name',
          accessor: 'name',
        },
        {
          id: 'description',
          Header: 'description',
          accessor: 'description',
        },
        {
          id: 'view',
          Header: 'view',
          Cell: () => 'View',
          disableReordering: true,
        },
      ],
    },
  ];
  const { container } = render(
    <Table
      columns={columns}
      data={mockedData()}
      emptyTableContent='Empty table'
      emptyFilteredTableContent='No results. Clear filter.'
      enableColumnReordering
      isSelectable
      subComponent={(row) => (
        <div>{`Expanded component, name: ${row.original.name}`}</div>
      )}
    />,
  );

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-cell',
  );
  expect(headerCells[0].getAttribute('draggable')).toBeFalsy(); // Selection column
  expect(headerCells[1].getAttribute('draggable')).toBeFalsy(); // Expander column
  expect(headerCells[2].getAttribute('draggable')).toBe('true'); // Name column
  expect(headerCells[3].getAttribute('draggable')).toBe('true'); // Description column
  expect(headerCells[4].getAttribute('draggable')).toBeFalsy(); // View column
});
