/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { RadioTile } from './RadioTile.js';
import { SvgMore as SvgPlaceholder } from '../../utils/index.js';

it('should render empty radio tile', () => {
  const { container } = render(<RadioTile />);
  expect(container.querySelector('.iui-radio-tile')).toBeTruthy();
  expect(container.querySelector('.iui-radio-tile-label')).toBeNull();
  expect(container.querySelector('.iui-radio-tile-sublabel')).toBeNull();
  expect(container.querySelector('.iui-radio-tile-icon')).toBeNull();
});

it('should render radio tile with label', () => {
  const { container } = render(<RadioTile label='My label' />);
  expect(container.querySelector('.iui-radio-tile')).toBeTruthy();
  const label = container.querySelector('.iui-radio-tile-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('My label');
});

it('should render radio tile with label and description', () => {
  const { container } = render(
    <RadioTile label='My label' description='And description' />,
  );
  expect(container.querySelector('.iui-radio-tile')).toBeTruthy();
  const label = container.querySelector('.iui-radio-tile-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('My label');
  const description = container.querySelector(
    '.iui-radio-tile-sublabel',
  ) as HTMLElement;
  expect(description).toBeTruthy();
  expect(description.textContent).toBe('And description');
});

it('should render radio tile with icon', () => {
  const { container } = render(<RadioTile icon={<SvgPlaceholder />} />);
  expect(container.querySelector('.iui-radio-tile')).toBeTruthy();
  expect(container.querySelector('.iui-radio-tile-icon')).toBeTruthy();
});

it('should apply class and style to different parts of the RadioTile component', () => {
  const { container } = render(
    <RadioTile
      className='custom-class'
      style={{ width: 80 }}
      wrapperProps={{ className: 'wrapper-class', style: { width: 80 } }}
      iconProps={{ className: 'icon-class', style: { width: 80 } }}
      labelProps={{ className: 'label-class', style: { width: 80 } }}
      subLabelProps={{ className: 'sublabel-class', style: { width: 80 } }}
      label='Tile Label'
      description='Tile Description'
      icon={<SvgPlaceholder />}
    />,
  );

  // Test for RadioTile wrapper
  const wrapperElement = container.querySelector(
    '.iui-radio-tile.wrapper-class',
  ) as HTMLElement;
  expect(wrapperElement).toBeTruthy();
  expect(wrapperElement.style.width).toBe('80px');

  // Test for RadioTile input
  const inputElement = container.querySelector(
    '.iui-radio-tile-input.custom-class',
  ) as HTMLElement;
  expect(inputElement).toBeTruthy();
  expect(inputElement.style.width).toBe('80px');

  // Test for RadioTile icon
  const iconElement = container.querySelector(
    '.iui-radio-tile-icon.icon-class',
  ) as HTMLElement;
  expect(iconElement).toBeTruthy();
  expect(iconElement.style.width).toBe('80px');

  // Test for RadioTile label
  const labelElement = container.querySelector(
    '.iui-radio-tile-label.label-class',
  ) as HTMLElement;
  expect(labelElement).toBeTruthy();
  expect(labelElement.style.width).toBe('80px');

  // Test for RadioTile sublabel
  const sublabelElement = container.querySelector(
    '.iui-radio-tile-sublabel.sublabel-class',
  ) as HTMLElement;
  expect(sublabelElement).toBeTruthy();
  expect(sublabelElement.style.width).toBe('80px');
});
