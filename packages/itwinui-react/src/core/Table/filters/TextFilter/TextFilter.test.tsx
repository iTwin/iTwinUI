/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderGroup } from 'react-table';
import { TableFilterProps } from '../types';
import { TextFilter } from './TextFilter';

const setFilter = jest.fn() as (value: unknown) => void;
const clearFilter = jest.fn() as () => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderComponent = (initialProps?: Partial<TableFilterProps<any>>) => {
  const props = {
    column: {} as HeaderGroup,
    setFilter,
    clearFilter,
    close: jest.fn(),
    ...initialProps,
  } as TableFilterProps<any>;
  return render(<TextFilter {...props} />);
};
/* eslint-enable @typescript-eslint/no-explicit-any */

beforeEach(() => {
  jest.clearAllMocks();
});

it('should call setFilter with input value', () => {
  const { container } = renderComponent();

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: 'test filter' } });
  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith('test filter');
});

it('should call setFilter when Enter is pressed', () => {
  const { container } = renderComponent();

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: 'test filter' } });
  fireEvent.keyDown(input, {
    key: 'Enter',
    charCode: 13,
  });

  expect(setFilter).toHaveBeenCalledWith('test filter');
});

it('should load filter with set value and clear it', () => {
  const { container } = renderComponent({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    column: { filterValue: 'test filter' } as HeaderGroup<any>,
  });

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual('test filter');

  screen.getByText('Clear').click();

  expect(clearFilter).toHaveBeenCalled();
});
