/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgMore as SvgPlaceholder } from '../utils';
import { render } from '@testing-library/react';
import React from 'react';

import { Tab } from './Tab';

it('should render in its most basic state', () => {
  const { container } = render(<Tab label='Tab label' />);
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should render with sublabel', () => {
  const { container } = render(<Tab label='Tab label' sublabel='Sub-label' />);
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.firstElementChild?.textContent).toBe('Tab label');

  const sublabel = label.querySelector('.iui-tab-description') as HTMLElement;
  expect(sublabel.textContent).toEqual('Sub-label');
});

it('should render with icon', () => {
  const { container } = render(
    <Tab label='Tab label' startIcon={<SvgPlaceholder />} />,
  );
  expect(container.querySelector('button.iui-tab')).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-tab-icon' aria-hidden />);
  expect(container.querySelector('.iui-tab-icon')).toEqual(placeholderIcon);
});

it('should render in disabled state', () => {
  const { container } = render(<Tab label='Tab label' disabled />);

  const tab = container.querySelector('button.iui-tab') as HTMLButtonElement;
  expect(tab).toBeTruthy();
  expect(tab.disabled).toBeTruthy();

  const label = container.querySelector('.iui-tab-label > div') as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.textContent).toBe('Tab label');
});

it('should render custom children', () => {
  const { container } = render(
    <Tab className='custom-class'>custom children</Tab>,
  );

  expect(container.querySelector('button.iui-tab.custom-class')).toBeTruthy();
  expect(container.querySelector('.iui-tab-label')).toBeFalsy();
  expect(container.textContent).toEqual('custom children');
});
