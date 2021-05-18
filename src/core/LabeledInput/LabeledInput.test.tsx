/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { LabeledInput } from './LabeledInput';

const assertBaseElement = (container: HTMLElement) => {
  expect(container.querySelector('.iui-input-container')).toBeTruthy();
  expect(container.querySelector('.iui-input')).toBeTruthy();
};

it('should render correctly in its most basic state', () => {
  const { container, getByText } = render(<LabeledInput label='some label' />);
  assertBaseElement(container);
  const label = getByText('some label') as HTMLElement;
  expect(label.className).toBe('iui-label');
});

it('should render disabled component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' disabled />,
  );
  assertBaseElement(container);
  expect(
    container.querySelector('.iui-input-container.iui-disabled'),
  ).toBeTruthy();
  getByText('some label');
  expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(
    true,
  );
});

it('should handle required attribute', () => {
  const { container } = render(<LabeledInput label='some label' required />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-label.iui-required')).toBeTruthy();
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
  const message = container.querySelector(
    '.iui-message > .my-message',
  ) as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
});

it('should render positive component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' status='positive' />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-positive'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-message > svg')).toBeTruthy();
});

it('should render warning component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' status='warning' />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-warning'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-message > svg')).toBeTruthy();
});

it('should render negative component', () => {
  const { container, getByText } = render(
    <LabeledInput label='some label' status='negative' />,
  );
  assertBaseElement(container);
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-negative'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-message > svg')).toBeTruthy();
});

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
    '.iui-input-container.my-class',
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
  assertBaseElement(container);
  getByText('some label');
  expect(
    container.querySelector('.iui-input-container.iui-inline'),
  ).toBeTruthy();
  expect(queryByText('My message')).toBeNull();
  expect(container.querySelector('.iui-message svg')).toBeTruthy();
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
  expect(
    container.querySelector('.iui-input-container.iui-inline'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-message .my-icon')).toBeTruthy();
});
