/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Textarea } from './Textarea';

it('should render correctly in its most basic state', () => {
  const { container } = render(<Textarea />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.rows).toBe(3);
});

it('should add custom className', () => {
  const { container } = render(<Textarea className='test-classname' />);

  expect(
    container.querySelector('textarea.iui-input.test-classname'),
  ).toBeTruthy();
});

it('should be disabled', () => {
  const { container } = render(<Textarea disabled={true} />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.disabled).toBe(true);
});

it('should show placeholder', () => {
  const { container } = render(<Textarea placeholder='test-placeholder' />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.placeholder).toEqual('test-placeholder');
});

it('should have custom number of rows', () => {
  const { container } = render(<Textarea rows={10} />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.rows).toBe(10);
});

it('should have passed value', () => {
  const { container } = render(<Textarea defaultValue='test-value' />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.value).toEqual('test-value');
});

it('should set focus', () => {
  const { container } = render(<Textarea setFocus={true} />);

  const textarea = container.querySelector(
    'textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(document.activeElement).toEqual(textarea);
});
