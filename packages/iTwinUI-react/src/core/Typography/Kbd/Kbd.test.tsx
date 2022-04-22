/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Kbd, KbdKeys } from './Kbd';

it('should render in its most basic state', () => {
  const { container } = render(<Kbd>X</Kbd>);
  const kbd = container.querySelector('kbd.iui-keyboard') as HTMLElement;
  expect(kbd).toBeTruthy();
  expect(kbd.textContent).toBe('X');
});

it('should add custom className', () => {
  const { container } = render(<Kbd className='test-classname'>X</Kbd>);
  expect(
    container.querySelector('kbd.iui-keyboard.test-classname'),
  ).toBeTruthy();
});

it('should work with predefined keys', () => {
  const { container } = render(<Kbd>{KbdKeys.Control}</Kbd>);
  const kbd = container.querySelector('kbd.iui-keyboard') as HTMLElement;
  expect(kbd).toBeTruthy();
  expect(kbd.textContent).toBe(KbdKeys.Control);
});
