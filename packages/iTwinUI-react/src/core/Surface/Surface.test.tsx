/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Surface } from './Surface';

it('should render in its most basic state', () => {
  const { container } = render(<Surface>Surface Content</Surface>);
  const surface = container.querySelector('.iui-surface') as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.textContent).toBe('Surface Content');
});

it.each([
  [0, 'none'],
  [1, '0 1px 5px rgba(0, 0, 0, 0.25)'],
  [2, '0 1px 10px rgba(0, 0, 0, 0.25)'],
  [3, '0 3px 14px rgba(0, 0, 0, 0.25)'],
  [4, '0 6px 30px rgba(0, 0, 0, 0.25)'],
  [5, '0 9px 46px rgba(0, 0, 0, 0.25)'],
] as const)('should render elevation %d surface.', (key, value) => {
  const { container } = render(
    <Surface elevation={key}>Surface Content</Surface>,
  );
  const surface = container.querySelector('.iui-surface') as HTMLElement;
  expect(surface.style.getPropertyValue('--iui-surface-elevation')).toEqual(
    value,
  );
});

it('should add className and style correctly', () => {
  const { container } = render(
    <Surface className='test-class' style={{ color: 'grey' }}>
      Surface Content
    </Surface>,
  );
  const surface = container.querySelector(
    '.iui-surface.test-class',
  ) as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.style.color).toBe('grey');
});
