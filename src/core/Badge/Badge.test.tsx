/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Badge } from './Badge';

it('should render in its most basic state', () => {
  const { container } = render(<Badge backgroundColor='skyblue'>label</Badge>);
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe('label');
  expect(badge.title).toBeFalsy();
});

it('should add className and style correctly', () => {
  const { container } = render(
    <Badge
      backgroundColor='skyblue'
      className='test-class'
      style={{ color: 'grey' }}
    >
      label
    </Badge>,
  );
  const badge = container.querySelector('.iui-badge.test-class') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.style.color).toBe('grey');
});

it('should work with long labels', () => {
  const label = 'Long label that gets truncated';
  const { container } = render(
    <Badge backgroundColor='skyblue' title={label}>
      {label}
    </Badge>,
  );
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe(label);
  expect(badge.title).toBe(label);
});
