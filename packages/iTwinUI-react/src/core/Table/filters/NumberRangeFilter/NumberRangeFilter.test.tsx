/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderGroup } from 'react-table';
import { NumberRangeFilter, NumberRangeFilterProps } from './NumberRangeFilter';

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderComponent = (
  initialProps?: Partial<NumberRangeFilterProps<any>>,
) => {
  const props = {
    column: {} as HeaderGroup,
    setFilter: jest.fn(),
    clearFilter: jest.fn(),
    close: jest.fn(),
    ...initialProps,
  } as NumberRangeFilterProps<any>;
  return render(<NumberRangeFilter {...props} />);
};
/* eslint-enable @typescript-eslint/no-explicit-any */

it('should render correctly', () => {
  const { container } = renderComponent();

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label',
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
      filterValue: [1, 3],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as HeaderGroup<any>,
  });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  expect(labeledInputs[0].value).toEqual('1');
  expect(labeledInputs[1].value).toEqual('3');
});

it('should set filter when both values entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: '1' } });
  fireEvent.change(labeledInputs[1], { target: { value: '3' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([1, 3]);
});

it('should set filter when only From is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: '1' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([1, undefined]);
});

it('should set filter when only To is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[1], { target: { value: '3' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([undefined, 3]);
});

it('should set filter when both values entered and Enter is pressed', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: '1' } });
  fireEvent.change(labeledInputs[1], { target: { value: '3' } });

  fireEvent.keyDown(labeledInputs[1], {
    key: 'Enter',
    charCode: 13,
  });

  expect(setFilter).toHaveBeenCalledWith([1, 3]);
});

it('should set filter with empty values when invalid number is entered', () => {
  const setFilter = jest.fn();
  const { container } = renderComponent({ setFilter });

  const labeledInputs = container.querySelectorAll(
    '.iui-input-container.iui-inline-label input',
  ) as NodeListOf<HTMLInputElement>;
  expect(labeledInputs.length).toBe(2);

  fireEvent.change(labeledInputs[0], { target: { value: 'abc' } });

  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith([undefined, undefined]);
});
