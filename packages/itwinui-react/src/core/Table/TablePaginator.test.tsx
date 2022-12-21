/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TablePaginator, TablePaginatorProps } from './TablePaginator';
import * as UseOverflow from '../utils/hooks/useOverflow';
import * as UseContainerWidth from '../utils/hooks/useContainerWidth';
import userEvent from '@testing-library/user-event';

const renderComponent = (props?: Partial<TablePaginatorProps>) => {
  return render(
    <TablePaginator
      currentPage={0}
      pageSize={10}
      totalRowsCount={195}
      onPageChange={jest.fn()}
      onPageSizeChange={jest.fn()}
      {...props}
    />,
  );
};

beforeEach(() => {
  jest
    .spyOn(UseOverflow, 'useOverflow')
    .mockImplementation((items) => [jest.fn(), items.length]);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should render in its most basic form', () => {
  const { container } = renderComponent();

  const pages = container.querySelectorAll('.iui-table-paginator-page-button');
  expect(pages).toHaveLength(20);
  expect(pages[0]).toHaveAttribute('data-iui-active', 'true');

  const previousPageButton = screen.getByLabelText(
    'Previous page',
  ) as HTMLButtonElement;
  expect(previousPageButton.disabled).toBe(true);
  const nextPageButton = screen.getByLabelText(
    'Next page',
  ) as HTMLButtonElement;
  expect(nextPageButton.disabled).toBe(false);

  expect(container.querySelector('.iui-dropdown')).toBeFalsy();
});

it('should render currently visible rows info and page size selector', async () => {
  const onPageSizeChange = jest.fn();
  const pageSizeList = [10, 25, 50];
  const { container } = renderComponent({
    currentPage: 19,
    pageSizeList,
    onPageSizeChange,
  });

  const pages = container.querySelectorAll('.iui-table-paginator-page-button');
  expect(pages).toHaveLength(20);
  expect(pages[19]).toHaveAttribute('data-iui-active', 'true');

  const pageSizeSelector = container.querySelector(
    '.iui-button-dropdown',
  ) as HTMLButtonElement;
  expect(pageSizeSelector).toBeTruthy();
  expect(pageSizeSelector.textContent).toEqual('191-195 of 195');

  await userEvent.click(pageSizeSelector);
  const pageSizeSelections = document.querySelectorAll('.iui-menu-item');
  expect(pageSizeSelections).toHaveLength(3);
  pageSizeSelections.forEach((el, index) => {
    expect(el.textContent).toEqual(`${pageSizeList[index]} per page`);
    expect(el.classList.contains('iui-active')).toBe(index === 0);
  });

  await userEvent.click(pageSizeSelections[1]);
  expect(onPageSizeChange).toHaveBeenCalledWith(25);
});

it('should render without page list', () => {
  const { container } = renderComponent({
    totalRowsCount: 10,
    pageSizeList: [10, 25, 50],
  });
  const pageSizeSelector = container.querySelector(
    '.iui-button-dropdown',
  ) as HTMLButtonElement;

  expect(pageSizeSelector).toBeTruthy();
  expect(pageSizeSelector.textContent).toEqual('1-10 of 10');

  const paginator = container.querySelector('.iui-center') as HTMLElement;
  expect(paginator).not.toBeTruthy();
});

it('should render without page list and page size list', () => {
  const { container } = renderComponent({ totalRowsCount: 10 });

  const paginator = container.querySelector(
    '.iui-table-paginator',
  ) as HTMLElement;
  expect(paginator).not.toBeTruthy();
});

it('should render loading state when there is data', () => {
  const { container } = renderComponent({
    currentPage: 19,
    pageSizeList: [10, 25, 50],
    onPageSizeChange: jest.fn(),
    isLoading: true,
  });

  const pages = container.querySelectorAll('.iui-table-paginator-page-button');
  expect(pages).toHaveLength(20);
  expect(pages[19]).toHaveAttribute('data-iui-active', 'true');
  expect(container.querySelector('.iui-table-paginator-ellipsis')).toBeTruthy();
  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();

  const nextPageButton = screen.getByLabelText(
    'Next page',
  ) as HTMLButtonElement;
  expect(nextPageButton.disabled).toBe(true);
  const pageSizeSelector = container.querySelector(
    '.iui-button-dropdown',
  ) as HTMLButtonElement;
  expect(pageSizeSelector).toBeTruthy();
  expect(pageSizeSelector.textContent).toEqual('191-195…');
});

it('should render loading state when there is no data', () => {
  const { container } = renderComponent({
    totalRowsCount: 0,
    pageSizeList: [10, 25, 50],
    onPageSizeChange: jest.fn(),
    isLoading: true,
  });

  const pages = container.querySelectorAll<HTMLButtonElement>(
    '.iui-table-paginator-page-button',
  );
  expect(pages).toHaveLength(0);
  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();

  const previousPageButton = screen.getByLabelText(
    'Previous page',
  ) as HTMLButtonElement;
  expect(previousPageButton.disabled).toBe(true);
  const nextPageButton = screen.getByLabelText(
    'Next page',
  ) as HTMLButtonElement;
  expect(nextPageButton.disabled).toBe(true);

  expect(container.querySelector('.iui-dropdown')).toBeFalsy();
});

it('should handle clicks', async () => {
  const onPageChange = jest.fn();
  const { container } = renderComponent({ currentPage: 5, onPageChange });

  const pages = container.querySelectorAll<HTMLButtonElement>(
    '.iui-table-paginator-page-button',
  );
  expect(pages).toHaveLength(20);
  expect(pages[5]).toHaveAttribute('data-iui-active', 'true');

  const previousPageButton = screen.getByLabelText(
    'Previous page',
  ) as HTMLButtonElement;
  expect(previousPageButton.disabled).toBe(false);
  const nextPageButton = screen.getByLabelText(
    'Next page',
  ) as HTMLButtonElement;
  expect(nextPageButton.disabled).toBe(false);

  await userEvent.click(pages[10]);
  expect(onPageChange).toHaveBeenCalledWith(10);
  await userEvent.click(previousPageButton);
  expect(onPageChange).toHaveBeenCalledWith(4);
  await userEvent.click(nextPageButton);
  expect(onPageChange).toHaveBeenCalledWith(6);
});

it('should render truncated pages list', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 5]);
  const { container } = renderComponent({ currentPage: 10 });

  const pages = container.querySelectorAll('.iui-table-paginator-page-button');
  expect(pages).toHaveLength(7);
  expect(pages[0].textContent).toEqual('1');
  expect(pages[1].textContent).toEqual('9');
  expect(pages[2].textContent).toEqual('10');
  expect(pages[3].textContent).toEqual('11');
  expect(pages[3]).toHaveAttribute('data-iui-active', 'true');
  expect(pages[4].textContent).toEqual('12');
  expect(pages[5].textContent).toEqual('13');
  expect(pages[6].textContent).toEqual('20');

  const ellipsis = container.querySelectorAll('.iui-table-paginator-ellipsis');
  expect(ellipsis).toHaveLength(2);
});

it('should render only the current page when screen is very small', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 1]);
  const { container } = renderComponent({ currentPage: 10 });

  const pages = container.querySelectorAll('.iui-table-paginator-page-button');
  expect(pages).toHaveLength(1);
  expect(pages[0].textContent).toEqual('11');
  expect(pages[0]).toHaveAttribute('data-iui-active', 'true');

  const ellipsis = container.querySelectorAll('.iui-table-paginator-ellipsis');
  expect(ellipsis).toHaveLength(0);
});

it('should handle keyboard navigation when focusActivationMode is auto', () => {
  const onPageChange = jest.fn();
  const { container } = renderComponent({
    currentPage: 10,
    onPageChange,
    focusActivationMode: 'auto',
  });

  const buttonGroup = container.querySelector(
    '.iui-table-paginator-pages-group',
  ) as HTMLElement;
  expect(buttonGroup).toBeTruthy();

  // 11 -> 10
  fireEvent.keyDown(buttonGroup, { key: 'ArrowLeft' });
  expect(onPageChange).toHaveBeenCalledWith(9);

  // 11 -> 12
  fireEvent.keyDown(buttonGroup, { key: 'ArrowRight' });
  expect(onPageChange).toHaveBeenCalledWith(11);
});

it('should handle keyboard navigation when focusActivationMode is manual', () => {
  const onPageChange = jest.fn();
  const { container } = renderComponent({
    currentPage: 10,
    onPageChange,
    focusActivationMode: 'manual',
  });

  const buttonGroup = container.querySelector(
    '.iui-table-paginator-pages-group',
  ) as HTMLElement;
  expect(buttonGroup).toBeTruthy();

  // 11 -> 10
  fireEvent.keyDown(buttonGroup, { key: 'ArrowLeft' });
  expect(document.activeElement?.textContent).toEqual('10');

  // 10 -> 1
  for (let i = 9; i >= 0; i--) {
    fireEvent.keyDown(buttonGroup, { key: 'ArrowLeft' });
  }
  expect(document.activeElement?.textContent).toEqual('1');

  fireEvent.keyDown(buttonGroup, { key: 'Enter' });
  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(0);
});

it('should render elements in small size', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 5]);
  const { container } = renderComponent({
    size: 'small',
    pageSizeList: [10, 25, 50],
    currentPage: 10,
    onPageSizeChange: jest.fn(),
  });

  const pageSwitchers = container.querySelectorAll('.iui-button');
  expect(
    Array.from(pageSwitchers).every(
      (p) => p.getAttribute('data-iui-size') === 'small',
    ),
  ).toBe(true);

  const pages = container.querySelectorAll(
    '.iui-table-paginator-page-button-small',
  );
  expect(pages).toHaveLength(7);

  const ellipsis = container.querySelectorAll(
    '.iui-table-paginator-ellipsis-small',
  );
  expect(ellipsis).toHaveLength(2);
});

it('should render with custom localization', async () => {
  jest
    .spyOn(UseContainerWidth, 'useContainerWidth')
    .mockImplementation(() => [jest.fn(), 2000]);

  const pageSizeList = [10, 25, 50];
  const { container } = renderComponent({
    pageSizeList,
    onPageSizeChange: jest.fn(),
    totalSelectedRowsCount: 5,
    localization: {
      pageSizeLabel: (size: number) => `${size} per test page`,
      rowsPerPageLabel: 'Items per test page',
      rangeLabel: (startIndex, endIndex, totalRows, isLoading) =>
        isLoading
          ? `${startIndex}-${endIndex} test`
          : `${startIndex}-${endIndex} of test ${totalRows}`,
      rowsSelectedLabel: (totalSelectedRowsCount) =>
        `${totalSelectedRowsCount} test(s)`,
    },
  });

  const pageSizeSelector = container.querySelector(
    '.iui-button-dropdown',
  ) as HTMLButtonElement;
  expect(pageSizeSelector).toBeTruthy();
  expect(pageSizeSelector.textContent).toEqual('1-10 of test 195');

  expect(
    container.querySelector('.iui-table-paginator-page-size-label'),
  ).toHaveTextContent('Items per test page');
  expect(container.querySelector('.iui-left')).toHaveTextContent('5 test(s)');

  await userEvent.click(pageSizeSelector);
  const pageSizeSelections = document.querySelectorAll('.iui-menu-item');
  expect(pageSizeSelections).toHaveLength(3);
  pageSizeSelections.forEach((el, index) => {
    expect(el.textContent).toEqual(`${pageSizeList[index]} per test page`);
    expect(el.classList.contains('iui-active')).toBe(index === 0);
  });
});

it('should not show rowsPerPageLabel on narrow widths', () => {
  jest
    .spyOn(UseContainerWidth, 'useContainerWidth')
    .mockReturnValue([jest.fn(), 600]);

  const { container } = renderComponent();
  expect(
    container.querySelector('.iui-table-paginator-page-size-label'),
  ).toBeFalsy();
});

it('should hide rowsPerPageLabel if null is passed', () => {
  jest
    .spyOn(UseContainerWidth, 'useContainerWidth')
    .mockReturnValue([jest.fn(), 1200]);

  const { container } = renderComponent({
    localization: { rowsPerPageLabel: null },
  });
  expect(
    container.querySelector('.iui-table-paginator-page-size-label'),
  ).toBeFalsy();
});

it('should render with custom className and style', () => {
  const { container } = renderComponent({
    className: 'test-class',
    style: { color: 'red' },
  });

  const paginator = container.querySelector(
    '.iui-table-paginator',
  ) as HTMLElement;
  expect(paginator).toBeTruthy();
  expect(paginator.classList).toContain('test-class');
  expect(paginator.style.color).toEqual('red');
});
