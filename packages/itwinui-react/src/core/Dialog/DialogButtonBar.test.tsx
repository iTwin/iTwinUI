/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../Buttons';

import { DialogButtonBar } from './DialogButtonBar';

it('should render in its most basic state', () => {
  const { container } = render(
    <DialogButtonBar>
      <Button>TestBtn1</Button>
      <Button>TestBtn2</Button>
    </DialogButtonBar>,
  );
  expect(container.querySelector('.iui-dialog-button-bar')).toBeTruthy();
  screen.getByText('TestBtn1');
  screen.getByText('TestBtn2');
});

it('should propagate miscellaneous props', () => {
  const { container } = render(
    <DialogButtonBar className='test-class' id='test-id' style={{ gap: 8 }}>
      <Button>TestBtn1</Button>
      <Button>TestBtn2</Button>
    </DialogButtonBar>,
  );

  const buttonBar = container.querySelector(
    '.iui-dialog-button-bar',
  ) as HTMLElement;
  expect(buttonBar).toHaveClass('test-class');
  expect(buttonBar).toHaveStyle('gap: 8px;');
  expect(buttonBar.id).toEqual('test-id');
});
