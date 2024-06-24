/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchBox } from './SearchBox.js';

// Basic SearchBox
it('should render in its most basic state', () => {
  const { container } = render(<SearchBox />);

  // Base flex container
  const searchbox = container.querySelector('.iui-searchbox');
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-search-input');

  // Search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
});

it('should pass input props', () => {
  const { container } = render(
    <SearchBox inputProps={{ placeholder: 'Test' }} />,
  );

  // Base flex container
  const searchbox = container.querySelector('.iui-searchbox');
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-search-input');
  expect(input).toHaveAttribute('placeholder', 'Test');
});

it('should render in disabled state', () => {
  const { container } = render(<SearchBox isDisabled />);

  // Base flex container
  const searchbox = container.querySelector('.iui-searchbox');
  expect(searchbox).toBeTruthy();
  expect(searchbox).toHaveAttribute('data-iui-disabled', 'true');

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-search-input');
  expect(input).toHaveAttribute('disabled');

  // Search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
});

it.each(['small', 'large'] as const)(
  'should render SearchBox with %s size',
  (size) => {
    const { container } = render(<SearchBox size={size} />);

    // Base flex container
    const searchbox = container.querySelector('.iui-searchbox');
    expect(searchbox).toBeTruthy();
    expect(searchbox).toHaveAttribute('data-iui-size', size);

    // Search icon
    const searchIcon = searchbox?.querySelector('.iui-svg-icon');
    expect(searchIcon).toBeTruthy();
  },
);

// Expandable SearchBox
it('should render expandable Searchbox', async () => {
  const { container } = render(<SearchBox expandable />);

  // Base flex container
  const searchbox = container.querySelector('.iui-searchbox') as HTMLDivElement;
  expect(searchbox).toBeTruthy();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');

  const openButton = searchbox?.querySelector('button') as HTMLButtonElement;

  expect(openButton).toBeTruthy();
  expect(openButton).toHaveAccessibleName('Expand searchbox');

  await userEvent.click(openButton);

  expect(searchbox).toHaveAttribute('data-iui-expanded', 'true');
  const searchInput = searchbox?.querySelector(
    '.iui-search-input',
  ) as HTMLInputElement;
  expect(searchInput).toBeTruthy();
});

it('should render custom expanded state', async () => {
  const buttonCallBackMock = vi.fn();

  const { container } = render(
    <SearchBox expandable>
      <SearchBox.CollapsedState />
      <SearchBox.ExpandedState>
        <SearchBox.CollapseButton
          data-id='collapse-button'
          onClick={buttonCallBackMock}
        />
        <SearchBox.Button data-id='simple-button' />
        <SearchBox.Input placeholder='Test expand' id='test-input-id' />
      </SearchBox.ExpandedState>
    </SearchBox>,
  );

  const searchbox = container.querySelector('.iui-searchbox') as HTMLDivElement;
  expect(searchbox).toBeTruthy();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');
  const expandButton = searchbox?.querySelector('button') as HTMLButtonElement;
  expect(expandButton).toBeTruthy();

  await userEvent.click(expandButton);

  expect(searchbox).toHaveAttribute('data-iui-expanded', 'true');

  const searchInput = searchbox?.querySelector(
    '.iui-search-input',
  ) as HTMLInputElement;
  expect(searchInput).toBeTruthy();
  expect(searchInput).toHaveAttribute('placeholder', 'Test expand');
  expect(searchInput).toHaveAttribute('id', 'test-input-id');

  const simpleButton = searchbox?.querySelector(
    `[data-id='simple-button']`,
  ) as HTMLButtonElement;
  expect(simpleButton).toBeTruthy();

  const collapseButton = searchbox?.querySelector(
    `[data-id='collapse-button']`,
  ) as HTMLButtonElement;
  expect(collapseButton).toBeTruthy();

  await userEvent.click(collapseButton);
  expect(buttonCallBackMock).toBeCalled();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');
});

it('should render custom expandable actions', async () => {
  const onExpandMock = vi.fn();
  const onCollapseMock = vi.fn();

  const { container } = render(
    <SearchBox
      expandable
      onExpand={onExpandMock}
      onCollapse={onCollapseMock}
    />,
  );

  // Base flex container
  const searchbox = container.querySelector('.iui-searchbox') as HTMLDivElement;
  expect(searchbox).toBeTruthy();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');

  const openButton = searchbox?.querySelector('button') as HTMLButtonElement;

  expect(openButton).toBeTruthy();
  expect(openButton).toHaveAccessibleName('Expand searchbox');

  await userEvent.click(openButton);

  expect(searchbox).toHaveAttribute('data-iui-expanded', 'true');
  expect(onExpandMock).toBeCalled();

  const searchInput = searchbox?.querySelector(
    '.iui-search-input',
  ) as HTMLInputElement;
  expect(searchInput).toBeTruthy();

  const collapseButton = searchbox?.querySelector(
    `button`,
  ) as HTMLButtonElement;
  expect(collapseButton).toBeTruthy();
  expect(collapseButton).toHaveAccessibleName('Close searchbox');

  await userEvent.click(collapseButton);

  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');
  expect(onCollapseMock).toBeCalled();
});

it('should render controlled state expandable SearchBox', async () => {
  const { container, rerender } = render(
    <SearchBox expandable isExpanded={false} />,
  );

  const searchbox = container.querySelector('.iui-searchbox') as HTMLDivElement;
  expect(searchbox).toBeTruthy();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');

  rerender(<SearchBox expandable isExpanded={true} />);

  const searchboxExpanded = container.querySelector(
    '.iui-searchbox',
  ) as HTMLDivElement;
  expect(searchboxExpanded).toBeTruthy();
  expect(searchboxExpanded).toHaveAttribute('data-iui-expanded', 'true');
});
