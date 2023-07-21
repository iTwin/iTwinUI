/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import RadioTile from './RadioTile.js';
import { SvgMore as SvgPlaceholder } from '../utils/index.js';

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

it('should apply class and style to RadioTile component', () => {
  const { container } = render(
    <RadioTile
      className='tile-class'
      style={{ width: 80 }}
      wrapperProps={{ className: 'wrapper-class', style: { width: 80 } }}
      label='Tile Label'
      description='Tile Description'
      icon={<SvgPlaceholder />}
    />,
  );

  // Test for RadioTile wrapper
  const wrapperElement = container.querySelector(
    '.wrapper-class',
  ) as HTMLElement;
  expect(wrapperElement).toBeTruthy();
  expect(wrapperElement.style.width).toBe('80px');
});
