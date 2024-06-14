/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden.js';

it('should render in its most basic state', () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });

  const { container } = render(<VisuallyHidden>hi</VisuallyHidden>);
  act(() => vi.runAllTicks());

  const visuallyHidden = container.querySelector('span') as HTMLElement;
  expect(visuallyHidden).toHaveClass('iui-visually-hidden');
  expect(visuallyHidden).toHaveAttribute('data-iui-unhide-on-focus');

  expect(visuallyHidden.shadowRoot?.querySelector('slot')).toBeTruthy();
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(<VisuallyHidden as='div'>hi</VisuallyHidden>);
  expect(container.querySelector('div')).toHaveClass('iui-visually-hidden');
});

it('should respect unhideOnFocus prop', () => {
  const { container } = render(
    <VisuallyHidden unhideOnFocus={false}>hi</VisuallyHidden>,
  );
  expect(container.querySelector('.iui-visually-hidden')).not.toHaveAttribute(
    'data-iui-unhide-on-focus',
  );
});

it('should work with elements that do not support attaching shadow roots', () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });
  const { container } = render(<VisuallyHidden as='label'>hi</VisuallyHidden>);
  act(() => vi.runAllTicks());
  expect(container.querySelector('label')).toHaveClass('iui-visually-hidden');
});

it('should work with self-closing elements', () => {
  vi.useFakeTimers({ toFake: ['queueMicrotask'] });
  const { container } = render(<VisuallyHidden as='input' />);
  act(() => vi.runAllTicks());
  expect(container.querySelector('input')).toHaveClass('iui-visually-hidden');
});
