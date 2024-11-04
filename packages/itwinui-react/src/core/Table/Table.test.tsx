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
import * as React from 'react';
import { Table, type TableProps } from './Table.js';
import * as IntersectionHooks from '../../utils/hooks/useIntersection.js';
import {
  BaseFilter,
  FilterButtonBar,
  type TableFilterProps,
  tableFilters,
} from './filters/index.js';
import type { CellProps, Column, Row } from '../../react-table/react-table.js';
import { InputGroup } from '../InputGroup/InputGroup.js';
import { Radio } from '../Radio/Radio.js';
import {
  SvgChevronRight,
  SvgMore,
  SvgClose,
  SvgSortUp,
  SvgSortDown,
} from '../../utils/index.js';
import { DefaultCell, EditableCell } from './cells/index.js';
import { TablePaginator } from './TablePaginator.js';
import * as UseOverflow from '../../utils/hooks/useOverflow.js';
import { userEvent } from '@testing-library/user-event';
import {
  ActionColumn,
  SelectionColumn,
  ExpanderColumn,
} from './columns/index.js';

const intersectionCallbacks = new Map<Element, () => void>();
vi.spyOn(IntersectionHooks, 'useIntersection').mockImplementation(
  (onIntersect) => {
    return (el: HTMLElement) =>
      el && intersectionCallbacks.set(el, onIntersect);
  },
);

const mockIntersection = (element: Element) => {
  intersectionCallbacks.get(element)?.();
};

const columns = (onViewClick: () => void = vi.fn()): Column<TestDataType>[] => [
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
];
type TestDataType = {
  name: string;
  description: string;
  accessor?: string;
  subRows?: TestDataType[];
  booleanValue?: boolean;
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
  initialsProps?: Partial<TableProps>,
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

async function assertRowsData(rows: NodeListOf<Element>, data = mockedData()) {
  expect(rows.length).toBe(data.length);
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    const { name, description } = data[i];
    const cells = row.querySelectorAll('.iui-table-cell');
    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toEqual(name);
    expect(cells[1].textContent).toEqual(description);
    expect(cells[2].textContent).toEqual('View');
    await userEvent.click(cells[2].firstElementChild as HTMLElement);
  }
}

const setFilter = async (container: HTMLElement, value: string) => {
  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  await userEvent.click(filterIcon);

  const filterInput = document.querySelector(
    '.iui-table-column-filter input',
  ) as HTMLInputElement;
  expect(filterInput).toBeVisible();

  await userEvent.clear(filterInput);
  await userEvent.type(filterInput, value);
  await userEvent.click(screen.getByText('Filter'));

  expect(filterInput).not.toBeVisible();
};

const clearFilter = async (container: HTMLElement) => {
  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  await userEvent.click(filterIcon);

  await userEvent.click(screen.getByText('Clear'));
};

const BooleanFilter = (
  props: TableFilterProps<Record<string, unknown>>,
): JSX.Element => {
  const [value, setValue] = React.useState<boolean | undefined>(
    props.column.filterValue as boolean | undefined,
  );
  return (
    <BaseFilter>
      <InputGroup displayStyle='inline'>
        <Radio
          name='filterOption'
          onChange={() => setValue(true)}
          label='True'
          defaultChecked={value}
        />
        <Radio
          name='filterOption'
          onChange={() => setValue(false)}
          label='False'
          defaultChecked={value === false}
        />
      </InputGroup>
      <FilterButtonBar
        setFilter={() => props.setFilter(value)}
        clearFilter={props.clearFilter}
      />
    </BaseFilter>
  );
};

const expandAll = async (
  container: HTMLElement,
  oldExpanders: Element[] = [],
) => {
  const allExpanders = Array.from(
    container.querySelectorAll('.iui-table-row-expander'),
  );
  const newExpanders = allExpanders.filter((e) => !oldExpanders.includes(e));
  for (const button of newExpanders) {
    await userEvent.click(button);
  }
  if (newExpanders.length) {
    await expandAll(container, allExpanders);
  }
};

beforeEach(() => {
  intersectionCallbacks.clear();
});

it('should render table with data', async () => {
  const onViewClick = vi.fn();
  const { container } = renderComponent(undefined, onViewClick);

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows);
  expect(onViewClick).toHaveBeenCalledTimes(3);
});

it('should show spinner when loading', () => {
  const { container } = renderComponent({ data: [], isLoading: true });

  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(0);
});

it('should show table-body-extra with spinner when loading with pre-existing data', () => {
  const { container } = renderComponent({
    data: mockedData(),
    isLoading: true,
  });

  expect(
    container.querySelector(
      '.iui-table-body-extra[data-iui-loading="true"] .iui-progress-indicator-radial',
    ),
  ).toBeTruthy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
});

it('should show empty message when there is no data', () => {
  const { container } = renderComponent({ data: [] });

  screen.getByText('Empty table');
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
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
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        columnClassName: 'test-className',
      },
    ],
  });

  const column = container.querySelector(
    '.iui-table-header .iui-table-cell.test-className',
  );
  expect(column).toBeTruthy();
});

it('should render cell with custom className', () => {
  const { container } = renderComponent({
    columns: [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellClassName: 'test-className',
      },
    ],
  });

  const cell = container.querySelector(
    '.iui-table-body .iui-table-cell.test-className',
  );
  expect(cell).toBeTruthy();
});

it('should handle checkbox clicks', async () => {
  const onSelect = vi.fn();
  const { container } = renderComponent({ isSelectable: true, onSelect });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  expect(onSelect).not.toHaveBeenCalled();

  const checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);
  await userEvent.click(checkboxCells[2]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[1]], expect.any(Object));

  await userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith([], expect.any(Object));

  await userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(mockedData(), expect.any(Object));
});

it('should handle row clicks', async () => {
  const onSelect = vi.fn();
  const onRowClick = vi.fn();
  const user = userEvent.setup();
  const data = mockedData(8);

  const { container, getByText } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
    data,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(8);

  // Shift click special case test #1
  // By default, when no row is selected before shift click, start selecting from first row to clicked row
  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(getByText(data[1].name));

  expect(rows[0]).toHaveAttribute('aria-selected', 'true');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-selected');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onRowClick).toHaveBeenCalledTimes(1);

  await user.keyboard('{/Shift}'); // Release Shift
  await userEvent.click(getByText(data[2].name)); // Select; lastSelectedRowId = undefined -> 2

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).not.toHaveAttribute('aria-selected');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onRowClick).toHaveBeenCalledTimes(2);

  // Shift click special case test #2
  // When a row is clicked before shift click (lastSelectedRowId), selection starts from that row and ends at the currently clicked row
  // But if the startIndex > endIndex, then startIndex and endIndex are swapped
  // (Here startIndex = 1, endIndex = 0)
  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(getByText(data[0].name));

  expect(rows[0]).toHaveAttribute('aria-selected', 'true');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(3);
  expect(onRowClick).toHaveBeenCalledTimes(3);

  await user.keyboard('{/Shift}{Control>}'); // Release Shift & Hold Control
  await user.click(getByText(data[3].name)); // lastSelectedRowId = 2 -> 3 (Ctrl click updates lastSelectedRowId)
  expect(rows[0]).toHaveAttribute('aria-selected', 'true');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).toHaveAttribute('aria-selected', 'true');
  expect(onSelect).toHaveBeenCalledTimes(4);
  expect(onRowClick).toHaveBeenCalledTimes(4);

  await user.keyboard('{/Control}{Shift>}'); // Release Control & Hold Shift
  await user.click(getByText(data[4].name));

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).not.toHaveAttribute('aria-selected');
  expect(rows[2]).not.toHaveAttribute('aria-selected');
  expect(rows[3]).toHaveAttribute('aria-selected', 'true');
  expect(rows[4]).toHaveAttribute('aria-selected', 'true');
  expect(onSelect).toHaveBeenCalledTimes(5);
  expect(onRowClick).toHaveBeenCalledTimes(5);

  const checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(8);

  await user.keyboard('{/Shift}'); // Release Shift
  await user.click(checkboxes[1]); // lastSelectedRowId = 3 -> 1 (Checkbox click updates lastSelectedRowId)

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-selected');
  expect(rows[3]).toHaveAttribute('aria-selected', 'true');
  expect(rows[4]).toHaveAttribute('aria-selected', 'true');
  expect(onSelect).toHaveBeenCalledTimes(6);
  expect(onRowClick).toHaveBeenCalledTimes(5);

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(getByText(data[3].name));

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).toHaveAttribute('aria-selected', 'true');
  expect(rows[4]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(7);
  expect(onRowClick).toHaveBeenCalledTimes(6);

  await user.keyboard('{/Shift}'); // Release Shift
  await userEvent.click(getByText(data[2].name)); // Deselect; lastSelectedRowId = 1 -> 2

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-selected');
  expect(rows[3]).toHaveAttribute('aria-selected', 'true');
  expect(rows[4]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(8);
  expect(onRowClick).toHaveBeenCalledTimes(7);

  // Shift click special case test #3
  // Shift click makes makes all rows from lastSelectedRowId to clicked row to have the same selection state as the clicked row
  // So when lastSelectedRowId is un-selected, all rows in the shift select range are also unselected.
  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(getByText(data[0].name));

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).not.toHaveAttribute('aria-selected');
  expect(rows[2]).not.toHaveAttribute('aria-selected');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(rows[4]).not.toHaveAttribute('aria-selected');
  expect(onSelect).toHaveBeenCalledTimes(9);
  expect(onRowClick).toHaveBeenCalledTimes(8);

  await user.keyboard('{/Shift}{Control>}'); // Release Shift and Hold Control
  await user.click(getByText(data[4].name)); // lastSelectedRowId = 2 -> 4 (Ctrl click updates lastSelectedRowId)
  await user.keyboard('{Control>}'); // Keep holding Control
  await user.click(getByText(data[2].name)); // lastSelectedRowId = 4 -> 2 (Ctrl click updates lastSelectedRowId)
  await user.keyboard('{Control>}'); // Keep holding Control
  await user.click(getByText(data[7].name)); // lastSelectedRowId = 2-> 7 (Ctrl click updates lastSelectedRowId)

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).not.toHaveAttribute('aria-selected');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(rows[4]).toHaveAttribute('aria-selected', 'true');
  expect(rows[5]).not.toHaveAttribute('aria-selected');
  expect(rows[6]).not.toHaveAttribute('aria-selected');
  expect(rows[7]).toHaveAttribute('aria-selected', 'true');
  expect(onSelect).toHaveBeenCalledTimes(12);
  expect(onRowClick).toHaveBeenCalledTimes(11);

  // Ctrl + Shift click test
  // Previous selection (2, 4) should be preserved and added to new shift click selection (7 to 5)
  await user.keyboard('{Control>}{Shift>}'); // Hold Ctrl and Shift
  await user.click(getByText(data[5].name));

  expect(rows[0]).not.toHaveAttribute('aria-selected');
  expect(rows[1]).not.toHaveAttribute('aria-selected');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(rows[3]).not.toHaveAttribute('aria-selected');
  expect(rows[4]).toHaveAttribute('aria-selected', 'true');
  expect(rows[5]).toHaveAttribute('aria-selected', 'true');
  expect(rows[6]).toHaveAttribute('aria-selected', 'true');
  expect(rows[7]).toHaveAttribute('aria-selected', 'true');
  expect(onSelect).toHaveBeenCalledTimes(13);
  expect(onRowClick).toHaveBeenCalledTimes(12);
});

it('should handle sub-rows shift click selection', async () => {
  const onSelect = vi.fn();
  const onRowClick = vi.fn();
  const data = mockedSubRowsData();
  const { container, getByText } = renderComponent({
    data,
    onSelect,
    onRowClick,
    isSelectable: true,
  });
  const testIfCheckboxesChecked = (
    checkboxes: NodeListOf<HTMLInputElement>,
    checkedIndices: Array<number>,
    indeterminateIndices: Array<number>,
  ) => {
    Array.from(checkboxes).forEach((checkbox, index) => {
      expect(!!checkbox.checked).toBe(checkedIndices.includes(index));
      expect(!!checkbox.indeterminate).toBe(
        indeterminateIndices.includes(index),
      );
    });
  };

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await expandAll(container);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(10);

  const checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );

  const user = userEvent.setup();
  await user.click(getByText(data[0].subRows[0].name)); // [shiftKey: false]; lastSelectedRowId = 0.0
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onRowClick).toHaveBeenCalledTimes(1);
  testIfCheckboxesChecked(checkboxes, [1], [0]);

  await user.keyboard('[ShiftLeft>]'); // Press Shift (without releasing it)
  await user.click(getByText(data[0].subRows[1].subRows[0].name)); // [shiftKey: true]
  expect(onSelect).toHaveBeenCalledTimes(2);
  expect(onRowClick).toHaveBeenCalledTimes(2);
  testIfCheckboxesChecked(checkboxes, [1, 3], [0, 2]);

  await user.keyboard('[/ShiftLeft]'); // Release Shift
  await user.click(getByText(data[1].subRows[0].name)); // [shiftKey = true]; lastSelectedRowId = undefined -> 1.0
  expect(onSelect).toHaveBeenCalledTimes(3);
  expect(onRowClick).toHaveBeenCalledTimes(3);
  testIfCheckboxesChecked(checkboxes, [7], [6]);

  // When startIndex > endIndex, then startIndex and endIndex are swapped
  await user.keyboard('[ShiftLeft>]'); // Press Shift (without releasing it)
  await user.click(getByText(data[0].subRows[1].subRows[1].name)); // [shiftKey = true]
  expect(onSelect).toHaveBeenCalledTimes(4);
  expect(onRowClick).toHaveBeenCalledTimes(4);
  testIfCheckboxesChecked(checkboxes, [4, 5, 7], [0, 2, 6]);
});

it('should not select when clicked on row but selectRowOnClick flag is false', async () => {
  const onSelect = vi.fn();
  const onRowClick = vi.fn();
  const { container, getByText } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
    selectRowOnClick: false,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await userEvent.click(getByText(mockedData()[1].name));
  expect(onSelect).not.toHaveBeenCalled();
  expect(onRowClick).toHaveBeenCalled();
});

it('should not select when clicked on row and preventDefault is set', async () => {
  const onSelect = vi.fn();
  renderComponent({
    isSelectable: true,
    onSelect,
    rowProps: () => ({ onClick: (e) => e.preventDefault() }),
  });

  await userEvent.click(screen.getByText(mockedData()[1].name));
  expect(onSelect).not.toHaveBeenCalled();
});

it('should not trigger onSelect when sorting and filtering', async () => {
  const onSort = vi.fn();
  const onSelect = vi.fn();
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
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
    '.iui-table-header .iui-table-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();
  expect(nameHeader.classList).not.toContain('iui-sorted');

  await userEvent.click(nameHeader);
  expect(onSort).toHaveBeenCalled();
  expect(onSelect).not.toHaveBeenCalled();

  await setFilter(container, '2');
  expect(onFilter).toHaveBeenCalled();
  expect(onSelect).not.toHaveBeenCalled();
});

it('should not show sorting icon if sorting is disabled', () => {
  const { container } = renderComponent({
    isSortable: false,
  });

  expect(
    container.querySelector('.iui-table-cell-end-icon .iui-table-sort'),
  ).toBeFalsy();
});

it('should not show sort icon if data is loading', () => {
  const { container } = renderComponent({
    data: [],
    isSortable: true,
    isLoading: true,
  });

  expect(
    container.querySelector('.iui-table-cell-end-icon .iui-table-sort'),
  ).toBeFalsy();
});

it('should show sort icon if more data is loading', () => {
  const { container } = renderComponent({
    isSortable: true,
    isLoading: true,
  });

  expect(
    container.querySelector('.iui-table-cell-end-icon .iui-table-sort'),
  ).toBeTruthy();
});

it('should not show sort icon if data is empty', () => {
  const { container } = renderComponent({
    isSortable: true,
    data: [],
  });

  expect(
    container.querySelector('.iui-table-cell-end-icon .iui-table-sort'),
  ).toBeFalsy();
});

it('should sort name column correctly', async () => {
  const mocked = [
    { name: 'name1', description: 'Description1' },
    { name: 'name3', description: 'Description3' },
    { name: 'name2', description: 'Description2' },
  ];
  const sortedByName = [...mocked].sort((a, b) => (a.name > b.name ? 1 : -1));
  const onSort = vi.fn();
  const { container } = renderComponent({
    isSortable: true,
    data: mocked,
    onSort,
  });

  const nameHeader = container.querySelector(
    '.iui-table-header .iui-table-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();
  expect(nameHeader.classList).not.toContain('iui-sorted');
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');

  await assertRowsData(rows, mocked);

  const sortIcon = container.querySelector(
    '.iui-table-cell-end-icon .iui-table-sort',
  ) as HTMLDivElement;
  expect(sortIcon).toBeTruthy();

  //first click
  await userEvent.click(nameHeader);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(nameHeader.classList).toContain('iui-sorted');
  await assertRowsData(rows, sortedByName);
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
  await userEvent.click(nameHeader);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(nameHeader.classList).toContain('iui-sorted');
  await assertRowsData(rows, [...sortedByName].reverse());
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
  await userEvent.click(nameHeader);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(nameHeader.classList).not.toContain('iui-sorted');
  await assertRowsData(rows, mocked);
  expect(onSort).toHaveBeenCalledWith(
    expect.objectContaining({
      sortBy: [],
    }),
  );
});

it('should not show sort icon if disabled in column level', () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      disableSortBy: true,
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSortable: true,
  });

  expect(
    container.querySelector('.iui-table-sort .iui-icon-wrapper'),
  ).toBeFalsy();
});

it('should display correct sort icons for ascending first', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSortable: true,
  });
  const {
    container: { firstChild: sortUpIcon },
  } = render(<SvgSortUp className='iui-table-sort' aria-hidden />);
  const {
    container: { firstChild: sortDownIcon },
  } = render(<SvgSortDown className='iui-table-sort' aria-hidden />);
  const nameHeader = container.querySelector(
    '.iui-table-header .iui-table-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();

  // initial icon on column header
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortUpIcon,
  );

  // first click on column header
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortUpIcon,
  );

  // second click on column header
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortDownIcon,
  );

  // third click on column header to reset
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortUpIcon,
  );
});

it('should display correct sort icons for descending first', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      sortDescFirst: true,
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSortable: true,
  });
  const {
    container: { firstChild: sortUpIcon },
  } = render(<SvgSortUp className='iui-table-sort' aria-hidden />);
  const {
    container: { firstChild: sortDownIcon },
  } = render(<SvgSortDown className='iui-table-sort' aria-hidden />);
  const nameHeader = container.querySelector(
    '.iui-table-header .iui-table-cell',
  ) as HTMLDivElement;
  expect(nameHeader).toBeTruthy();

  // initial icon on column header
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortDownIcon,
  );

  // first click on column header
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortDownIcon,
  );

  // second click on column header
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortUpIcon,
  );

  // third click on column header to reset
  await userEvent.click(nameHeader);
  expect(container.querySelector('.iui-table-cell-end-icon > svg')).toEqual(
    sortDownIcon,
  );
});

it('should trigger onBottomReached', () => {
  const onBottomReached = vi.fn();
  const { container } = renderComponent({
    data: mockedData(50),
    onBottomReached,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(50);

  expect(onBottomReached).not.toHaveBeenCalled();
  expect(intersectionCallbacks.size).toBe(50);
  mockIntersection(rows[49]);

  expect(onBottomReached).toHaveBeenCalledTimes(1);
});

it('should trigger onBottomReached with filter applied', async () => {
  const onBottomReached = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    data: mockedData(50),
    onBottomReached,
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(50);

  await setFilter(container, '1');
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(14);

  expect(onBottomReached).not.toHaveBeenCalled();
  mockIntersection(rows[13]);

  expect(onBottomReached).toHaveBeenCalledTimes(1);
});

it('should trigger onRowInViewport', () => {
  const onRowInViewport = vi.fn();
  const { container } = renderComponent({
    data: mockedData(50),
    onRowInViewport,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(50);

  expect(onRowInViewport).not.toHaveBeenCalled();
  expect(intersectionCallbacks.size).toBe(50);
  for (let i = 0; i < 10; i++) {
    mockIntersection(rows[i]);
  }

  expect(onRowInViewport).toHaveBeenCalledTimes(10);
});

it('should filter table', async () => {
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({ columns: mockedColumns, onFilter });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, '2');

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(onFilter).toHaveBeenCalledWith(
    [{ fieldType: 'text', filterType: 'text', id: 'name', value: '2' }],
    expect.objectContaining({ filters: [{ id: 'name', value: '2' }] }),
    expect.arrayContaining([
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name2' }),
      }),
    ]),
  );
});

it('should filter false values', async () => {
  const columns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
    {
      id: 'booleanValue',
      Header: 'Bool Value',
      accessor: 'booleanValue',
      Filter: BooleanFilter,
      filter: 'equals',
    },
  ];

  const data = [
    { name: 'Name1', description: 'Description1', booleanValue: true },
    { name: 'Name2', description: 'Description2', booleanValue: false },
  ] as TestDataType[];

  const { container } = renderComponent({ columns, onFilter: vi.fn(), data });

  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;

  await userEvent.click(filterIcon);
  await userEvent.click(screen.getByText('False'));
  await userEvent.click(screen.getByText('Filter'));

  expect(screen.queryByText('Name1')).not.toBeInTheDocument();
  screen.getByText('Name2');
});

it('should not filter undefined values', async () => {
  const columns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
    {
      id: 'booleanValue',
      Header: 'Bool Value',
      accessor: 'booleanValue',
      Filter: BooleanFilter,
      filter: 'equals',
    },
  ];

  const data = [
    { name: 'Name1', description: 'Description1', booleanValue: true },
    { name: 'Name2', description: 'Description2', booleanValue: false },
    { name: 'Name3', description: 'Description2' },
  ] as TestDataType[];

  const { container } = renderComponent({ columns, onFilter: vi.fn(), data });

  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;

  await userEvent.click(filterIcon);
  await userEvent.click(screen.getByText('False'));
  await userEvent.click(screen.getByText('Filter'));

  expect(screen.queryByText('Name1')).not.toBeInTheDocument();
  screen.getByText('Name2');
  expect(screen.queryByText('Name3')).not.toBeInTheDocument();
});

it('should clear filter', async () => {
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    initialState: { filters: [{ id: 'name', value: '2' }] },
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);

  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
  await userEvent.click(filterIcon);

  const filterInput = document.querySelector(
    '.iui-table-column-filter input',
  ) as HTMLInputElement;
  expect(filterInput).toBeTruthy();
  expect(filterInput).toBeVisible();
  expect(filterInput.value).toEqual('2');

  await userEvent.click(screen.getByText('Clear'));
  expect(filterInput).not.toBeVisible();

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
  expect(onFilter).toHaveBeenCalledWith(
    [],
    expect.objectContaining({ filters: [] }),
    expect.arrayContaining([
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name1' }),
      }),
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name2' }),
      }),
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name3' }),
      }),
    ]),
  );
});

it('should not trigger onFilter when the same filter is applied', async () => {
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({ columns: mockedColumns, onFilter });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, '2');
  await setFilter(container, '2');
  expect(onFilter).toHaveBeenCalledTimes(1);
});

it('should not filter table when manualFilters flag is on', async () => {
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    manualFilters: true,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, '2');

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
  expect(onFilter).toHaveBeenCalledWith(
    [{ fieldType: 'text', filterType: 'text', id: 'name', value: '2' }],
    expect.objectContaining({ filters: [{ id: 'name', value: '2' }] }),
    expect.arrayContaining([
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name1' }),
      }),
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name2' }),
      }),
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name3' }),
      }),
    ]),
  );
});

it('should not show filter icon when filter component is not set', () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  const filterIcon = container.querySelector(
    '.iui-table-filter-button .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeFalsy();
});

it('should show active filter icon when more data is loading', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isLoading: true,
  });

  await setFilter(container, '2');

  const filterIcon = container.querySelector(
    '.iui-table-filter-button[data-iui-active="true"] .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
});

it('should show message and active filter icon when there is no data after filtering', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({ columns: mockedColumns });

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, 'invalid value');

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(0);
  screen.getByText('No results. Clear filter.');
  const filterIcon = container.querySelector(
    '.iui-table-filter-button[data-iui-active="true"] .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
});

it('should show message and active filter icon when there is no data after manual filtering', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
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
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, 'invalid value');

  rerender(
    <Table
      data={[]}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      emptyFilteredTableContent='No results. Clear filter.'
      manualFilters={true}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(0);
  screen.getByText('No results. Clear filter.');
  const filterIcon = container.querySelector(
    '.iui-table-filter-button[data-iui-active="true"] .iui-button-icon',
  ) as HTMLElement;
  expect(filterIcon).toBeTruthy();
});

it('should not filter if global filter is not set', async () => {
  const mockedColumns: Column<TestDataType>[] = [
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
  ];

  const data = mockedData();

  const { container } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={undefined}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
});

it('should update rows when global filter changes', async () => {
  const mockedColumns: Column<TestDataType>[] = [
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
  ];
  const data = mockedData();

  let globalFilterValue = 'Name2';

  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(rows.item(0).textContent).toContain('Description2');

  globalFilterValue = 'Name3';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(rows.item(0).textContent).toContain('Description3');
});

it('should filter rows with both global and column filters', async () => {
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
    },
  ];
  const data = [
    {
      name: 'Name11',
      description: 'Description11',
    },
    {
      name: 'Name12',
      description: 'Description12',
    },
    {
      name: 'Name22',
      description: 'Description22',
    },
  ];

  let globalFilterValue = '';
  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  globalFilterValue = 'Name1';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(2);
  expect(rows.item(0).textContent).toContain('Description11');
  expect(rows.item(1).textContent).toContain('Description12');

  await setFilter(container, '2');

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(rows.item(0).textContent).toContain('Description12');

  globalFilterValue = '';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(2);
  expect(rows.item(0).textContent).toContain('Description12');
  expect(rows.item(1).textContent).toContain('Description22');
});

it('should show empty filtered table content with global filter', async () => {
  const mockedColumns: Column<TestDataType>[] = [
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
  ];
  const data = mockedData();

  const emptyFilteredTableContent = 'Empty table filtered content';
  let globalFilterValue = 'Name2';

  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      emptyFilteredTableContent={emptyFilteredTableContent}
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(rows.item(0).textContent).toContain('Description2');

  globalFilterValue = 'Name4';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      emptyFilteredTableContent={emptyFilteredTableContent}
      globalFilterValue={globalFilterValue}
    />,
  );

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(0);
  expect(container.textContent).toContain(emptyFilteredTableContent);
});

it('should not show empty filtered table content when global filter is empty', async () => {
  const mockedColumns: Column<(typeof data)[number]>[] = [
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
  ];
  const data: { name: string; description: string }[] = [];

  const emptyFilteredTableContent = 'Empty table filtered content';
  const emptyTableContent = 'Empty table content';

  let globalFilterValue: string | undefined = undefined;

  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent={emptyTableContent}
      emptyFilteredTableContent={emptyFilteredTableContent}
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  expect(container.textContent).toContain(emptyTableContent);
  expect(container.textContent).not.toContain(emptyFilteredTableContent);

  globalFilterValue = '';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent={emptyTableContent}
      emptyFilteredTableContent={emptyFilteredTableContent}
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(container.textContent).toContain(emptyTableContent);
  expect(container.textContent).not.toContain(emptyFilteredTableContent);
});

it('should disable global filter column with disableGlobalFilter', async () => {
  const mockedColumns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      disableGlobalFilter: true,
    },
  ];
  const data = mockedData();

  let globalFilterValue = 'Name2';

  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(1);
  expect(rows.item(0).textContent).toContain('Description2');

  globalFilterValue = 'Description2';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(0);
});

it('should not global filter with manualGlobalFilter', async () => {
  const mockedColumns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      disableGlobalFilter: true,
    },
  ];
  const data = mockedData();

  let globalFilterValue = '';

  const { container, rerender } = render(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
      manualGlobalFilter={true}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  globalFilterValue = 'Description2';

  rerender(
    <Table
      data={data}
      columns={mockedColumns}
      emptyTableContent='Empty table'
      globalFilterValue={globalFilterValue}
      manualGlobalFilter={true}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
});

it('should not trigger sorting when filter is clicked', async () => {
  const onFilter = vi.fn();
  const onSort = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    onFilter,
    onSort,
    isSortable: true,
  });

  await setFilter(container, '2');

  expect(onFilter).toHaveBeenCalled();
  expect(onSort).not.toHaveBeenCalled();
});

it('should rerender table when columns change', async () => {
  const data = mockedData();
  const { rerender } = render(
    <Table
      columns={[
        {
          id: 'name',
          Header: 'Name',
          Cell: () => <>test1</>,
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
          id: 'name',
          Header: 'Name',
          Cell: () => <>test2</>,
        },
      ]}
      data={data}
      emptyTableContent='No data.'
    />,
  );
  expect(screen.getAllByText('test2').length).toBe(3);
});

it('should expand correctly', async () => {
  const onExpandMock = vi.fn();
  const { container, getByText } = renderComponent({
    subComponent: (row) => (
      <div>{`Expanded component, name: ${row.original.name}`}</div>
    ),
    onExpand: onExpandMock,
  });
  const {
    container: { firstChild: expanderIcon },
  } = render(<SvgChevronRight />);

  const buttonIcons = container.querySelectorAll(
    '.iui-button[data-iui-variant="borderless"] > .iui-button-icon',
  );

  expect(buttonIcons[0]).toHaveAttribute('aria-hidden', 'true');
  expect(buttonIcons[0].querySelector('svg')).toEqual(expanderIcon);

  await act(async () => {
    await userEvent.click(container.querySelectorAll('.iui-button')[0]);
  });

  getByText('Expanded component, name: Name1');
});

it('should show expandable content correctly after re-rendering', async () => {
  const data = mockedData();
  const getRowIdMock = vi.fn();
  const { rerender } = render(
    <Table
      columns={[
        {
          id: 'name',
          Header: 'Name',
          Cell: () => <>test1</>,
        },
      ]}
      data={data}
      emptyTableContent='No data.'
      subComponent={(row) => (
        <div>{`Expanded component, name: ${row.original.name}`}</div>
      )}
    />,
  );
  expect(screen.getAllByText('test1').length).toBe(3);

  rerender(
    <Table
      columns={[
        {
          id: 'name',
          Header: 'Name',
          Cell: () => <>test2</>,
        },
      ]}
      data={data}
      emptyTableContent='No data.'
      subComponent={(row) => (
        <div>{`Expanded component, name: ${row.original.name}`}</div>
      )}
      getRowId={getRowIdMock}
    />,
  );
  expect(screen.getAllByText('test2').length).toBe(3);

  await act(async () => {
    await userEvent.click(screen.getAllByRole('button')[0]);
  });

  screen.getByText('Expanded component, name: Name1');

  // getRowId is called for each row and sub-row before and after re-rendering.
  expect(getRowIdMock).toHaveBeenCalledTimes(12);
});

it('should expand correctly with a custom expander cell', async () => {
  const onExpandMock = vi.fn();
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

  await act(async () => {
    await userEvent.click(getByText('Expand Name1'));
    await userEvent.click(getByText('Expand Name2'));
  });

  getByText('Expanded component, name: Name1');
  getByText('Expanded component, name: Name2');

  await act(async () => {
    await userEvent.click(getByText('Expand Name1'));
    await userEvent.click(getByText('Expand Name3'));
  });
  await waitFor(() =>
    expect(queryByText('Expanded component, name: Name1')).toBeNull(),
  );
  getByText('Expanded component, name: Name2');
  getByText('Expanded component, name: Name3');
  expect(onExpandMock).toHaveBeenCalledTimes(4);
});

it('should disable row and handle expansion accordingly', async () => {
  const onExpand = vi.fn();
  const { container } = renderComponent({
    onExpand,
    subComponent: (row) => (
      <div>{`Expanded component, name: ${row.original.name}`}</div>
    ),
    isRowDisabled: (rowData) => rowData.name === 'Name2',
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
  expect(rows[0]).not.toHaveAttribute('aria-disabled', 'true');
  expect(rows[1]).toHaveAttribute('aria-disabled', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-disabled', 'true');

  const disabledRowCells = rows[1].querySelectorAll('.iui-table-cell');
  expect(disabledRowCells.length).toBe(4);
  disabledRowCells.forEach((cell) =>
    expect(cell).toHaveAttribute('aria-disabled', 'true'),
  );

  const expansionCells = container.querySelectorAll(
    '.iui-slot .iui-button',
  ) as NodeListOf<HTMLButtonElement>;
  expect(expansionCells.length).toBe(3);
  expect(expansionCells[0]).not.toHaveAttribute('aria-disabled');
  expect(expansionCells[1]).toHaveAttribute('aria-disabled', 'true');
  expect(expansionCells[2]).not.toHaveAttribute('aria-disabled');

  await userEvent.click(expansionCells[1]);
  expect(onExpand).not.toHaveBeenCalled();

  await userEvent.click(expansionCells[0]);
  expect(onExpand).toHaveBeenCalled();
});

it('should disable row and handle selection accordingly', async () => {
  const onSelect = vi.fn();
  const onRowClick = vi.fn();
  const { container } = renderComponent({
    isSelectable: true,
    onSelect,
    onRowClick,
    isRowDisabled: (rowData) => rowData.name === 'Name2',
  });

  expect(screen.queryByText('Header name')).toBeFalsy();
  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
  expect(rows[0]).not.toHaveAttribute('aria-disabled', 'true');
  expect(rows[1]).toHaveAttribute('aria-disabled', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-disabled', 'true');

  const disabledRowCells = rows[1].querySelectorAll('.iui-table-cell');
  expect(disabledRowCells.length).toBe(4);
  disabledRowCells.forEach((cell) =>
    expect(cell).toHaveAttribute('aria-disabled', 'true'),
  );

  const checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);
  expect(checkboxCells[0]).not.toBeDisabled();
  expect(checkboxCells[1]).not.toBeDisabled();
  expect(checkboxCells[2]).toBeDisabled();
  expect(checkboxCells[3]).not.toBeDisabled();

  // Select disabled row
  await userEvent.click(checkboxCells[2]);
  expect(onSelect).not.toHaveBeenCalled();
  expect(onRowClick).not.toHaveBeenCalled();

  // Select first row
  await userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0] as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);
  expect(headerCheckbox.checked).toBe(false);

  // Deselect all
  await userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith([], expect.any(Object));
  expect(headerCheckbox.indeterminate).toBe(false);
  expect(headerCheckbox.checked).toBe(false);

  // Select all
  await userEvent.click(checkboxCells[0]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[2]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(false);
  expect(headerCheckbox.checked).toBe(true);
});

it('should select and filter rows', async () => {
  const onSelect = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  const { container } = renderComponent({
    columns: mockedColumns,
    isSelectable: true,
    onSelect,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  let checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);

  // Select first row
  await userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith([mockedData()[0]], expect.any(Object));
  const headerCheckbox = checkboxCells[0] as HTMLInputElement;
  expect(headerCheckbox.indeterminate).toBe(true);

  // Filter table
  await setFilter(container, '2');
  expect(headerCheckbox.indeterminate).toBe(true);

  checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(2);

  // Select second row
  await userEvent.click(checkboxCells[1]);
  expect(onSelect).toHaveBeenCalledWith(
    [mockedData()[0], mockedData()[1]],
    expect.any(Object),
  );
  expect(headerCheckbox.indeterminate).toBe(true);

  // Clear filter
  await clearFilter(container);
  const checkboxInputs = container.querySelectorAll<HTMLInputElement>(
    '.iui-slot .iui-checkbox',
  );
  expect(checkboxInputs.length).toBe(4);
  expect(checkboxInputs[0].indeterminate).toBe(true);
  expect(checkboxInputs[1].checked).toBe(true);
  expect(checkboxInputs[2].checked).toBe(true);
  expect(checkboxInputs[3].checked).toBe(false);
});

it('should only select main row when subComponent is present', async () => {
  const logSpy = vitest.spyOn(console, 'log');
  const columns = [
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
  ];

  const data = mockedData();

  const { container } = renderComponent({
    columns,
    data,
    isSelectable: true,
    onSelect: (selectedRows) => console.log(selectedRows),
    subComponent: (row) => <div>{`Name ${row.original.name}`}</div>,
  });

  const checkboxCells = container.querySelectorAll('.iui-slot .iui-checkbox');
  expect(checkboxCells.length).toBe(4);

  await userEvent.click(checkboxCells[0]);
  expect(logSpy).toHaveBeenCalledWith(data);

  await userEvent.click(checkboxCells[1]);
  expect(logSpy).toHaveBeenCalledWith([data[1], data[2]]);

  await userEvent.click(checkboxCells[2]);
  expect(logSpy).toHaveBeenCalledWith([data[2]]);
});

it('should pass custom props to row', () => {
  const onMouseEnter = vi.fn();
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const rowProps = (row: Row<TestDataType>) => {
    return { onMouseEnter: () => onMouseEnter(row.original), ref: onRef };
  };
  const { container } = renderComponent({ rowProps });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
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
    expect(
      container.querySelector('.iui-table')?.getAttribute('data-iui-size'),
    ).toBe(density);
  },
);

it('should render sub-rows with padding-left of 12+30*(row depth) for condensed table', async () => {
  const onExpand = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onExpand,
    density: 'condensed',
  });

  await expandAll(container);

  const tableRows = container.querySelectorAll(
    '.iui-table-body .iui-table-row',
  );

  // First row has a row depth of zero, so padding-left is 12 + 30*0 = 12
  expect(tableRows[0].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 12px',
  );

  // Expanded sub-row has a row depth of two, so padding-left is 12 + 30*2 = 72
  expect(tableRows[1].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 72px',
  );

  // Second row has a row depth of one, so padding-left is 12 + 30*1 = 42
  expect(tableRows[2].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 42px',
  );
});

it('should render sub-rows with padding-left of 8+30*(row depth) for extra-condensed table', async () => {
  const onExpand = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onExpand,
    density: 'extra-condensed',
  });

  await expandAll(container);

  const tableRows = container.querySelectorAll(
    '.iui-table-body .iui-table-row',
  );

  // First row has a row depth of zero, so padding-left is 8 + 30*0 = 8
  expect(tableRows[0].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 8px',
  );

  // Expanded sub-row has a row depth of two, so padding-left is 8 + 30*2 = 68
  expect(tableRows[1].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 68px',
  );

  // Second row has a row depth of one, so padding-left is 8 + 30*1 = 38
  expect(tableRows[2].querySelector('.iui-table-cell')).toHaveStyle(
    'padding-inline-start: 38px',
  );
});

it('should render sub-rows and handle expansions', async () => {
  const onExpand = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({ data, onExpand });

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows, data);

  await expandAll(container);

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows, flattenData(data));

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

it('should render filtered sub-rows', async () => {
  const data = mockedSubRowsData();
  const columns = [
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
  ];
  const { container } = renderComponent({ data, columns });

  await expandAll(container);

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows, flattenData(data));

  await setFilter(container, '2');
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows, [
    { name: 'Row 1', description: 'Description 1' },
    { name: 'Row 1.2', description: 'Description 1.2' },
    { name: 'Row 1.2.1', description: 'Description 1.2.1' },
    { name: 'Row 1.2.2', description: 'Description 1.2.2' },
    { name: 'Row 2', description: 'Description 2' },
    { name: 'Row 2.1', description: 'Description 2.1' },
    { name: 'Row 2.2', description: 'Description 2.2' },
  ]);

  await clearFilter(container);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows, flattenData(data));
});

it('should handle sub-rows selection', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(3);
  await userEvent.click(checkboxes[0]);

  await expandAll(container);

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

it('should show indeterminate checkbox when some sub-rows are selected', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  // Click row 1.2 checkbox
  await userEvent.click(checkboxes[2]);

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

it('should show indeterminate checkbox when a sub-row of a sub-row is selected', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  // Click row 1.2.1 checkbox
  await userEvent.click(checkboxes[3]);

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

it('should show indeterminate checkbox when sub-row selected after filtering', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const columns = [
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
  ];
  const { container } = renderComponent({
    data,
    columns,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, '2');
  await expandAll(container);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(7);
  // Click row 1.2 checkbox
  await userEvent.click(checkboxes[1]);

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

it('should show indeterminate checkbox when clicking on a row itself after filtering', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const columns = [
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
  ];
  const { container } = renderComponent({
    data,
    columns,
    onSelect,
    isSelectable: true,
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await setFilter(container, '2');
  await expandAll(container);

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(7);
  // Click row 1
  await userEvent.click(rows[0]);

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

it('should only select one row even if it has sub-rows when selectSubRows is false', async () => {
  const onSelect = vi.fn();
  const data = mockedSubRowsData();
  const { container } = renderComponent({
    data,
    onSelect,
    isSelectable: true,
    selectSubRows: false,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  let checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(3);
  await userEvent.click(checkboxes[0]);

  await expandAll(container);

  checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(10);
  Array.from(checkboxes).forEach((checkbox, index) =>
    expect(!!checkbox.checked).toBe(index < 1),
  );

  expect(onSelect).toHaveBeenCalledWith([data[0]], expect.any(Object));
});

it('should render sub-rows with custom expander', async () => {
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

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  await userEvent.click(screen.getByText('Expand Row 1'));
  await userEvent.click(screen.getByText('Expand Row 1.2'));
  await userEvent.click(screen.getByText('Expand Row 2'));

  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(10);
});

it('should not disable select-all checkbox when all top-level rows are disabled but all subrows are not', () => {
  const { container } = renderComponent({
    data: mockedSubRowsData(),
    isSelectable: true,
    isRowDisabled: (rowData) =>
      ['Row 1', 'Row 2', 'Row 3'].includes(rowData.name as string),
  });
  const selectAllCheckbox = container.querySelector('input[type=checkbox]');
  expect(selectAllCheckbox).not.toBeDisabled();
  expect(selectAllCheckbox).not.toBeChecked();
});

it('should edit cell data', async () => {
  const onCellEdit = vi.fn();
  const columns: Column<TestDataType>[] = [
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
  ];
  const { container } = renderComponent({
    columns,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  await assertRowsData(rows);

  const editableCells = container.querySelectorAll(
    '.iui-table-cell[contenteditable]',
  );
  expect(editableCells).toHaveLength(3);

  fireEvent.input(editableCells[1], {
    target: { innerText: 'test data' },
  });
  fireEvent.blur(editableCells[1]);
  expect(onCellEdit).toHaveBeenCalledWith('name', 'test data', mockedData()[1]);

  fireEvent.input(editableCells[2], {
    target: { innerText: '' },
  });
  fireEvent.blur(editableCells[2]);
  expect(onCellEdit).toHaveBeenCalledWith('name', '', mockedData()[2]);
});

it('should handle unwanted actions on editable cell', async () => {
  const onCellEdit = vi.fn();
  const onSelect = vi.fn();
  const columns: Column<TestDataType>[] = [
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
  ];
  const { container } = renderComponent({
    columns,
    isSelectable: true,
    onSelect,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  const editableCells = container.querySelectorAll(
    '.iui-table-cell[contenteditable]',
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

  await userEvent.click(editableCells[1]);
  expect(onSelect).not.toHaveBeenCalled();
});

it('should render data in pages', async () => {
  vi.spyOn(UseOverflow, 'useOverflow').mockImplementation((itemsCount) => [
    vi.fn(),
    itemsCount,
  ]);
  const { container } = renderComponent({
    data: mockedData(100),
    pageSize: 10,
    paginatorRenderer: (props) => <TablePaginator {...props} />,
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows).toHaveLength(10);
  expect(rows[0].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name1',
  );
  expect(rows[9].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name10',
  );

  const pages = container.querySelectorAll<HTMLButtonElement>(
    '.iui-table-paginator .iui-table-paginator-page-button',
  );
  expect(pages).toHaveLength(10);
  await userEvent.click(pages[3]);
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows).toHaveLength(10);
  expect(rows[0].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name31',
  );
  expect(rows[9].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name40',
  );
});

it('should change page size', async () => {
  const { container } = renderComponent({
    data: mockedData(100),
    paginatorRenderer: (props) => (
      <TablePaginator {...props} pageSizeList={[10, 25, 50]} />
    ),
  });

  let rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows).toHaveLength(25);
  expect(rows[0].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name1',
  );
  expect(rows[24].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name25',
  );

  const pageSizeSelector = container.querySelector(
    '.iui-button-dropdown',
  ) as HTMLButtonElement;
  expect(pageSizeSelector).toBeTruthy();
  await userEvent.click(pageSizeSelector);

  await userEvent.click(screen.getByText('50 per page'));
  rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows).toHaveLength(50);
  expect(rows[0].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name1',
  );
  expect(rows[49].querySelector('.iui-table-cell')?.textContent).toEqual(
    'Name50',
  );
});

it('should render number of rows selected for paginator', async () => {
  const { container } = renderComponent({
    data: mockedSubRowsData(),
    pageSize: 2,
    paginatorRenderer: (props) => <TablePaginator {...props} />,
    isSelectable: true,
  });

  await expandAll(container);

  const rowCheckboxes = container.querySelectorAll(
    '.iui-table-body .iui-table-row .iui-checkbox',
  );

  expect(container.querySelector('.iui-left span')).toBeNull();

  fireEvent.click(rowCheckboxes[1]); // selects row 1.1
  expect(container.querySelector('.iui-left span')?.textContent).toBe(
    '1 row selected',
  );

  fireEvent.click(rowCheckboxes[2]); // selects rows 1.2, 1.2.1, and 1.2.2
  expect(container.querySelector('.iui-left span')?.textContent).toBe(
    '4 rows selected',
  );
});

it('should not show resizer when there are no next resizable columns', () => {
  const columns: Column<TestDataType>[] = [
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
      Cell: () => <>View</>,
      disableResizing: true,
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  const descriptionResizer = container.querySelector(
    '.iui-table-cell:nth-of-type(2) .iui-table-resizer',
  ) as HTMLDivElement;
  expect(descriptionResizer).toBeFalsy();
});

it('should not trigger sort when resizing', () => {
  const onSort = vi.fn();
  const columns: Column<TestDataType>[] = [
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
      Cell: () => <>View</>,
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
    isSortable: true,
    onSort,
  });

  const resizer = container.querySelector(
    '.iui-table-resizer',
  ) as HTMLDivElement;
  expect(resizer).toBeTruthy();
  fireEvent.click(resizer);
  expect(onSort).not.toHaveBeenCalled();
});

it('should not render resizer when resizer is disabled', () => {
  const { container } = renderComponent(undefined);

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );
  expect(headerCells).toHaveLength(3);

  const resizer = container.querySelector(
    '.iui-table-resizer',
  ) as HTMLDivElement;
  expect(resizer).toBeFalsy();
});

it('should render zebra striped table', () => {
  const { container } = renderComponent({ styleType: 'zebra-rows' });

  expect(
    container.querySelector('.iui-table-body.iui-zebra-striping'),
  ).toBeTruthy();
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
    const onSort = vi.fn();
    vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockReturnValue(0);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);

    const mockColumns = columns();
    const data = mockedData();

    const { container, rerender } = render(
      <Table
        columns={mockColumns}
        data={data}
        emptyTableContent='Empty table'
        emptyFilteredTableContent='No results. Clear filter.'
        enableColumnReordering
        isSortable
        onSort={onSort}
      />,
    );

    const headerCells = container.querySelectorAll<HTMLDivElement>(
      '.iui-table-header .iui-table-cell',
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
      expect(dstColumn).not.toHaveClass('iui-table-reorder-column-left');
      expect(dstColumn).not.toHaveClass('iui-table-reorder-column-right');
    } else {
      expect(dstColumn).toHaveClass(
        'iui-table-reorder-column-' + (srcIndex < dstIndex ? 'right' : 'left'),
      );
    }
    fireEvent.drop(dstColumn);

    // Should not trigger sort
    expect(onSort).not.toHaveBeenCalled();

    // Column order should be equal to resultingColumns
    container
      .querySelectorAll<HTMLDivElement>('.iui-table-header .iui-table-cell')
      .forEach((cell, index) =>
        expect(cell.textContent).toBe(resultingColumns[index]),
      );

    // New columns array contents to trigger below test
    const mockColumnsReverse = [...mockColumns].reverse();

    rerender(
      <Table
        // Passing any new columns array contents (e.g. reverse of columns) should reset columnOrder
        columns={mockColumnsReverse}
        data={data}
        emptyTableContent='Empty table'
        emptyFilteredTableContent='No results. Clear filter.'
        enableColumnReordering
        isSortable
        onSort={onSort}
      />,
    );

    // Column order should be equal to same order as the latest passed columns contents (mockColumnsReverse)
    // Since columnOrder should reset whenever columns contents change
    container
      .querySelectorAll<HTMLDivElement>('.iui-table-header .iui-table-cell')
      .forEach((cell, index) =>
        expect(cell.textContent).toBe(mockColumnsReverse[index].Header),
      );
  },
);

it('should respect initialState.columnOrder', () => {
  const mockColumns = columns();
  const columnOrder = ['description', 'view', 'name'];

  const { container } = render(
    <Table
      columns={mockColumns}
      data={mockedData()}
      emptyTableContent='Empty table'
      initialState={{ columnOrder }}
    />,
  );

  // DOM order should match columnOrder
  container
    .querySelectorAll<HTMLDivElement>('[role=columnheader]')
    .forEach((cell, index) =>
      expect(cell.textContent).toBe(
        mockColumns.find((c) => c.id === columnOrder[index])?.Header,
      ),
    );
});

it('should not have `draggable` attribute on columns with `disableReordering` enabled', () => {
  const columns: Column<TestDataType>[] = [
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
      Cell: () => <>View</>,
      disableReordering: true,
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
    '.iui-table-header .iui-table-cell',
  );
  expect(headerCells[0].getAttribute('draggable')).toBeFalsy(); // Selection column
  expect(headerCells[1].getAttribute('draggable')).toBeFalsy(); // Expander column
  expect(headerCells[2].getAttribute('draggable')).toBe('true'); // Name column
  expect(headerCells[3].getAttribute('draggable')).toBe('true'); // Description column
  expect(headerCells[4].getAttribute('draggable')).toBeFalsy(); // View column
});

it('should render empty action column', () => {
  const columns: Column<TestDataType>[] = [
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
      id: 'view',
      Header: 'View',
      Cell: () => <>View</>,
    },
    ActionColumn(),
  ];
  const { container } = renderComponent({
    columns,
  });

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );

  expect(headerCells).toHaveLength(4);
  // The ActionColumn header cell should not contain a Column Manager
  expect(headerCells[3].firstElementChild).toBeNull();
});

it('should render empty action column with column manager', async () => {
  const columns: Column<TestDataType>[] = [
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
      id: 'view',
      Header: 'View',
      Cell: () => <>View</>,
    },
    ActionColumn({ columnManager: true }),
  ];
  const { container } = renderComponent({
    columns,
  });

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );
  const columnManager = headerCells[headerCells.length - 1]
    .firstElementChild as Element;

  expect(columnManager.className.includes('iui-button')).toBeTruthy();
  expect(columnManager).toHaveAttribute('data-iui-variant', 'borderless');
  await userEvent.click(columnManager);

  expect(document.querySelector('[role="dialog"]')).toBeTruthy();

  const columnManagerColumns = document.querySelectorAll('label');
  expect(columnManagerColumns[0].textContent).toBe('Name');
  expect(columnManagerColumns[1].textContent).toBe('Description');
  expect(columnManagerColumns[2].textContent).toBe('View');
});

it('should render action column with column manager', async () => {
  const columns: Column<TestDataType>[] = [
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
      ...ActionColumn({ columnManager: true }),
      Cell: () => <>View</>,
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  expect(container.querySelectorAll('[role="columnheader"]').length).toBe(3);
  const actionColumn =
    container.querySelectorAll<HTMLInputElement>('.iui-slot');
  expect(
    actionColumn[0].firstElementChild?.className.includes('iui-button'),
  ).toBeTruthy();
  expect(actionColumn[0].firstElementChild).toHaveAttribute(
    'data-iui-variant',
    'borderless',
  );
  expect(actionColumn[1].textContent).toBe('View');
  expect(actionColumn[2].textContent).toBe('View');
  expect(actionColumn[3].textContent).toBe('View');

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );
  const columnManager = headerCells[headerCells.length - 1]
    .firstElementChild as Element;

  await userEvent.click(columnManager);

  const popover = document.querySelector('[role="dialog"]') as HTMLDivElement;
  expect(popover).toBeTruthy();
});

it('should render popover with custom style and override default style', async () => {
  const columns: Column<TestDataType>[] = [
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
      id: 'view',
      Header: 'View',
      Cell: () => <>View</>,
    },
    ActionColumn({
      columnManager: {
        dropdownMenuProps: {
          id: 'popover',
          className: 'testing-classname',
          style: {
            maxHeight: '600px',
            backgroundColor: 'red',
          },
          role: 'listbox',
        },
      },
    }),
  ];
  const { container } = renderComponent({
    columns,
  });

  const headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );
  const columnManager = headerCells[headerCells.length - 1]
    .firstElementChild as Element;

  expect(columnManager.className.includes('iui-button')).toBeTruthy();
  expect(columnManager).toHaveAttribute('data-iui-variant', 'borderless');

  await userEvent.click(columnManager);

  const popover = document.querySelector('#popover') as HTMLDivElement;
  expect(popover).toBeTruthy();
  expect(popover.classList.contains('testing-classname')).toBeTruthy();
  expect(popover).toHaveStyle('max-height: 600px');
  expect(popover.style.backgroundColor).toEqual('red');
  expect(popover).toHaveAttribute('role', 'listbox');
});

it('should hide column when deselected in column manager', async () => {
  const columns: Column<TestDataType>[] = [
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
      id: 'view',
      Header: 'View',
      Cell: () => <>View</>,
    },
    ActionColumn({ columnManager: true }),
  ];
  const { container } = renderComponent({
    columns,
  });

  let headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );

  expect(headerCells).toHaveLength(4);
  expect(headerCells[0].textContent).toBe('Name');
  expect(headerCells[1].textContent).toBe('Description');
  expect(headerCells[2].textContent).toBe('View');

  const columnManager = container.querySelector('.iui-button') as HTMLElement;
  await userEvent.click(columnManager);
  const columnManagerColumns = document.querySelectorAll<HTMLElement>('input');
  await userEvent.click(columnManagerColumns[1]);

  headerCells = container.querySelectorAll<HTMLDivElement>(
    '.iui-table-header .iui-table-cell',
  );

  expect(headerCells).toHaveLength(3);
  expect(headerCells[0].textContent).toBe('Name');
  expect(headerCells[1].textContent).toBe('View');
});

it('should be disabled in column manager if `disableToggleVisibility` is true', async () => {
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      disableToggleVisibility: true,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
    },
    {
      id: 'view',
      Header: 'View',
      Cell: () => <>View</>,
    },
    ActionColumn({ columnManager: true }),
  ];
  const { container } = renderComponent({
    columns,
  });

  const columnManager = container.querySelector('.iui-button') as HTMLElement;

  await userEvent.click(columnManager);
  const columnManagerColumns = document.querySelectorAll<HTMLElement>('label');
  expect(columnManagerColumns[0].classList).toContain('iui-disabled');
  expect(columnManagerColumns[0].querySelector('input')?.disabled).toBeTruthy();
});

it('should add selection column manually', () => {
  const onSelect = vi.fn();
  const isDisabled = (rowData: TestDataType) => rowData.name === 'Name2';
  const columns: Column<TestDataType>[] = [
    SelectionColumn({ isDisabled }),
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
  ];
  const { container } = renderComponent({
    columns,
    onSelect,
    isSelectable: true,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  const checkboxes = container.querySelectorAll<HTMLInputElement>(
    '.iui-table-body .iui-checkbox',
  );
  expect(checkboxes.length).toBe(3);
  expect(checkboxes[0].disabled).toBe(false);
  expect(checkboxes[1].disabled).toBe(true);
  expect(checkboxes[2].disabled).toBe(false);
  fireEvent.click(checkboxes[1]);
  expect(onSelect).toHaveBeenCalledWith(
    [{ name: 'Name2', description: 'Description2' }],
    expect.any(Object),
  );
});

it('should add expander column manually', () => {
  const onExpand = vi.fn();
  const subComponent = (row: Row<TestDataType>) => (
    <div>{`Expanded component, name: ${row.original.name}`}</div>
  );
  const isRowDisabled = (rowData: TestDataType) => rowData.name === 'Name2';
  const columns: Column<TestDataType>[] = [
    ExpanderColumn({ subComponent, isDisabled: isRowDisabled }),
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
  ];
  const { container } = renderComponent({
    columns,
    subComponent,
    onExpand,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  const expanders = container.querySelectorAll<HTMLButtonElement>(
    '.iui-table-row-expander',
  );
  expect(expanders.length).toBe(3);
  expect(expanders[0]).not.toHaveAttribute('aria-disabled');
  expect(expanders[1]).toHaveAttribute('aria-disabled', 'true');
  expect(expanders[2]).not.toHaveAttribute('aria-disabled');

  fireEvent.click(expanders[2]);
  expect(onExpand).toHaveBeenCalledWith(
    [{ name: 'Name3', description: 'Description3' }],
    expect.any(Object),
  );
});

it('should add disabled column', () => {
  const isCellDisabled = (rowData: TestDataType) => rowData.name === 'Name2';
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      cellRenderer: (props) => (
        <DefaultCell {...props} isDisabled={isCellDisabled} />
      ),
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const disabledCell = Array.from(
    container.querySelectorAll('.iui-table-cell'),
  ).find((e) => e.getAttribute('aria-disabled') === 'true');
  expect(disabledCell).toBeTruthy();
  expect(disabledCell && disabledCell.textContent).toBe('Name2');
});

it('should show column enabled when whole row is disabled', () => {
  const isCellDisabled = (rowData: TestDataType) => rowData.name !== 'Name2';
  const isRowDisabled = (rowData: TestDataType) => rowData.name === 'Name2';
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      cellRenderer: (props) => (
        <DefaultCell {...props} isDisabled={isCellDisabled} />
      ),
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
    },
  ];
  const { container } = renderComponent({
    columns,
    isRowDisabled,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);
  expect(rows[0]).not.toHaveAttribute('aria-disabled', 'true');
  expect(rows[1]).toHaveAttribute('aria-disabled', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-disabled', 'true');

  const rowCells = rows[1].querySelectorAll('.iui-table-cell');
  expect(rowCells.length).toBe(2);
  expect(rowCells[0]).not.toHaveAttribute('aria-disabled', 'true');
  expect(rowCells[1]).toHaveAttribute('aria-disabled', 'true');
});

it('should render selectable rows without select column', async () => {
  const onRowClick = vi.fn();
  const { container, getByText } = renderComponent({
    isSelectable: true,
    selectionMode: 'single',
    onRowClick,
  });

  const rows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(rows.length).toBe(3);

  expect(container.querySelectorAll('.iui-slot .iui-checkbox').length).toBe(0);

  await userEvent.click(getByText(mockedData()[1].name));
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(onRowClick).toHaveBeenCalledTimes(1);

  await userEvent.click(getByText(mockedData()[2].name));
  expect(rows[1]).not.toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).toHaveAttribute('aria-selected', 'true');
  expect(onRowClick).toHaveBeenCalledTimes(2);

  //Test that ctrl clicking doesn't highlight more than one row
  const user = userEvent.setup();
  await user.keyboard('[ControlLeft>]'); // Press Control (without releasing it)
  await user.click(getByText(mockedData()[1].name)); // Perform a click with `ctrlKey: true`
  expect(rows[1]).toHaveAttribute('aria-selected', 'true');
  expect(rows[2]).not.toHaveAttribute('aria-selected', 'true');
  expect(onRowClick).toHaveBeenCalledTimes(3);
});

it('should render sticky columns correctly', () => {
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 100,
      sticky: 'right',
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const leftSideStickyCells = container.querySelectorAll(
    '.iui-table-cell-sticky:first-of-type',
  );
  expect(leftSideStickyCells.length).toBe(4);
  leftSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeFalsy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeFalsy();
  });

  const rightSideStickyCells = container.querySelectorAll(
    '.iui-table-cell-sticky:last-of-type',
  );
  expect(rightSideStickyCells.length).toBe(4);
  rightSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeTruthy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeFalsy();
  });

  // Scroll a bit to the right
  const table = container.querySelector('.iui-table') as HTMLDivElement;
  fireEvent.scroll(table, {
    target: { scrollLeft: 100 },
  });

  expect(leftSideStickyCells.length).toBe(4);
  leftSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeFalsy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeTruthy();
  });

  expect(rightSideStickyCells.length).toBe(4);
  rightSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeTruthy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeFalsy();
  });

  // Scroll to the very right
  fireEvent.scroll(table, {
    target: { scrollLeft: 400 },
  });

  expect(leftSideStickyCells.length).toBe(4);
  leftSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeFalsy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeTruthy();
  });

  expect(rightSideStickyCells.length).toBe(4);
  rightSideStickyCells.forEach((cell) => {
    expect(cell.querySelector('.iui-table-cell-shadow-left')).toBeFalsy();
    expect(cell.querySelector('.iui-table-cell-shadow-right')).toBeFalsy();
  });
});

it('should have correct sticky left style property', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 100,
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:first-of-type',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  const descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 400px');
  });
});

it('should have correct sticky left style property when prior column does not have sticky prop', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 100,
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:first-of-type',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  const descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 400px');
  });
});

it('should have correct sticky right style property', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
      sticky: 'right',
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 400,
      sticky: 'right',
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-right: 400px');
  });

  const viewCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(3)',
  );
  expect(viewCells.length).toBe(4);
  viewCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-right: 0px');
  });
});

it('should have correct sticky right style property when column after does not have sticky prop', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
      sticky: 'right',
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 400,
    },
  ];
  const { container } = renderComponent({
    columns,
  });

  const descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-right: 400px');
  });

  const viewCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(3)',
  );
  expect(viewCells.length).toBe(4);
  viewCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-right: 0px');
  });
});

it('should have correct sticky left style property after resizing', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 100,
    },
  ];
  const { container } = renderComponent({
    columns,
    isResizable: true,
  });

  const nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:first-of-type',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  const descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell-sticky:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 400px');
  });

  // Resize
  const resizer = container.querySelector(
    '.iui-table-resizer',
  ) as HTMLDivElement;
  expect(resizer).toBeTruthy();

  fireEvent.mouseDown(resizer, { clientX: 400 });
  fireEvent.mouseMove(resizer, { clientX: 450 });
  fireEvent.mouseUp(resizer);

  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 450px');
  });
});

it('should make column sticky and then non-sticky after dragging sticky column ahead of it and back', () => {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 400,
  } as DOMRect);
  vi.spyOn(HTMLDivElement.prototype, 'scrollWidth', 'get').mockReturnValue(900);
  vi.spyOn(HTMLDivElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
  const columns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 400,
      sticky: 'left',
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      width: 400,
    },
    {
      id: 'view',
      Header: 'view',
      Cell: () => <>View</>,
      width: 100,
    },
  ];
  const { container } = renderComponent({
    columns,
    enableColumnReordering: true,
  });

  let nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:first-of-type',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  let descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).not.toHaveStyle('--iui-table-sticky-left: 400px');
  });

  // Dragging sticky Name column ahead of Description column
  fireEvent.dragStart(nameCells[0]);
  fireEvent.dragEnter(descriptionCells[0]);
  fireEvent.dragOver(descriptionCells[0]);
  fireEvent.drop(descriptionCells[0]);

  nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:nth-of-type(2)',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 400px');
  });

  descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:first-of-type',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  // Dragging Name column back to the beginning
  fireEvent.dragStart(nameCells[0]);
  fireEvent.dragEnter(descriptionCells[0]);
  fireEvent.dragOver(descriptionCells[0]);
  fireEvent.drop(descriptionCells[0]);

  nameCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:first-of-type',
  );
  expect(nameCells.length).toBe(4);
  nameCells.forEach((cell) => {
    expect(cell).toHaveStyle('--iui-table-sticky-left: 0px');
  });

  descriptionCells = container.querySelectorAll<HTMLElement>(
    '.iui-table-cell:nth-of-type(2)',
  );
  expect(descriptionCells.length).toBe(4);
  descriptionCells.forEach((cell) => {
    expect(cell).not.toHaveStyle('--iui-table-sticky-left: 400px');
  });
});

it('should render start and end cell icons', () => {
  const testColumns: Column<TestDataType>[] = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      cellRenderer: (props) => {
        return <DefaultCell {...props} startIcon={<SvgClose />} />;
      },
    },
    {
      id: 'description',
      Header: 'description',
      accessor: 'description',
      cellRenderer: (props) => {
        return <DefaultCell {...props} endIcon={<SvgMore />} />;
      },
    },
  ];
  const { container } = renderComponent({
    columns: testColumns,
  });

  const {
    container: { firstChild: closeIcon },
  } = render(<SvgClose />);
  const {
    container: { firstChild: moreIcon },
  } = render(<SvgMore />);

  const row = container.querySelector(
    '.iui-table-body .iui-table-row',
  ) as HTMLDivElement;
  const cells = row.querySelectorAll('.iui-table-cell');

  const startIcon = cells[0].querySelector(
    '.iui-table-cell-start-icon',
  ) as HTMLDivElement;
  expect(startIcon).toBeTruthy();
  expect(startIcon.querySelector('svg')).toEqual(closeIcon);

  const endIcon = cells[1].querySelector(
    '.iui-table-cell-end-icon',
  ) as HTMLDivElement;
  expect(endIcon).toBeTruthy();
  expect(endIcon.querySelector('svg')).toEqual(moreIcon);
});

it.each(['positive', 'warning', 'negative'] as const)(
  'should render cell with %s status',
  (status) => {
    const columns: Column<TestDataType>[] = [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props) => {
          return <DefaultCell {...props} status={status} />;
        },
      },
      {
        id: 'description',
        Header: 'description',
        accessor: 'description',
      },
    ];
    const { container } = renderComponent({
      columns,
    });

    const row = container.querySelector(
      '.iui-table-body .iui-table-row',
    ) as HTMLDivElement;
    const cells = row.querySelectorAll('.iui-table-cell');

    expect(cells[0]).toHaveAttribute('data-iui-status', status);
    expect(cells[1]).not.toHaveAttribute('data-iui-status', status);
  },
);

it.each(['positive', 'warning', 'negative'] as const)(
  'should render row with %s status',
  (rowStatus) => {
    const { container } = renderComponent({
      rowProps: (row) => {
        return {
          status: row.index === 0 ? rowStatus : undefined,
        };
      },
    });

    const tableBody = container.querySelector(
      '.iui-table-body',
    ) as HTMLDivElement;
    const rows = tableBody.querySelectorAll('.iui-table-row');
    expect(rows[0]).toHaveAttribute('data-iui-status', rowStatus);
    expect(rows[1]).not.toHaveAttribute('data-iui-status', rowStatus);
  },
);

it('should render row with loading status', () => {
  const { container } = renderComponent({
    rowProps: (row) => {
      return {
        isLoading: row.index === 0 ? true : undefined,
      };
    },
  });

  const tableBody = container.querySelector(
    '.iui-table-body',
  ) as HTMLDivElement;
  const rows = tableBody.querySelectorAll('.iui-table-row');
  expect(rows[0]).toHaveClass(`iui-loading`);
  expect(rows[1]).not.toHaveClass(`iui-loading`);
});

it('should navigate through table filtering with the keyboard', async () => {
  const onFilter = vi.fn();
  const mockedColumns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
      fieldType: 'text',
    },
  ];
  renderComponent({
    columns: mockedColumns,
    onFilter,
  });

  await userEvent.tab(); // tab to filter icon button
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard('2');
  await userEvent.tab(); // tab to filter menu 'Filter' submit button
  await userEvent.keyboard('{Enter}');
  expect(onFilter).toHaveBeenCalledWith(
    [{ fieldType: 'text', filterType: 'text', id: 'name', value: '2' }],
    expect.objectContaining({ filters: [{ id: 'name', value: '2' }] }),
    expect.arrayContaining([
      expect.objectContaining({
        values: expect.objectContaining({ name: 'Name2' }),
      }),
    ]),
  );
});

it('should ignore top-level Header if one is passed', async () => {
  const data = mockedData();
  const { container } = render(
    <Table
      data={data}
      emptyTableContent='nothing to see here'
      columns={[
        {
          Header: 'Header name',
          // We expect to get `columns` does not exist type error.
          // Because although `columns` is removed from the Column type (i.e. no sub-columns),
          // we allow to pass `columns` in the top level Header for backward compatibility.
          // (#1072: https://github.com/iTwin/iTwinUI/pull/1072)
          // @ts-expect-error - `columns` does not exist in type ...
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
      ]}
    />,
  );

  expect(screen.queryByText('Header name')).toBeFalsy();

  const headerRows = container.querySelectorAll(
    '.iui-table-header .iui-table-row',
  );
  expect(headerRows).toHaveLength(1);
  const headerCells = headerRows[0]?.querySelectorAll('.iui-table-cell');
  expect(headerCells).toHaveLength(2);
  expect(headerCells[0].textContent).toEqual('Name');
  expect(headerCells[1].textContent).toEqual('Description');

  const bodyRows = container.querySelectorAll('.iui-table-body .iui-table-row');
  expect(bodyRows).toHaveLength(data.length);
  bodyRows.forEach((row, i) => {
    const { name, description } = data[i];
    const cells = row.querySelectorAll('.iui-table-cell');
    expect(cells).toHaveLength(2);
    expect(cells[0].textContent).toEqual(name);
    expect(cells[1].textContent).toEqual(description);
  });
});

it('should pass custom props to different parts of Table', () => {
  const { container } = renderComponent({
    data: [],
    headerWrapperProps: {
      className: 'custom-header-wrapper-class',
      style: { fontSize: 12 },
    },
    headerProps: { className: 'custom-header-class', style: { fontSize: 14 } },
    bodyProps: { className: 'custom-body-class', style: { width: 80 } },
    emptyTableContentProps: {
      className: 'custom-empty-table-content-class',
      style: { fontSize: 12 },
    },
  });

  // Test for Table header wrapper
  const headerWrapperElement = container.querySelector(
    '.iui-table-header-wrapper.custom-header-wrapper-class',
  ) as HTMLElement;
  expect(headerWrapperElement).toBeTruthy();
  expect(headerWrapperElement.style.fontSize).toBe('12px');

  // Test for Table header
  const headerElement = container.querySelector(
    '.iui-table-header.custom-header-class',
  ) as HTMLElement;
  expect(headerElement).toBeTruthy();
  expect(headerElement.style.fontSize).toBe('14px');

  // Test for Table body
  const bodyElement = container.querySelector(
    '.iui-table-body.custom-body-class',
  ) as HTMLElement;
  expect(bodyElement).toBeTruthy();

  // Test for Empty Table Content
  const emptyTableContent = container.querySelector(
    '.iui-table-empty.custom-empty-table-content-class',
  ) as HTMLElement;
  expect(emptyTableContent).toBeTruthy();
  expect(emptyTableContent.style.fontSize).toBe('12px');
});

it('should apply clamp, if cell is string value and no custom Cell is rendered', () => {
  const data = [{ name: 'name' }];
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      cellClassName: 'test-cell',
    },
  ];
  const { container } = renderComponent({
    columns,
    data,
  });
  const host = container.querySelector('.test-cell');
  expect(host?.shadowRoot).toBeTruthy();
  const lineClamp = host?.shadowRoot?.querySelector('div');
  expect(lineClamp).toBeTruthy();
});

it('should not apply clamp, if custom Cell is used', () => {
  const data = [{ name: 'name' }];
  const columns: Column<TestDataType>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      cellClassName: 'test-cell',
      Cell: () => 'my custom content',
    },
  ];
  const { container } = renderComponent({
    columns,
    data,
  });
  const host = container.querySelector('.test-cell');
  expect(host?.shadowRoot).toBeTruthy();
  const lineClamp = host?.shadowRoot?.querySelector('div');
  expect(lineClamp).toBeNull();
});
