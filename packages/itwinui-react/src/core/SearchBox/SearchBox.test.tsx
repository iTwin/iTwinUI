/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { SearchBox } from './SearchBox';
import { Icon, SvgClose } from '../utils';

it('should render in its most basic state', () => {
  const { container } = render(
    <SearchBox
      endAdornment={
        <Icon>
          <SvgClose />
        </Icon>
      }
    />,
  );

  // Base flex container
  const searchbox = container.querySelector('.iui-input-flex-container');
  expect(searchbox).toBeTruthy();

  // Input element
  const input = searchbox?.querySelector('input');
  expect(input).toBeTruthy();
  expect(input).toHaveClass('iui-invisible-borders');
  expect(input).toHaveAttribute('type', 'search');
});
