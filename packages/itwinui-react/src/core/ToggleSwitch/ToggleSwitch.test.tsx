/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgMore as SvgPlaceholder } from '../../utils/index.js';
import { render } from '@testing-library/react';
import { ToggleSwitch } from './ToggleSwitch.js';

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

it('should render toggle with small size', () => {
  const { container } = render(<ToggleSwitch size='small' />);

  assertBaseElements(container);
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
  expect(
    container
      .querySelector('.iui-toggle-switch-wrapper')
      ?.getAttribute('data-iui-size'),
  ).toBe('small');
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

it('should render toggle with custom icon', () => {
  const { container } = render(
    <ToggleSwitch defaultChecked icon={<SvgPlaceholder />} />,
  );

  assertBaseElements(container);
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
  expect(container.querySelector('.iui-toggle-switch-icon')).toBeTruthy();
});

it('should not display custom icon when size is small', () => {
  const { container } = render(
    // @ts-expect-error: we don't allow icon setting in small toggle switch
    <ToggleSwitch defaultChecked icon={<SvgPlaceholder />} size='small' />,
  );

  assertBaseElements(container);
  expect(container.querySelector('.iui-toggle-switch-label')).toBeNull();
  expect(container.querySelector('.iui-toggle-switch-icon')).toBeNull();
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

it('should not render an icon if it is set to null', () => {
  const { container } = render(<ToggleSwitch icon={null} />);
  expect(container.querySelector('.iui-toggle-switch-icon')).toBeNull();
});

it('should correctly pass labelProps', () => {
  const { container } = render(
    <ToggleSwitch
      className='switch-class'
      style={{ color: 'blue' }}
      label='some-label'
      labelProps={{
        className: 'some-class',
        style: { color: 'red' },
      }}
    />,
  );

  const label = container.querySelector('.some-class') as HTMLElement;

  expect(label.style.color).toBe('red');

  expect(
    (container.querySelector('.switch-class') as HTMLElement).style.color,
  ).toBe('blue');
});

it('should correctly pass wrapperProps', () => {
  const { container } = render(
    <ToggleSwitch
      wrapperProps={{
        className: 'wrapper-class-from-wrapper-props',
        style: { color: 'blue' },
      }}
      className='wrapper-class-from-root'
      style={{ color: 'red' }}
    />,
  );

  const wrapper = container.querySelector(
    '.iui-toggle-switch-wrapper',
  ) as HTMLElement;

  expect(wrapper).toBeTruthy();

  expect(wrapper.className).toContain('wrapper-class-from-wrapper-props');
  expect(wrapper.className).toContain('wrapper-class-from-root');

  expect(wrapper.style.color).toBe('blue');
  expect(wrapper.style.color).not.toBe('red');
});
