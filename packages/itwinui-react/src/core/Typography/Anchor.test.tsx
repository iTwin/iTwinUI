/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { Anchor } from './Anchor.js';
import { Text } from './Text.js';

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
  expect(anchor.style.color).toEqual('rebeccapurple');
  expect(anchor).toHaveTextContent('🏠');
  expect(anchor).toHaveAttribute('aria-label', 'Home');
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <Anchor as='button' onClick={() => vi.fn()}>
      is it a link or button?
    </Anchor>,
  );

  expect(container.querySelector('button')).toHaveClass('iui-anchor');

  // @ts-expect-error -- href should not be allowed when using as='button'
  <Anchor as='button' href='#'>
    test
  </Anchor>;
});

it('should support isExternal prop', () => {
  const { container } = render(
    <Anchor href='https://www.example.com/' isExternal>
      link
    </Anchor>,
  );
  expect(container.querySelector('a')).toHaveClass('iui-anchor-external');
});

it('should include a warning if the link opens in a new tab', () => {
  const { container } = render(
    <Anchor href='https://www.example.com/' target='_blank'>
      link
    </Anchor>,
  );
  expect(container.querySelector('a')).toHaveAccessibleName(
    'link (opens in new tab)',
  );
});

it('should support underline prop', () => {
  const { container } = render(
    <Anchor underline href='#'>
      link
    </Anchor>,
  );
  expect(container.querySelector('a')).toHaveAttribute(
    'data-iui-underline',
    'true',
  );
});

it('should underline by default when inside Text component', () => {
  const { container } = render(<Anchor href='#'>link</Anchor>, {
    wrapper: ({ children }) => <Text>{children}</Text>,
  });
  expect(container.querySelector('a')).toHaveAttribute(
    'data-iui-underline',
    'true',
  );
});
