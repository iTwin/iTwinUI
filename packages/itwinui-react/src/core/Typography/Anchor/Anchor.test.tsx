/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Anchor } from './Anchor';

it('should render in its most basic state', () => {
  const { container } = render(<Anchor>link</Anchor>);
  const anchor = container.querySelector('a') as HTMLAnchorElement;
  expect(anchor).toHaveClass('iui-anchor');
  expect(anchor).toHaveTextContent('link');
});

it('should accept anchor attributes', () => {
  const { container } = render(
    <Anchor href='https://www.example.com/' download target='_self'>
      link
    </Anchor>,
  );
  const anchor = container.querySelector('a') as HTMLAnchorElement;
  expect(anchor.href).toEqual('https://www.example.com/');
  expect(anchor.target).toEqual('_self');
  expect(anchor).toHaveAttribute('download');
});

it('should propagate misc props', () => {
  const { container } = render(
    <Anchor
      className='test-class'
      style={{ color: 'rebeccapurple' }}
      aria-label='Home'
    >
      🏠
    </Anchor>,
  );
  const anchor = container.querySelector('a') as HTMLAnchorElement;
  expect(anchor).toHaveClass('test-class');
  expect(anchor).toHaveStyle('color: rebeccapurple');
  expect(anchor).toHaveTextContent('🏠');
  expect(anchor).toHaveAttribute('aria-label', 'Home');
});
