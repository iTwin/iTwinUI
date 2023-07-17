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

it('should take tile class and style', () => {
  const { container } = render(
    <RadioTile
      tileProps={{ className: 'tile-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile.tile-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should take input class and style', () => {
  const { container } = render(
    <RadioTile
      inputProps={{ className: 'input-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile-input.input-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should take content class and style', () => {
  const { container } = render(
    <RadioTile
      contentProps={{ className: 'content-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile-content.content-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should take icon class and style', () => {
  const { container } = render(
    <RadioTile
      iconProps={{ className: 'icon-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile-icon.icon-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should take label class and style', () => {
  const { container } = render(
    <RadioTile
      labelProps={{ className: 'label-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile-label.label-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});

it('should take sublabel class and style', () => {
  const { container } = render(
    <RadioTile
      subLabelProps={{ className: 'sublabel-class', style: { width: 80 } }}
      icon={<SvgPlaceholder />}
    />,
  );
  const element = container.querySelector(
    '.iui-radio-tile-sublabel.sublabel-class',
  ) as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.width).toBe('80px');
});
