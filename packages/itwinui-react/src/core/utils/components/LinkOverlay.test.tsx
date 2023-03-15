/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { LinkBox, LinkOverlay } from './LinkOverlay';

it('should render LinkBox and LinkOverlay in its most basic state', () => {
  const { container } = render(
    <LinkBox data-testid='link-box'>
      <LinkOverlay data-testid='link-overlay'>Content</LinkOverlay>
    </LinkBox>,
  );

  const linkBox = container.querySelector('div') as HTMLElement;
  const linkOverlay = container.querySelector('a') as HTMLElement;

  expect(linkBox).toBeTruthy();
  expect(linkBox).toHaveClass('iui-link-box');
  expect(linkBox).toHaveAttribute('data-testid', 'link-box');

  expect(linkOverlay).toBeTruthy();
  expect(linkOverlay).toHaveClass('iui-link-overlay');
  expect(linkOverlay).toHaveAttribute('data-testid', 'link-overlay');
});

it('should render LinkOverlay as a button', () => {
  const { container } = render(
    <LinkBox data-test-id='link-box'>
      <LinkOverlay as='button' data-test-id='link-overlay'>
        Content
      </LinkOverlay>
    </LinkBox>,
  );
  expect(container.querySelector('div')).toHaveClass('iui-link-box');
  expect(container.querySelector('button')).toHaveClass('iui-link-overlay');
});

it('should render LinkOverlay as a paragraph', () => {
  const { container } = render(
    <LinkBox as='p' data-test-id='link-box'>
      <LinkOverlay data-test-id='link-overlay'>Content</LinkOverlay>
    </LinkBox>,
  );
  expect(container.querySelector('p')).toHaveClass('iui-link-box');
  expect(container.querySelector('a')).toHaveClass('iui-link-overlay');
});
