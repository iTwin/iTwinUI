/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterButtonBar, FilterButtonBarProps } from './FilterButtonBar';
import { BaseFilter } from './BaseFilter';
import userEvent from '@testing-library/user-event';

const setFilter = jest.fn();
const clearFilter = jest.fn();

const renderComponent = (initialProps?: Partial<FilterButtonBarProps>) => {
  const props = {
    setFilter,
    clearFilter,
    ...initialProps,
  };
  return render(<FilterButtonBar {...props} />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('should render correctly', () => {
  const { container } = renderComponent();

  const buttonBar = container.querySelector('.iui-button-bar') as HTMLElement;
  expect(buttonBar).toBeTruthy();
  screen.getByText('Filter');
  screen.getByText('Clear');
});

it('should render correctly with children', () => {
  const { container } = renderComponent({ children: <div>test string</div> });

  const buttonBar = container.querySelector('.iui-button-bar') as HTMLElement;
  expect(buttonBar).toBeTruthy();
  expect(buttonBar.firstChild?.textContent).toContain('test string');
  screen.getByText('Filter');
  screen.getByText('Clear');
});

it('should render correctly with custom localized strings', () => {
  const { container } = renderComponent({
    translatedLabels: { filter: 'TestFilter', clear: 'TestClear' },
  });

  const buttonBar = container.querySelector('.iui-button-bar') as HTMLElement;
  expect(buttonBar).toBeTruthy();
  screen.getByText('TestFilter');
  screen.getByText('TestClear');
});

it('should render correctly with custom class and style', () => {
  const { container } = renderComponent({
    className: 'test-class',
    style: { color: 'red' },
  });

  const buttonBar = container.querySelector('.iui-button-bar') as HTMLElement;
  expect(buttonBar).toBeTruthy();
  expect(buttonBar.classList).toContain('test-class');
  expect(buttonBar.style.color).toEqual('red');
  screen.getByText('Filter');
  screen.getByText('Clear');
});

it('should call callbacks on clicks', () => {
  renderComponent();

  screen.getByText('Filter').click();
  expect(setFilter).toHaveBeenCalled();

  screen.getByText('Clear').click();
  expect(clearFilter).toHaveBeenCalled();
});

it('should consume the click event and stop its propagation', async () => {
  const parentClick = jest.fn();
  render(
    <div onClick={parentClick}>
      <BaseFilter>
        <FilterButtonBar setFilter={setFilter} clearFilter={clearFilter} />
      </BaseFilter>
    </div>,
  );

  await userEvent.click(screen.getByText('Filter'));
  await userEvent.click(screen.getByText('Clear'));
  expect(parentClick).not.toHaveBeenCalled();
});
