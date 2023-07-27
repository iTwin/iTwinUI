/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Radio } from './Radio.js';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('input[type="radio"]')).toHaveClass(
    'iui-radio',
  );
};

it('renders correctly with label', () => {
  const { container } = render(<Radio label='Some label' />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toHaveClass('iui-radio-wrapper');
  expect(screen.getByText('Some label')).toHaveClass('iui-radio-label');
});

it('renders correctly without label', () => {
  const { container } = render(<Radio />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toBeFalsy();
  expect(container.querySelector('iui-radio-wrapper')).toBeFalsy();
  expect(container.querySelector('.iui-radio-label')).toBeNull();
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
  expect(
    container.querySelector('.iui-radio-wrapper.iui-positive'),
  ).toBeTruthy();
});

it('renders warning component', () => {
  const { container } = render(<Radio label='Some label' status='warning' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(
    container.querySelector('.iui-radio-wrapper.iui-warning'),
  ).toBeTruthy();
});

it('renders negative component', () => {
  const { container } = render(<Radio label='Some label' status='negative' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(
    container.querySelector('.iui-radio-wrapper.iui-negative'),
  ).toBeTruthy();
});

it.each(['label', 'input'] as const)(
  'should isomorphically apply style on %s',
  (el) => {
    const { container } = render(
      <Radio
        label={el === 'label' ? 'Some label' : undefined}
        style={{ color: 'blue' }}
      />,
    );

    assertBaseElements(container);
    expect(container.querySelector(el)).toHaveStyle('color: blue;');
  },
);
it.each(['label', 'input'] as const)(
  'should isomorphically apply class on %s',
  (el) => {
    const { container } = render(
      <Radio
        label={el === 'label' ? 'Some label' : undefined}
        className='customClass'
      />,
    );

    assertBaseElements(container);
    expect(container.querySelector(el)).toHaveClass('customClass');
  },
);

it('passes custom props to wrapper and label', () => {
  const { container } = render(
    <Radio
      label='Radio Label'
      className='custom-wrapper-class'
      style={{ fontSize: 12 }}
      labelProps={{ className: 'custom-label-class', style: { fontSize: 12 } }}
    />,
  );
  // Test wrapper
  const wrapper = container.querySelector(
    '.iui-radio-wrapper.custom-wrapper-class',
  ) as HTMLElement;
  expect(wrapper).toBeTruthy();
  expect(wrapper.style.fontSize).toBe('12px');
  // Test label
  const label = container.querySelector(
    '.iui-radio-label.custom-label-class',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.style.fontSize).toBe('12px');
});
