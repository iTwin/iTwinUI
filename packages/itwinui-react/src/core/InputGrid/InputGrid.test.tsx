/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import * as React from 'react';

import { InputGrid } from './InputGrid.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { Label } from '../Label/Label.js';

const assertBaseElement = (container: HTMLElement) => {
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).toBeTruthy();
  return inputContainer;
};

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <InputGrid>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
});

it('should render correctly with inline label', () => {
  const { container } = render(
    <InputGrid labelPlacement='inline'>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).toHaveAttribute('data-iui-label-placement', 'inline');
});

it('should take class and style', () => {
  const { container } = render(
    <InputGrid className='my-class' style={{ width: 50 }}>
      <Label>label</Label>
      <input />
      <StatusMessage>message</StatusMessage>
    </InputGrid>,
  );
  assertBaseElement(container);
  const inputContainer = container.querySelector(
    '.iui-input-grid',
  ) as HTMLElement;
  expect(inputContainer).toHaveClass('iui-input-grid my-class');
  expect(inputContainer.style.width).toBe('50px');
});
