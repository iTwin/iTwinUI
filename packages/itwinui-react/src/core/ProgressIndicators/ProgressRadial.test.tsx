/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { ProgressRadial } from './ProgressRadial.js';

it('renders determinate ProgressRadial', () => {
  const { container } = render(<ProgressRadial value={43} />);

  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).not.toHaveAttribute('data-iui-indeterminate');
  expect(spinner).toHaveStyle('--iui-progress-percentage: 43%');
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <ProgressRadial className='custom-class' style={{ fill: 'hotpink' }} />,
  );
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveClass('custom-class');
  expect(spinner).toHaveStyle('fill: hotpink');
});

it('renders indeterminate ProgressRadial', () => {
  const { container } = render(<ProgressRadial indeterminate={true} />);
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveAttribute('data-iui-indeterminate', 'true');
});

it('renders positive ProgressRadial', () => {
  const { container } = render(<ProgressRadial status={'positive'} />);
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveAttribute('data-iui-status', 'positive');
});

it('renders negative ProgressRadial', () => {
  const { container } = render(<ProgressRadial value={40} status='negative' />);
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveStyle('--iui-progress-percentage: 40%');
  expect(spinner).toHaveAttribute('data-iui-status', 'negative');
});

it('renders determinate ProgressRadial with max value', () => {
  const { container } = render(<ProgressRadial value={222} />);
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveStyle('--iui-progress-percentage: 100%');
});

it('renders determinate ProgressRadial with min value', () => {
  const { container } = render(<ProgressRadial value={-11} />);
  const spinner = container.querySelector('.iui-progress-indicator-radial');
  expect(spinner).toHaveStyle('--iui-progress-percentage: 0%');
});

it.each(['small', 'x-small', 'large'] as const)(
  'should render %s size of ProgressRadial',
  (size) => {
    const { container } = render(<ProgressRadial size={size} />);
    const spinner = container.querySelector('.iui-progress-indicator-radial');
    expect(spinner).toHaveAttribute('data-iui-size', size);
  },
);
