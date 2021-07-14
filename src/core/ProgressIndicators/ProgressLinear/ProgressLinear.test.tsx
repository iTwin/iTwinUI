/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import { render, screen } from '@testing-library/react';
import { ProgressLinear } from './ProgressLinear';

it('renders empty ProgressLinear', () => {
  const { container } = render(<ProgressLinear />);

  const bar = container.querySelector(
    '.iui-progress-indicator-linear',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('0%');
  expect(container.querySelector('.iui-label')).toBeNull();
});

it('renders filled ProgressLinear', () => {
  const { container } = render(<ProgressLinear value={40} />);

  const bar = container.querySelector(
    '.iui-progress-indicator-linear',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('40%');
  expect(container.querySelector('.iui-label')).toBeNull();
});

it('renders filled ProgressLinear with min value', () => {
  const { container } = render(<ProgressLinear value={-12} />);

  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('0%');
});

it('renders filled ProgressLinear with max value', () => {
  const { container } = render(<ProgressLinear value={300} />);

  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('100%');
});

it('renders indeterminate ProgressLinear', () => {
  const { container } = render(<ProgressLinear indeterminate value={40} />);

  const bar = container.querySelector(
    '.iui-progress-indicator-linear',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('100%');
  expect(fill.className).toContain('iui-indeterminate');
  expect(container.querySelector('.iui-label')).toBeNull();
});

it('renders animated determinate ProgressLinear', () => {
  const { container } = render(<ProgressLinear isAnimated value={40} />);

  const bar = container.querySelector(
    '.iui-progress-indicator-linear',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('40%');
  expect(fill.className).toContain('iui-determinate');
  expect(container.querySelector('.iui-label')).toBeNull();
});

it('renders positive ProgressLinear', () => {
  const { container } = render(<ProgressLinear status='positive' />);

  const bar = container.querySelector(
    '.iui-progress-indicator-linear.iui-positive',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
});

it('renders negative ProgressLinear', () => {
  const { container } = render(
    <ProgressLinear isAnimated value={40} status='negative' />,
  );

  const bar = container.querySelector(
    '.iui-progress-indicator-linear.iui-negative',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const fill = container.querySelector('.iui-track > .iui-fill') as HTMLElement;
  expect(fill).toBeTruthy();
  expect(fill.style.width).toBe('40%');
});

it('renders ProgressLinear with single label', () => {
  const { container } = render(
    <ProgressLinear value={40} labels={['Loading...']} />,
  );

  const labels = container.querySelector('.iui-label') as HTMLElement;
  expect(labels).toBeTruthy();
  screen.getByText('Loading...');
});

it('renders ProgressLinear with 2 labels', () => {
  const { container } = render(
    <ProgressLinear value={40} labels={['Processing...', 'test.dgn']} />,
  );

  const labels = container.querySelector('.iui-label') as HTMLElement;
  expect(labels).toBeTruthy();
  expect(labels.children.length).toBe(2);
  screen.getByText('Processing...');
  screen.getByText('test.dgn');
});

it('renders positive ProgressLinear with 2 labels', () => {
  const { container } = render(
    <ProgressLinear
      value={40}
      status='positive'
      labels={['Processing...', 'test.dgn']}
    />,
  );

  const bar = container.querySelector(
    '.iui-progress-indicator-linear.iui-positive',
  ) as HTMLElement;
  expect(bar).toBeTruthy();
  const labels = container.querySelector('.iui-label') as HTMLElement;
  expect(labels).toBeTruthy();
  expect(labels.children.length).toBe(2);
  screen.getByText('Processing...');
  screen.getByText('test.dgn');
});
