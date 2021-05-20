/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderGroup } from 'react-table';
import { DateRangeFilter, DateRangeFilterProps } from './DateRangeFilter';

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderComponent = (initialProps?: Partial<DateRangeFilterProps<any>>) => {
  const props = {
    column: {} as HeaderGroup,
    setFilter: jest.fn(),
    clearFilter: jest.fn(),
    close: jest.fn(),
    ...initialProps,
  } as DateRangeFilterProps<any>;
  return render(<DateRangeFilter {...props} />);
};
/* eslint-enable @typescript-eslint/no-explicit-any */

it('should render correctly', () => {
  const { container } = renderComponent();

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline',
  );
  expect(labeledInputs.length).toBe(2);

  expect(labeledInputs[0].querySelector('.iui-label')?.textContent).toEqual(
    'From',
  );
  expect(labeledInputs[1].querySelector('.iui-label')?.textContent).toEqual(
    'To',
  );

  screen.getByText('Filter');
  screen.getByText('Clear');
});

it('should render correctly with set filter value', () => {
  const { container } = renderComponent({
    column: {
      filterValue: [new Date(2021, 4, 1), new Date(2021, 4, 3)],
    } as HeaderGroup,
  });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  expect(labeledInputs[0].value).toEqual('May 1, 2021');
  expect(labeledInputs[1].value).toEqual('May 3, 2021');
});

it('should set filter when both values entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: 'May 1, 2021' } });
  fireEvent.change(labeledInputs[1], { target: { value: 'May 3, 2021' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([
    new Date(2021, 4, 1),
    new Date(2021, 4, 3),
  ]);
});

it('should set filter when only From is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: 'May 1, 2021' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([new Date(2021, 4, 1), undefined]);
});

it('should set filter when only To is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[1], { target: { value: 'May 3, 2021' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([undefined, new Date(2021, 4, 3)]);
});

it('should set filter when both values entered and Enter is pressed', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: 'May 1, 2021' } });
  fireEvent.change(labeledInputs[1], { target: { value: 'May 3, 2021' } });

  fireEvent.keyDown(labeledInputs[1], {
    key: 'Enter',
    charCode: 13,
  });

  expect(setFilter).toHaveBeenCalledWith([
    new Date(2021, 4, 1),
    new Date(2021, 4, 3),
  ]);
});

it('should set filter with empty values when invalid date is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: ' ' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([undefined, undefined]);
});

it('should set filter with empty values when date is not fully entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: 'May 1' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([undefined, undefined]);
});
