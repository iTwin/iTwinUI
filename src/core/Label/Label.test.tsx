/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Label } from './Label';

it('should render in its most basic state', () => {
  const { container } = render(<Label>test label</Label>);
  const label = container.querySelector('label') as HTMLLabelElement;
  expect(label).toHaveClass('iui-input-label');
  expect(label).toHaveTextContent('test label');
});

it('should render inline', () => {
  const { container } = render(<Label displayStyle='inline'>test label</Label>);
  const label = container.querySelector('.iui-input-label') as HTMLLabelElement;
  expect(label).toHaveClass('iui-inline');
  expect(label).toHaveTextContent('test label');
});

it('should render as required', () => {
  const { container } = render(<Label required>test label</Label>);
  const label = container.querySelector('.iui-input-label') as HTMLLabelElement;
  expect(label).toHaveClass('iui-required');
  expect(label).toHaveTextContent('test label');
});

it.each(['span', 'div'] as const)('should render as a %s element', (as) => {
  const { container } = render(<Label as={as}>test label</Label>);
  const label = container.querySelector(as) as HTMLElement;
  expect(label).toHaveClass('iui-input-label');
  expect(label).toHaveTextContent('test label');
});

it('should propagate misc props', () => {
  const { container } = render(
    <Label
      id='test-label-id'
      htmlFor='test-input-id'
      className='test-label-class'
      style={{ color: 'rebeccapurple' }}
    >
      test label text
    </Label>,
  );

  const label = container.querySelector('.iui-input-label') as HTMLLabelElement;
  expect(label).toHaveClass('test-label-class');
  expect(label).toHaveStyle({ color: 'rebeccapurple' });
  expect(label).toHaveAttribute('id', 'test-label-id');
  expect(label).toHaveAttribute('for', 'test-input-id');
  expect(label).toHaveTextContent('test label text');
});
