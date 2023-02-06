/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SearchBox } from './SearchBox';
import { Icon, SvgClose } from '../utils';

it('should render in its most basic state', () => {
  const { container } = render(
    <SearchBox>
      <input type='search' />
      <Icon>
        <SvgClose />
      </Icon>
    </SearchBox>,
  );

  // Base flex container
  const searchbox = container.querySelector('.iui-input-flex-container');
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveAttribute('type', 'search');

  // Initial search icon
  const searchIcon = searchbox?.querySelector('.iui-svg-icon');
  expect(searchIcon).toBeTruthy();
});

it('should expand on click', () => {
  const { container } = render(
    <SearchBox expandable>
      <input type='search' />
    </SearchBox>,
  );

  // Base flex container
  const searchbox = container.querySelector(
    '.iui-input-flex-container.iui-expandable-searchbox',
  );
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).not.toBeTruthy();

  // Initial search icon
  const searchButton = searchbox?.querySelector(
    '.iui-button',
  ) as HTMLButtonElement;
  expect(searchButton).toBeTruthy();

  fireEvent.click(searchButton);

  expect(
    container.querySelector(
      '.iui-input-flex-container.iui-expandable-searchbox',
    ),
  ).toHaveAttribute('aria-expanded', 'true');
});
