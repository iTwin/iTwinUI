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

it('should render and style each DOM node', () => {
  const testData = [
    {
      props: {
        className: 'tile-class',
        style: { width: 80 },
      },
      selector: '.iui-radio-tile.tile-class',
    },
    {
      props: {
        inputProps: { className: 'input-class', style: { width: 80 } },
      },
      selector: '.iui-radio-tile-input.input-class',
    },
    {
      props: {
        contentProps: { className: 'content-class', style: { width: 80 } },
      },
      selector: '.iui-radio-tile-content.content-class',
    },
    {
      props: {
        iconProps: { className: 'icon-class', style: { width: 80 } },
      },
      selector: '.iui-radio-tile-icon.icon-class',
    },
    {
      props: {
        label: 'Tile Label',
        labelProps: { className: 'label-class', style: { width: 80 } },
      },
      selector: '.iui-radio-tile-label.label-class',
    },
    {
      props: {
        description: 'Tile Description',
        subLabelProps: { className: 'sublabel-class', style: { width: 80 } },
      },
      selector: '.iui-radio-tile-sublabel.sublabel-class',
    },
  ];

  testData.forEach(({ props, selector }) => {
    const { container } = render(
      <RadioTile icon={<SvgPlaceholder />} {...props} />,
    );

    const element = container.querySelector(selector) as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.style.width).toBe('80px');
  });
});
