/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgMore as SvgPlaceholder } from '../utils';
import React from 'react';
import { render } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch';

const assertBaseElements = (
  container: HTMLElement,
  labelPosition?: 'left' | 'right',
) => {
  const wrapper = container.querySelector(
    `.iui-toggle-switch-wrapper${
      labelPosition ? `.iui-label-on-${labelPosition}` : ''
    }`,
  ) as HTMLElement;
  expect(wrapper).toBeTruthy();
  expect(wrapper.tagName).toBe(!!labelPosition ? 'LABEL' : 'DIV');
  expect(container.querySelector('.iui-toggle-switch')).toBeTruthy();
  expect(
    container.querySelector('input[type="checkbox"][role="switch"]'),
  ).toBeTruthy();
};

it('should render correctly in its most basic state', () => {
  const { container } = render(<ToggleSwitch />);

  assertBaseElements(container);
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
});

it('should render checked toggle', () => {
  const { container } = render(<ToggleSwitch defaultChecked />);

  assertBaseElements(container);
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
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
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
  expect(container.querySelector('.iui-toggle-switch-icon')).toBeTruthy();
});

it('should render disabled toggle', () => {
  const { container } = render(<ToggleSwitch disabled />);

  assertBaseElements(container);
  expect(
    container.querySelector('.iui-toggle-switch-wrapper.iui-disabled'),
  ).toBeTruthy();
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .disabled,
  ).toBe(true);
});

it('should render label on the right', () => {
  const { container, getByText } = render(<ToggleSwitch label='my label' />);

  assertBaseElements(container, 'right');
  getByText('my label');
});

it('should render label on the left', () => {
  const { container, getByText } = render(
    <ToggleSwitch label='my label' labelPosition='left' />,
  );

  assertBaseElements(container, 'left');
  getByText('my label');
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container, getByText } = render(
    <ToggleSwitch label='my label' ref={onRef} setFocus />,
  );

  assertBaseElements(container, 'right');

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
    '.iui-toggle-switch-wrapper.my-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});
