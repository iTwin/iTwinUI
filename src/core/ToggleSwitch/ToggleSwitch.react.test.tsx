import { SvgPlaceholder } from '@bentley/icons-generic-react';
import React from 'react';
import { render } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch';

const assertBaseElements = (container: HTMLElement) => {
  expect(container.querySelector('.iui-toggle-switch')).toBeTruthy();
  expect(container.querySelector('.iui-toggle > .iui-handle')).toBeTruthy();
  expect(container.querySelector('input[type="checkbox"]')).toBeTruthy();
};

it('should render correctly in its most basic state', () => {
  const { container } = render(<ToggleSwitch />);

  assertBaseElements(container);
  expect(container.querySelector('.iui-label')).toBeNull();
});

it('should render checked toggle', () => {
  const { container } = render(<ToggleSwitch defaultChecked />);

  assertBaseElements(container);
  expect(container.querySelector('.iui-label')).toBeNull();
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .checked,
  ).toBe(true);
});

it('should render toggle with icon', () => {
  const { container } = render(
    <ToggleSwitch defaultChecked icon={<SvgPlaceholder />} />,
  );

  assertBaseElements(container);
  expect(container.querySelector('.iui-label')).toBeNull();
  expect(container.querySelector('.iui-toggle > .iui-icon')).toBeTruthy();
});

it('should render disabled toggle', () => {
  const { container } = render(<ToggleSwitch disabled />);

  assertBaseElements(container);
  expect(
    container.querySelector('.iui-toggle-switch.iui-disabled'),
  ).toBeTruthy();
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it('should render label on the right', () => {
  const { container, getByText } = render(<ToggleSwitch label='my label' />);

  assertBaseElements(container);
  getByText('my label');
  expect(container.querySelector('.iui-toggle ~ .iui-label')).toBeTruthy();
});

it('should render label on the left', () => {
  const { container, getByText } = render(
    <ToggleSwitch label='my label' labelPosition='left' />,
  );

  assertBaseElements(container);
  getByText('my label');
  expect(container.querySelector('.iui-label ~ .iui-toggle')).toBeTruthy();
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container, getByText } = render(
    <ToggleSwitch label='my label' ref={onRef} setFocus />,
  );

  assertBaseElements(container);

  getByText('my label');
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});

it('should apply style and class', () => {
  const { container } = render(
    <ToggleSwitch className='my-class' style={{ width: 80 }} />,
  );

  assertBaseElements(container);
  const element = container.querySelector(
    '.iui-toggle-switch.my-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});
