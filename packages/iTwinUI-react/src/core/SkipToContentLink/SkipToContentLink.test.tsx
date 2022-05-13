/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import SkipToContentLink from './SkipToContentLink';

it('should render link in its most basic state', () => {
  const { container } = render(<SkipToContentLink href='#main-content-id' />);
  const link = container.querySelector(
    '.iui-skip-to-content-link',
  ) as HTMLElement;
  expect(link).toBeTruthy();
  expect(link.textContent).toBe('Skip to main content');
  expect(link).toHaveAttribute('href', '#main-content-id');
});

it('should render link with children', () => {
  const { container } = render(
    <SkipToContentLink href='#main-content-id'>
      Custom child text
    </SkipToContentLink>,
  );

  const link = container.querySelector(
    '.iui-skip-to-content-link',
  ) as HTMLElement;
  expect(link).toBeTruthy();
  expect(link.textContent).toBe('Custom child text');
});

it('should propagate misc props in link', () => {
  const { container } = render(
    <SkipToContentLink
      href='#main-content-id'
      className='test-class'
      style={{ color: 'red' }}
      aria-label='test-label'
      id='test-id'
    />,
  );
  const link = container.querySelector(
    '.iui-skip-to-content-link',
  ) as HTMLElement;
  expect(link).toHaveAttribute('href', '#main-content-id');
  expect(link).toHaveClass('test-class');
  expect(link).toHaveStyle('color: red');
  expect(link).toHaveAttribute('aria-label', 'test-label');
  expect(link).toHaveAttribute('id', 'test-id');
});
