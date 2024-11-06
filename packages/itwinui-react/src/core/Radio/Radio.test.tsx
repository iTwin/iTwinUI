/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';

import { Radio } from './Radio.js';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('input[type="radio"]')).toHaveClass(
    'iui-radio',
  );
};

it('renders correctly with label', () => {
  const { container } = render(<Radio label='Some label' />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toHaveClass('iui-checkbox-wrapper');
  expect(screen.getByText('Some label')).toHaveClass('iui-radio-label');
});

it('renders correctly without label', () => {
  const { container } = render(<Radio />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toBeFalsy();
  expect(container.querySelector('iui-checkbox-wrapper')).toBeFalsy();
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
  expect(container.querySelector('.iui-checkbox-wrapper')).toHaveAttribute(
    'data-iui-disabled',
    'true',
  );
  expect(
    container.querySelector('input[type="radio"]') as HTMLInputElement,
  ).toBeDisabled();
});

it('renders positive component', () => {
  const { container } = render(<Radio label='Some label' status='positive' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-checkbox-wrapper')).toHaveAttribute(
    'data-iui-status',
    'positive',
  );
});

it('renders warning component', () => {
  const { container } = render(<Radio label='Some label' status='warning' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-checkbox-wrapper')).toHaveAttribute(
    'data-iui-status',
    'warning',
  );
});

it('renders negative component', () => {
  const { container } = render(<Radio label='Some label' status='negative' />);

  assertBaseElements(container);

  screen.getByText('Some label');
  expect(container.querySelector('.iui-checkbox-wrapper')).toHaveAttribute(
    'data-iui-status',
    'negative',
  );
});

it('passes custom props to wrapper and label', () => {
  const { container } = render(
    <Radio
      label='Radio Label'
      className='custom-class'
      style={{ fontSize: 12 }}
      wrapperProps={{
        className: 'custom-wrapper-class',
        style: { fontSize: 14 },
      }}
      labelProps={{ className: 'custom-label-class', style: { fontSize: 16 } }}
    />,
  );

  // Test Radio
  const radio = container.querySelector(
    '.iui-checkbox.iui-radio.custom-class',
  ) as HTMLElement;
  expect(radio).toBeTruthy();
  expect(radio.style.fontSize).toBe('12px');

  // Test wrapper
  const wrapper = container.querySelector(
    '.iui-checkbox-wrapper.custom-wrapper-class',
  ) as HTMLElement;
  expect(wrapper).toBeTruthy();
  expect(wrapper.style.fontSize).toBe('14px');

  // Test label
  const label = container.querySelector(
    '.iui-radio-label.custom-label-class',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.style.fontSize).toBe('16px');
});
