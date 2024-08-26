/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import type { HeaderGroup } from '../../../../react-table/react-table.js';
import type { TableFilterProps } from '../types.js';
import { TextFilter } from './TextFilter.js';

const setFilter = vi.fn() as (value: unknown) => void;
const clearFilter = vi.fn() as () => void;

const renderComponent = (initialProps?: Partial<TableFilterProps<any>>) => {
  const props = {
    column: {} as HeaderGroup,
    setFilter,
    clearFilter,
    close: vi.fn(),
    ...initialProps,
  } as TableFilterProps<any>;
  return render(<TextFilter {...props} />);
};

beforeEach(() => {
  vi.clearAllMocks();
});

it('should call setFilter with input value', () => {
  const { container } = renderComponent();

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: 'test filter' } });
  screen.getByText('Filter').click();

  expect(setFilter).toHaveBeenCalledWith('test filter');
});

it('should load filter with set value and clear it', () => {
  const { container } = renderComponent({
    column: { filterValue: 'test filter' } as HeaderGroup<any>,
  });

  const input = container.querySelector('input') as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual('test filter');

  screen.getByText('Clear').click();

  expect(clearFilter).toHaveBeenCalled();
});
