/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Text } from './Text';

it('should render in the most basic state', () => {
  const { container } = render(<Text>Some text</Text>);
  expect(container.querySelector('div.iui-text-block')?.textContent).toEqual(
    'Some text',
  );
});

it.each(['span', 'h3'] as const)('should render as %s element', (as) => {
  const { container } = render(<Text as={as}>Some text</Text>);
  expect(container.querySelector(`${as}.iui-text-block`)?.textContent).toEqual(
    'Some text',
  );
});

it.each(['headline', 'title', 'subheading', 'leading', 'small'] as const)(
  'should render %s variant',
  (variant) => {
    const { container } = render(<Text variant={variant}>Some text</Text>);
    expect(
      container.querySelector(`div.iui-text-${variant}`)?.textContent,
    ).toEqual('Some text');
  },
);

it('should render as skeleton if isSkeleton is set', () => {
  const { container } = render(<Text isSkeleton>Some text</Text>);
  expect(
    container.querySelector('div.iui-text-block.iui-skeleton')?.textContent,
  ).toEqual('Some text');
});

it('should render as muted if isMuted is set', () => {
  const { container } = render(<Text isMuted>Some text</Text>);
  expect(
    container.querySelector('div.iui-text-block.iui-text-muted')?.textContent,
  ).toEqual('Some text');
});
