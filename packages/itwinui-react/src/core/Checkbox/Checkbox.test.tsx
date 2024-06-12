/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';

import { Checkbox } from './Checkbox.js';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('input[type="checkbox"]')).toHaveClass(
    'iui-checkbox',
  );
};

it('renders correctly with label', () => {
  const { container } = render(<Checkbox label='Some checkbox' />);

  assertBaseElements(container);
  expect(container.querySelector('label')).toHaveClass('iui-checkbox-wrapper');
  expect(container.querySelector('label')).toHaveTextContent('Some checkbox');
});

it('renders correctly indeterminate state', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' indeterminate />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.indeterminate).toBe(true);
  expect(input.checked).toBe(false);
});

it('renders correctly without label and checked', () => {
  const { container } = render(<Checkbox defaultChecked />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-label')).toBeNull();
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.indeterminate).toBe(false);
  expect(input.checked).toBe(true);
});

it('renders correctly with jsx element as label', () => {
  const { container } = render(
    <Checkbox label={<div id='my-custom-label'>This is my label</div>} />,
  );

  assertBaseElements(container);

  const label = container.querySelector('#my-custom-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('This is my label');
});

it('renders disabled component', () => {
  const { container } = render(<Checkbox label='Some checkbox' disabled />);

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it('renders positive component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='positive' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-positive'),
  ).toBeTruthy();
});

it('renders warning component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='warning' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-warning'),
  ).toBeTruthy();
});

it('renders negative component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='negative' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-negative'),
  ).toBeTruthy();
});

it('displays a spinner when isLoading is set to true', () => {
  const { container } = render(<Checkbox label='Some checkbox' isLoading />);

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    container.querySelector('.iui-checkbox-wrapper.iui-loading'),
  ).toBeTruthy();
  expect(
    container.querySelector('input[type="checkbox"].iui-loading'),
  ).toBeDisabled();
  expect(
    container.querySelector('.iui-progress-indicator-radial'),
  ).toBeTruthy();
});

it('renders correctly with default checkbox', () => {
  const { container } = render(<Checkbox variant='default' />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-visibility')).toBeFalsy();
});

it('renders correctly with visibility checkbox', () => {
  const { container } = render(<Checkbox variant='eyeball' />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-checkbox-visibility')).toBeTruthy();
});

it('correctly passes className through wrapperProps and labelProps', () => {
  const { container } = render(
    <Checkbox
      label='some label'
      wrapperProps={{ className: 'some-wrapper' }}
      labelProps={{ className: 'some-label' }}
      className='some-input'
    />,
  );

  assertBaseElements(container);
  expect(container.querySelector('label')).toHaveClass(
    'iui-checkbox-wrapper some-wrapper',
  );
  expect(container.querySelector('span')).toHaveClass(
    'iui-checkbox-label some-label',
  );
  expect(container.querySelector('.iui-checkbox')).toHaveClass(
    'iui-checkbox some-input',
  );
});

it('correctly passes style through wrapperProps and labelProps', () => {
  const { container } = render(
    <Checkbox
      label='some label'
      wrapperProps={{ style: { color: 'blue' } }}
      labelProps={{ style: { color: 'orange' } }}
      style={{ color: 'yellow' }}
    />,
  );

  assertBaseElements(container);
  expect(container.querySelector('label')?.style.color).toEqual('blue');
  expect(container.querySelector('span')?.style.color).toEqual('orange');
  const checkbox = container.querySelector('.iui-checkbox') as HTMLElement;
  expect(checkbox.style.color).toEqual('yellow');
});
