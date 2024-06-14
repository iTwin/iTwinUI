/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render, type RenderResult, screen } from '@testing-library/react';
import type { HeaderGroup } from '../../../react-table/react-table.js';
import { FilterToggle, type FilterToggleProps } from './FilterToggle.js';
import { tableFilters } from './tableFilters.js';

function renderComponent<
  T extends Record<string, unknown> = Record<string, unknown>,
>(props?: Partial<FilterToggleProps<T>>): RenderResult {
  const defaultProps = {
    column: {} as HeaderGroup<T>,
    ...props,
  };

  return render(<FilterToggle {...defaultProps} />);
}

it('should display active filter', () => {
  const column = {
    canFilter: true,
    filterValue: 'value',
    render: vi.fn(),
    setFilter: vi.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).toHaveAttribute('data-iui-active', 'true');
});

it('should display active filter for false filter value', () => {
  const column = {
    canFilter: true,
    filterValue: false,
    render: vi.fn(),
    setFilter: vi.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).toHaveAttribute('data-iui-active', 'true');
});

it('should hide active filter when not defined', () => {
  const column = {
    canFilter: true,
    render: vi.fn(),
    setFilter: vi.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).not.toHaveClass('iui-active');
});

it('should hide active filter for empty filter value', () => {
  const column = {
    canFilter: true,
    filterValue: '',
    render: vi.fn(),
    setFilter: vi.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).not.toHaveClass('iui-active');
});
