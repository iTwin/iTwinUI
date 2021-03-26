// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render } from '@testing-library/react';

import RadioTile from './RadioTile';
import SvgPlaceholder from '@bentley/icons-generic-react/cjs/icons/Placeholder';

it('should render empty radio tile', () => {
  const { container } = render(<RadioTile />);
  expect(container.querySelector('label > .iui-radio-tile')).toBeTruthy();
  expect(container.querySelector('.iui-label')).toBeNull();
  expect(container.querySelector('.iui-description')).toBeNull();
  expect(container.querySelector('.iui-icon')).toBeNull();
  expect(container.querySelector('.iui-checkmark')).toBeTruthy();
});

it('should render radio tile with label', () => {
  const { container } = render(<RadioTile label='My label' />);
  expect(container.querySelector('label > .iui-radio-tile')).toBeTruthy();
  const label = container.querySelector('.iui-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('My label');
});

it('should render radio tile with label and description', () => {
  const { container } = render(
    <RadioTile label='My label' description='And description' />,
  );
  expect(container.querySelector('label > .iui-radio-tile')).toBeTruthy();
  const label = container.querySelector('.iui-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('My label');
  const description = container.querySelector(
    '.iui-description',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toBe('And description');
});

it('should render radio tile with icon', () => {
  const { container } = render(<RadioTile icon={<SvgPlaceholder />} />);
  expect(container.querySelector('label > .iui-radio-tile')).toBeTruthy();
  expect(container.querySelector('.iui-icon')).toBeTruthy();
});

it('should take class and style', () => {
  const { container } = render(
    <RadioTile
      className='my-class'
      style={{ width: 80 }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector('label.my-class') as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should set focus', () => {
  let element: HTMLInputElement | null = null;
  const onRef = (ref: HTMLInputElement) => {
    element = ref;
  };
  const { container } = render(
    <RadioTile label='Some label' ref={onRef} setFocus />,
  );

  expect(container.querySelector('label > .iui-radio-tile')).toBeTruthy();

  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(element);
});
