/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden.js';

it('should render in its most basic state', () => {
  const { container } = render(<VisuallyHidden>hi</VisuallyHidden>);
  const visuallyHidden = container.querySelector('span') as HTMLElement;
  expect(visuallyHidden).toHaveClass('iui-visually-hidden');
  expect(visuallyHidden).toHaveAttribute('data-iui-unhide-on-focus');
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
