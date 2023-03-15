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
  [1, 'var(--iui-shadow-1)'],
  [2, 'var(--iui-shadow-2)'],
  [3, 'var(--iui-shadow-3)'],
  [4, 'var(--iui-shadow-4)'],
  [5, 'var(--iui-shadow-5)'],
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

it('should render custom surface', () => {
  const { container } = render(
    <Surface useLayout={true}>
      <Surface.Header>TestHeader</Surface.Header>
      <Surface.Body isPadded={true}>TestBody</Surface.Body>
    </Surface>,
  );
  const surface = container.querySelector('.iui-surface') as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.getAttribute('data-iui-layout')).toBeTruthy();

  const surfaceHeader = container.querySelector(
    '.iui-surface-header',
  ) as HTMLElement;
  expect(surfaceHeader).toBeTruthy();
  expect(surfaceHeader.textContent).toBe('TestHeader');

  const surfaceBody = container.querySelector(
    '.iui-surface-body',
  ) as HTMLElement;
  expect(surfaceBody).toBeTruthy();
  expect(surfaceBody.getAttribute('data-iui-padded')).toBeTruthy();
  expect(surfaceBody.textContent).toBe('TestBody');
});
