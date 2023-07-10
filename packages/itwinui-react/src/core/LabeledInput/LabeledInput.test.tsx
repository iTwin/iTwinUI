/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import * as React from 'react';

import { LabeledInput } from './LabeledInput.js';

const assertBaseElement = (container: HTMLElement) => {
  const inputContainer = container.querySelector('.iui-input-grid');
  expect(inputContainer).toBeTruthy();
  return inputContainer;
};

it('should render correctly in its most basic state', () => {
  const { container, getByText } = render(<LabeledInput label='some label' />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-input')).toBeTruthy();
  const label = getByText('some label') as HTMLElement;
  expect(label.className).toBe('iui-input-label');
});

it('should render disabled component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' disabled />,
  );
  assertBaseElement(container);
  expect(container.querySelector('.iui-input')).toBeTruthy();
  expect(container.querySelector('.iui-input-label.iui-disabled')).toBeTruthy();
  getByText('some label');
  expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(
    true,
  );
});

it('should handle required attribute', () => {
  const { container } = render(<LabeledInput label='some label' required />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-input')).toBeTruthy();
  expect(container.querySelector('.iui-input-label.iui-required')).toBeTruthy();
  expect(
    (container.querySelector('input') as HTMLInputElement).required,
  ).toBeTruthy();
});

it('should render message', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      message={<div className='my-message'>Message</div>}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(container.querySelector('.iui-input')).toBeTruthy();
  const message = container.querySelector(
    '.iui-status-message-content > .my-message',
  ) as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should render %s component',
  (status) => {
    const { container, getByText } = render(
      <LabeledInput label='some label' status={status} />,
    );
    assertBaseElement(container);
    const input = container.querySelector('.iui-input');
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('data-iui-status', status);
    getByText('some label');
  },
);

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container, getByText } = render(
    <LabeledInput label='some label' ref={onRef} setFocus />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});

it('should take class and style on container', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      className='my-class'
      style={{ width: 80 }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const inputContainer = container.querySelector(
    '.iui-input-grid.my-class',
  ) as HTMLElement;
  expect(inputContainer).toBeTruthy();
  expect(inputContainer.style.width).toBe('80px');
});

it('should take class and style on input', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      inputClassName='my-class'
      inputStyle={{ width: 80 }}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  const input = container.querySelector('.iui-input.my-class') as HTMLElement;
  expect(input).toBeTruthy();
  expect(input.style.width).toBe('80px');
});

it('should render inline input', () => {
  const { container, getByText, queryByText } = render(
    <LabeledInput
      label='some label'
      displayStyle='inline'
      message='My message'
      status='positive'
    />,
  );
  const inputContainer = assertBaseElement(container);
  expect(container.querySelector('.iui-input-flex-container')).toBeTruthy();
  expect(inputContainer).toHaveAttribute('data-iui-label-placement', 'inline');
  getByText('some label');
  expect(queryByText('My message')).toHaveClass('iui-status-message-content');
  expect(
    container.querySelector('.iui-svg-icon.iui-input-decorator-icon'),
  ).toBeTruthy();
});

it('should take custom icon', () => {
  const { container, getByText } = render(
    <LabeledInput
      label='some label'
      displayStyle='inline'
      svgIcon={<svg className='my-icon' />}
    />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(container.querySelector('.iui-input-flex-container')).toBeTruthy();
  expect(container.querySelector('.my-icon')).toBeTruthy();
});

it('should render inline icon', () => {
  const { container, queryByText } = render(
    <LabeledInput
      label='some label'
      iconDisplayStyle='inline'
      svgIcon={<svg className='my-icon' />}
      message='My message'
    />,
  );
  const inputContainer = assertBaseElement(container);
  expect(inputContainer).not.toHaveAttribute(
    'data-iui-label-placement',
    'inline',
  );
  expect(queryByText('some label')).toHaveClass('iui-input-label');
  expect(queryByText('My message')).toHaveClass('iui-status-message-content');
  expect(container.querySelector('.my-icon')).toBeTruthy();
});
