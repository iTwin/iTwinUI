/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';

import { Icon } from './Icon.js';

it('should render in its most basic state', () => {
  render(<Icon>icon</Icon>);
  const icon = screen.getByText('icon');
  expect(icon).toHaveClass('iui-svg-icon');
  expect(icon).toHaveAttribute('data-iui-icon-size', 'm');
  expect(icon).toHaveAttribute('data-iui-icon-color', 'default');
  expect(icon).not.toHaveAttribute('data-iui-padded', 'true');
});

it.each(['auto', 'small', 'medium', 'large'] as const)(
  'should respect the size prop',
  (size) => {
    render(<Icon size={size}>icon</Icon>);
    const icon = screen.getByText('icon');

    if (size === 'small') {
      expect(icon).toHaveAttribute('data-iui-icon-size', 's');
    } else if (size === 'medium') {
      expect(icon).toHaveAttribute('data-iui-icon-size', 'm');
    } else if (size === 'large') {
      expect(icon).toHaveAttribute('data-iui-icon-size', 'l');
    } else {
      expect(icon).toHaveAttribute('data-iui-icon-size', size);
    }
  },
);

it.each([
  'default',
  'positive',
  'negative',
  'informational',
  'warning',
] as const)('should respect the fill prop', (fill) => {
  render(<Icon fill={fill}>icon</Icon>);
  const icon = screen.getByText('icon');
  expect(icon).toHaveAttribute('data-iui-icon-color', fill);
});

it('should forward rest props', () => {
  render(
    <Icon className='test-this' style={{ color: 'hotpink' }} aria-hidden>
      icon
    </Icon>,
  );

  const icon = screen.getByText('icon');

  expect(icon).toHaveClass('test-this');
  expect(icon.style.color).toEqual('hotpink');
  expect(icon).toHaveAttribute('aria-hidden', 'true');
});

it('should allow arbitrary sizes and fills', () => {
  render(
    <Icon size='26.2px' fill='hotpink'>
      icon
    </Icon>,
  );
  const icon = screen.getByText('icon');
  expect(icon).toHaveClass('iui-svg-icon');
  expect(icon).toHaveAttribute('data-iui-icon-size', '26.2px');
  expect(icon).toHaveAttribute('data-iui-icon-color', 'hotpink');
});

it('should render padded icon', () => {
  render(<Icon padded>icon</Icon>);
  const icon = screen.getByText('icon');
  expect(icon).toHaveAttribute('data-iui-padded', 'true');
});
