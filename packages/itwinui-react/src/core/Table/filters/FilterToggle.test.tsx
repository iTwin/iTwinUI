/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import type { HeaderGroup } from 'react-table';
import { FilterToggle, FilterToggleProps } from './FilterToggle';
import { tableFilters } from './tableFilters';

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
    render: jest.fn(),
    setFilter: jest.fn(),
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
    render: jest.fn(),
    setFilter: jest.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).toHaveAttribute('data-iui-active', 'true');
});

it('should hide active filter when not defined', () => {
  const column = {
    canFilter: true,
    render: jest.fn(),
    setFilter: jest.fn(),
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
    render: jest.fn(),
    setFilter: jest.fn(),
    Filter: tableFilters.TextFilter(),
  } as object as HeaderGroup;

  renderComponent({ column });

  const filterButton = screen.getByRole('button');
  expect(filterButton).not.toHaveClass('iui-active');
});
