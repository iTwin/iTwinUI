/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { LabeledTextarea } from './LabeledTextarea';

it('should render correctly in its most basic state', () => {
  const { container } = render(<LabeledTextarea label='test-label' />);

  const label = container.querySelector(
    '.iui-input-container .iui-label',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('test-label');

  const textarea = container.querySelector(
    '.iui-input-container textarea.iui-input',
  );
  expect(textarea).toBeTruthy();
});

it('should show a message', () => {
  const { container } = render(
    <LabeledTextarea label='test-label' message='test-message' />,
  );

  const message = container.querySelector('.iui-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toEqual('test-message');
});

it('should show status', () => {
  const { container } = render(
    <LabeledTextarea label='Label' status='negative' />,
  );

  const labelContainer = container.querySelector(
    '.iui-input-container.iui-negative',
  );
  expect(labelContainer).toBeTruthy();
});

it('should be disabled', () => {
  const { container } = render(
    <LabeledTextarea label='Label' disabled={true} />,
  );

  const labelContainer = container.querySelector(
    '.iui-input-container.iui-disabled',
  );
  expect(labelContainer).toBeTruthy();

  const textarea = container.querySelector(
    '.iui-input-container textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.disabled).toBe(true);
});

it('should handle required attribute', () => {
  const { container } = render(<LabeledTextarea label='Label' required />);

  expect(container.querySelector('.iui-input-container')).toBeTruthy();
  expect(container.querySelector('.iui-label.iui-required')).toBeTruthy();

  const textarea = container.querySelector(
    '.iui-input-container textarea.iui-input',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.required).toBeTruthy();
});

it('should add custom class names and styles', () => {
  const { container } = render(
    <LabeledTextarea
      label='Label'
      className={'test-classname'}
      style={{ width: 100 }}
      textareaClassName={'test-textarea-classname'}
      textareaStyle={{ width: 50 }}
    />,
  );

  const labelContainer = container.querySelector(
    '.iui-input-container.test-classname',
  ) as HTMLElement;
  expect(labelContainer).toBeTruthy();
  expect(labelContainer.style.width).toBe('100px');

  const textarea = container.querySelector(
    '.iui-input-container textarea.iui-input.test-textarea-classname',
  ) as HTMLElement;
  expect(textarea).toBeTruthy();
  expect(textarea.style.width).toBe('50px');
});

it('should render without label when it is undefined', () => {
  const { container } = render(<LabeledTextarea label={undefined} />);

  const label = container.querySelector('.iui-input-container .iui-label');
  expect(label).toBeNull();

  const textarea = container.querySelector(
    '.iui-input-container textarea.iui-input',
  );
  expect(textarea).toBeTruthy();
});

it('should render inline input', () => {
  const { container, getByText, queryByText } = render(
    <LabeledTextarea
      label='some label'
      displayStyle='inline'
      message='My message'
      status='positive'
    />,
  );
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-inline-label'),
  ).toBeTruthy();
  expect(queryByText('My message')).toBeNull();
  expect(container.querySelector('.iui-input-icon')).toBeTruthy();
});

it('should take custom icon', () => {
  const { container, getByText } = render(
    <LabeledTextarea
      label='some label'
      displayStyle='inline'
      svgIcon={<svg className='my-icon' />}
    />,
  );
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-inline-label'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-input-icon.my-icon')).toBeTruthy();
});

it('should render inline icon', () => {
  const { container, queryByText } = render(
    <LabeledTextarea
      label='some label'
      iconDisplayStyle='inline'
      svgIcon={<svg className='my-icon' />}
      message='My message'
    />,
  );
  const inputContainer = container.querySelector('.iui-input-container');
  expect(inputContainer).toHaveClass('iui-inline-icon', 'iui-with-message');
  expect(inputContainer).not.toHaveClass('iui-inline-label');
  expect(queryByText('some label')).toHaveClass('iui-label');
  expect(queryByText('My message')).toHaveClass('iui-message');
  expect(container.querySelector('.iui-input-icon.my-icon')).toBeTruthy();
});
