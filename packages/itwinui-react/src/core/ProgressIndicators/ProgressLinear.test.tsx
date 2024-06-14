/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render, screen } from '@testing-library/react';
import { ProgressLinear } from './ProgressLinear.js';

it('renders determinate ProgressLinear', () => {
  const { container } = render(<ProgressLinear value={40} />);
  const progress = container.querySelector('div');
  expect(progress).toHaveClass('iui-progress-indicator-linear');
  expect(progress).not.toHaveAttribute('data-iui-indeterminate');
  expect(progress).not.toHaveAttribute('data-iui-animated');
  expect(progress).toHaveStyle('--iui-progress-percentage: 40%;');
});

it('renders filled ProgressLinear with min value', () => {
  const { container } = render(<ProgressLinear value={-12} />);
  const progress = container.querySelector('div');
  expect(progress).toHaveStyle('--iui-progress-percentage: 0%;');
});

it('renders filled ProgressLinear with max value', () => {
  const { container } = render(<ProgressLinear value={300} />);
  const progress = container.querySelector('div');
  expect(progress).toHaveStyle('--iui-progress-percentage: 100%;');
});

it('renders indeterminate ProgressLinear', () => {
  const { container } = render(<ProgressLinear indeterminate />);
  const progress = container.querySelector('div');
  expect(progress).toHaveAttribute('data-iui-indeterminate', 'true');
});

it('renders animated determinate ProgressLinear', () => {
  const { container } = render(<ProgressLinear isAnimated value={40} />);
  const progress = container.querySelector('div');
  expect(progress).not.toHaveAttribute('data-iui-indeterminate');
  expect(progress).toHaveAttribute('data-iui-animated', 'true');
});

it.each(['positive', 'negative', 'warning'] as const)(
  'renders %s ProgressLinear',
  (status) => {
    const { container } = render(<ProgressLinear status={status} />);
    const progress = container.querySelector('div');
    expect(progress).toHaveAttribute('data-iui-indeterminate', 'true');
    expect(progress).toHaveAttribute('data-iui-status', status);
  },
);

it('renders ProgressLinear with single label', () => {
  const { container } = render(
    <ProgressLinear value={40} labels={['Loading...']} />,
  );

  const progress = container.querySelector('div') as HTMLElement;
  expect(progress).toHaveClass('iui-progress-indicator-linear');

  const labels = progress.querySelector('div');
  expect(labels).toHaveClass('iui-progress-indicator-linear-label');
  expect(labels).toHaveTextContent('Loading...');
});

it('renders ProgressLinear with 2 labels', () => {
  const { container } = render(
    <ProgressLinear value={40} labels={['Processing...', 'test.dgn']} />,
  );

  const progress = container.querySelector('div') as HTMLElement;
  expect(progress).toHaveClass('iui-progress-indicator-linear');

  const labels = progress.querySelector('div');
  expect(labels).toHaveClass('iui-progress-indicator-linear-label');
  expect(labels?.children).toHaveLength(2);
  screen.getByText('Processing...');
  screen.getByText('test.dgn');
});

it('passes custom props to ProgressLinear parts', () => {
  const value = 100;
  const labels = ['Upload done!', '100%'];
  const status = 'positive';
  const { container } = render(
    <ProgressLinear
      value={value}
      labels={labels}
      labelGroupProps={{
        className: 'custom-label-group-class',
        style: { fontSize: 12 },
      }}
      status={status}
    />,
  );

  // Label group test

  const labelGroup = container.querySelector(
    '.iui-progress-indicator-linear-label.custom-label-group-class',
  ) as HTMLElement;
  expect(labelGroup).toBeTruthy;
  expect(labelGroup.style.fontSize).toBe('12px');
});

it('should include visually-hidden loading message when not at 100%', () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });

  const { container, rerender } = render(<ProgressLinear />);
  act(() => vi.runAllTicks());

  const progress = container.querySelector('div') as HTMLElement;
  expect(progress.shadowRoot).toHaveTextContent('Loading.');

  rerender(<ProgressLinear value={50} />);
  expect(progress.shadowRoot).toHaveTextContent('Loading.');

  rerender(<ProgressLinear value={100} />);
  expect(progress.shadowRoot).not.toHaveTextContent('Loading.');
});
