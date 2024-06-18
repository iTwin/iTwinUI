/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from '@testing-library/react';

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

it.each(['positive', 'negative', 'warning'] as const)(
  'renders %s ProgressRadial',
  (status) => {
    const { container } = render(<ProgressRadial status={status} />);
    const spinner = container.querySelector('.iui-progress-indicator-radial');
    expect(spinner).toHaveAttribute('data-iui-status', status);
  },
);

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

it('should include visually-hidden loading message when not at 100%', () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });

  const { container, rerender } = render(<ProgressRadial />);
  act(() => vi.runAllTicks());

  const progress = container.querySelector('div') as HTMLElement;
  expect(progress.shadowRoot).toHaveTextContent('Loading.');

  rerender(<ProgressRadial value={50} />);
  expect(progress.shadowRoot).toHaveTextContent('Loading.');

  rerender(<ProgressRadial value={100} />);
  expect(progress.shadowRoot).not.toHaveTextContent('Loading.');
});
