/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Radio } from './Radio';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('.iui-radio')).toBeTruthy();
  expect(container.querySelector('.iui-radio-dot')).toBeTruthy();
  expect(container.querySelector('input[type="radio"]')).toBeTruthy();
};

it('renders correctly in its most basic state', () => {
  const { container } = render(<Radio label='Some label' />);

  assertBaseElements(container);
  screen.getByText('Some label');
});

it('renders correctly without label', () => {
  const { container } = render(<Radio />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-label')).toBeNull();
});

it('renders correctly with jsx element as label', () => {
  const { container } = render(
    <Radio label={<div id='my-custom-label'>This is my label</div>} />,
  );

  assertBaseElements(container);
  const label = container.querySelector('#my-custom-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('This is my label');
});

it('renders disabled component', () => {
  const { container } = render(<Radio label='Some label' disabled />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(
    (container.querySelector('input[type="radio"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it('renders positive component', () => {
  const { container } = render(<Radio label='Some label' status='positive' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-radio.iui-positive')).toBeTruthy();
});

it('renders warning component', () => {
  const { container } = render(<Radio label='Some label' status='warning' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-radio.iui-warning')).toBeTruthy();
});

it('renders negative component', () => {
  const { container } = render(<Radio label='Some label' status='negative' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-radio.iui-negative')).toBeTruthy();
});

it('takes styles for input and label', () => {
  const { container } = render(
    <Radio
      label='Some label'
      style={{ color: 'blue' }}
      checkmarkStyle={{ backgroundColor: 'red' }}
    />,
  );

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(
    (container.querySelector('.iui-radio') as HTMLElement).style.color,
  ).toBe('blue');
  expect(
    (container.querySelector('.iui-radio-dot') as HTMLElement).style
      .backgroundColor,
  ).toBe('red');
});

it('takes class for input and label', () => {
  const { container } = render(
    <Radio
      label='Some label'
      className='labelClass'
      checkmarkClassName='radioClass'
    />,
  );

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(
    (container.querySelector('.iui-radio') as HTMLElement).classList,
  ).toContain('labelClass');
  expect(
    (container.querySelector('.iui-radio-dot') as HTMLElement).classList,
  ).toContain('radioClass');
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container } = render(
    <Radio label='Some label' ref={onRef} setFocus />,
  );

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});
