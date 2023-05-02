/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { SearchBox } from './SearchBox';

it('should render in its most basic state', () => {
  const { container } = render(<SearchBox />);

  // Base flex container
  const searchbox = container.querySelector('.iui-input-flex-container');
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-search-input');

  // Search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
});

it('should render in disabled state', () => {
  const { container } = render(<SearchBox disabled />);

  // Base flex container
  const searchbox = container.querySelector('.iui-input-flex-container');
  expect(searchbox).toBeTruthy();
  expect(searchbox).toHaveClass('iui-input-flex-container iui-disabled');

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-search-input');
  expect(input).toHaveAttribute('disabled');

  // Search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
});

it('should render in small state', () => {
  const { container } = render(<SearchBox size='small' />);

  // Base flex container
  const searchbox = container.querySelector('.iui-input-flex-container');
  expect(searchbox).toBeTruthy();
  expect(searchbox).toHaveAttribute('data-iui-size', 'small');

  // Search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
  expect(searchIcon).toHaveAttribute('data-iui-icon-size', 's');
});

it('should render  expandable Searchbox', () => {
  const { container } = render(<SearchBox expandable />);

  // Base flex container
  const searchbox = container.querySelector(
    '.iui-input-flex-container',
  ) as HTMLDivElement;
  expect(searchbox).toBeTruthy();
  expect(searchbox).not.toHaveAttribute('data-iui-expanded', 'true');

  const collapsedState = searchbox?.querySelector('.iui-searchbox-collapsed');
  const expandedState = searchbox?.querySelector(
    '.iui-searchbox-expanded',
  ) as HTMLDivElement;

  expect(collapsedState).toBeTruthy();
  expect(expandedState).toBeTruthy();

  const openButton = collapsedState?.querySelector(
    'button',
  ) as HTMLButtonElement;
  expect(openButton).toBeTruthy();
  expect(openButton).toHaveAccessibleName('Expand searchbox');
});
