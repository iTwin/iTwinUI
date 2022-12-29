/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { ProgressRadial } from './ProgressRadial';

it('renders determinate ProgressRadial', () => {
  const { container } = render(<ProgressRadial value={43} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  expect(container.querySelector('.iui-track')).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('50.16');
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <ProgressRadial className='custom-class' style={{ fill: 'hotpink' }} />,
  );
  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.custom-class',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  expect(spinner.style.fill).toEqual('hotpink');
});

it('renders indeterminate ProgressRadial', () => {
  const { container } = render(<ProgressRadial indeterminate={true} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-indeterminate',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  expect(container.querySelector('.iui-track')).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('0');
});

it('renders positive ProgressRadial', () => {
  const { container } = render(<ProgressRadial status={'positive'} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate.iui-positive',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('0');
});

it('renders negative ProgressRadial', () => {
  const { container } = render(<ProgressRadial value={40} status='negative' />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate.iui-negative',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('52.8');
});

it('renders determinate ProgressRadial with max value', () => {
  const { container } = render(<ProgressRadial value={222} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('0');
});

it('renders determinate ProgressRadial with min value', () => {
  const { container } = render(<ProgressRadial value={-11} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('88');
});

it('renders determinate ProgressRadial with no value', () => {
  const { container } = render(<ProgressRadial />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('88');
});

it('renders determinate small  ProgressRadial', () => {
  const { container } = render(<ProgressRadial size={'small'} value={50} />);

  const spinner = container.querySelector(
    '.iui-progress-indicator-radial.iui-determinate.iui-small',
  ) as HTMLElement;
  expect(spinner).toBeTruthy();
  const spinnerFill = container.querySelector('.iui-fill') as SVGCircleElement;
  expect(spinnerFill.style.strokeDashoffset).toBe('44');
});

it('should render all sizes of ProgressRadial', () => {
  const sizes = ['small', 'x-small', 'large'] as const;

  sizes.forEach((size) => {
    const { container } = render(<ProgressRadial size={size} />);
    const spinner = container.querySelector(
      `.iui-progress-indicator-radial.iui-determinate.iui-${size}`,
    ) as HTMLElement;
    expect(spinner).toBeTruthy();
  });
});
