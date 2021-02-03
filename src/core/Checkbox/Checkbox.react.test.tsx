import { render, screen } from '@testing-library/react';
import React from 'react';

import { Checkbox } from './Checkbox';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('.iui-checkbox')).toBeTruthy();
  expect(container.querySelector('.iui-checkbox-checkmark')).toBeTruthy();
  expect(container.querySelector('input[type="checkbox"]')).toBeTruthy();
};

it('renders correctly in its most basic state', () => {
  const { container } = render(<Checkbox label='Some checkbox' />);

  assertBaseElements(container);

  expect(container.querySelector('.iui-label')).toBeTruthy();
  screen.getByText('Some checkbox');
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

  expect(container.querySelector('.iui-label')).toBeNull();
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
  expect(container.querySelector('.iui-checkbox.iui-positive')).toBeTruthy();
});

it('renders warning component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='warning' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(container.querySelector('.iui-checkbox.iui-warning')).toBeTruthy();
});

it('renders negative component', () => {
  const { container } = render(
    <Checkbox label='Some checkbox' status='negative' />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(container.querySelector('.iui-checkbox.iui-negative')).toBeTruthy();
});

it('takes styles for input and label', () => {
  const { container } = render(
    <Checkbox
      label='Some checkbox'
      style={{ color: 'blue' }}
      checkmarkStyle={{ backgroundColor: 'red' }}
    />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    (container.querySelector('.iui-checkbox') as HTMLElement).style.color,
  ).toBe('blue');
  expect(
    (container.querySelector('.iui-checkbox-checkmark') as HTMLElement).style
      .backgroundColor,
  ).toBe('red');
});

it('takes class for input and label', () => {
  const { container } = render(
    <Checkbox
      label='Some checkbox'
      className='labelClass'
      checkmarkClassName='checkboxClass'
    />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(
    (container.querySelector('.iui-checkbox') as HTMLElement).classList,
  ).toContain('labelClass');
  expect(
    (container.querySelector('.iui-checkbox-checkmark') as HTMLElement)
      .classList,
  ).toContain('checkboxClass');
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container } = render(
    <Checkbox label='Some checkbox' ref={onRef} setFocus />,
  );

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});

it('displays a spinner when isLoading is set to true', () => {
  const { container } = render(<Checkbox label='Some checkbox' isLoading />);

  assertBaseElements(container);

  screen.getByText('Some checkbox');
  expect(container.querySelector('.iui-checkbox.iui-loading')).toBeTruthy();
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
  expect(
    container.querySelector('.iui-progress-indicator-radial.iui-indeterminate'),
  ).toBeTruthy();
});
