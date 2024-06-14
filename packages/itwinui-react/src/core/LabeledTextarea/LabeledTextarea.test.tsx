/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { LabeledTextarea } from './LabeledTextarea.js';

it('should render correctly in its most basic state', () => {
  const { container } = render(<LabeledTextarea label='test-label' />);

  const label = container.querySelector('.iui-input-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toEqual('test-label');

  const textarea = container.querySelector('.iui-input-grid textarea');
  expect(textarea).toBeTruthy();
});

it('should show a message', () => {
  const { container } = render(
    <LabeledTextarea label='test-label' message='test-message' />,
  );

  const message = container.querySelector('.iui-status-message') as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toEqual('test-message');
});

it('should show status', () => {
  const { container } = render(
    <LabeledTextarea label='Label' status='negative' />,
  );

  const textareaContainer = container.querySelector('.iui-input-grid');
  expect(textareaContainer).toBeTruthy();
  expect(textareaContainer).toHaveAttribute('data-iui-status', 'negative');

  const textarea = container.querySelector(
    '.iui-input-grid > .iui-input-with-icon > textarea',
  );

  // Don't unnecessarily set data-iui-status on the textarea when iui-input-grid already has data-iui-status
  expect(textarea).not.toHaveAttribute('data-iui-status', 'negative');
});

it('should be disabled', () => {
  const { container } = render(
    <LabeledTextarea label='Label' disabled={true} />,
  );

  const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.disabled).toBe(true);
});

it('should handle required attribute', () => {
  const { container } = render(<LabeledTextarea label='Label' required />);

  expect(container.querySelector('.iui-input-grid')).toBeTruthy();
  expect(container.querySelector('.iui-input-label.iui-required')).toBeTruthy();

  const textarea = container.querySelector(
    '.iui-input-grid textarea',
  ) as HTMLTextAreaElement;
  expect(textarea).toBeTruthy();
  expect(textarea.required).toBeTruthy();
});

it('should add custom class names and styles', () => {
  const { container } = render(
    <LabeledTextarea
      label='Label'
      svgIcon={<svg />}
      message='Test message'
      wrapperProps={{ className: 'test-classname', style: { width: 100 } }}
      className={'test-textarea-classname'}
      style={{ width: 50 }}
      labelProps={{ className: 'test-label-classname' }}
      iconProps={{ className: 'my-icon' }}
      messageContentProps={{ className: 'my-message' }}
    />,
  );

  const labelContainer = container.querySelector(
    '.iui-input-grid.test-classname',
  ) as HTMLElement;
  expect(labelContainer).toBeTruthy();
  expect(labelContainer.style.width).toBe('100px');

  const textarea = container.querySelector(
    '.iui-input-grid textarea.test-textarea-classname',
  ) as HTMLElement;
  expect(textarea).toBeTruthy();
  expect(textarea.style.width).toBe('50px');

  const label = container.querySelector(
    '.iui-input-label.test-label-classname',
  ) as HTMLElement;
  expect(label).toBeTruthy();

  const icon = container.querySelector('.iui-svg-icon.my-icon') as HTMLElement;
  expect(icon).toBeTruthy();

  const content = container.querySelector('.my-message') as HTMLElement;
  expect(content).toBeTruthy();
});

it('should render without label when it is undefined', () => {
  const { container } = render(<LabeledTextarea label={undefined} />);

  const label = container.querySelector('.iui-input-grid .iui-input-label');
  expect(label).toBeNull();

  const textarea = container.querySelector('.iui-input-grid textarea');
  expect(textarea).toBeTruthy();
});

it('should render inline input', () => {
  const { container, getByText } = render(
    <LabeledTextarea
      label='some label'
      displayStyle='inline'
      message='My message'
      status='positive'
    />,
  );
  getByText('some label');
  const grid = container.querySelector('.iui-input-grid');
  expect(grid).toHaveAttribute('data-iui-label-placement', 'inline');
  expect(container.querySelector('.iui-svg-icon')).toBeTruthy();
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
  const grid = container.querySelector('.iui-input-grid');
  expect(grid).toHaveAttribute('data-iui-label-placement', 'inline');
  expect(container.querySelector('.my-icon')).toBeTruthy();
});

it('should render inline icon', () => {
  const { container, getByText } = render(
    <LabeledTextarea
      label='some label'
      svgIcon={<svg className='my-icon' />}
      message='My message'
    />,
  );
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).not.toHaveAttribute(
    'data-iui-label-placement',
    'inline',
  );
  expect(getByText('some label')).toHaveClass('iui-input-label');
  getByText('My message');
  expect(container.querySelector('.iui-svg-icon > .my-icon')).toBeTruthy();
});
