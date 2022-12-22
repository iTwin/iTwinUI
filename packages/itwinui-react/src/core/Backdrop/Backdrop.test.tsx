/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { Backdrop } from './Backdrop';

it('should render in most basic form', () => {
  const { container } = render(<Backdrop />);

  const backdrop = container.querySelector(
    '.iui-backdrop.iui-backdrop-visible',
  ) as HTMLElement;
  expect(backdrop).toBeTruthy();
});

it('should render with custom style and className', () => {
  const { container } = render(
    <Backdrop style={{ color: 'red' }} className='test-class' />,
  );

  const backdrop = container.querySelector(
    '.iui-backdrop.iui-backdrop-visible',
  ) as HTMLElement;
  expect(backdrop).toBeTruthy();
  expect(backdrop).toBeTruthy();
  expect(backdrop.classList.contains('test-class')).toBeTruthy();
  expect(backdrop).toHaveStyle('color: red');
});
