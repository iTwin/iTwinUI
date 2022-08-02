/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { DialogTitleBarTitle } from './DialogTitleBarTitle';

it('should render in its most basic state', () => {
  const { container } = render(
    <DialogTitleBarTitle>test-title</DialogTitleBarTitle>,
  );
  const title = container.querySelector('.iui-dialog-title') as HTMLElement;
  expect(title).toBeTruthy();
  expect(title).toHaveTextContent('test-title');
});

it('should propagate miscellaneous props', () => {
  const { container } = render(
    <DialogTitleBarTitle
      className='test-class'
      id='test-id'
      style={{ color: 'red' }}
    >
      test-title
    </DialogTitleBarTitle>,
  );

  const title = container.querySelector('.iui-dialog-title') as HTMLElement;
  expect(title).toHaveClass('test-class');
  expect(title).toHaveStyle('color: red;');
  expect(title.id).toEqual('test-id');
});
