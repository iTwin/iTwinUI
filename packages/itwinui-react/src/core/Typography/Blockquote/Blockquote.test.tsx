/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Blockquote } from './Blockquote';

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <Blockquote>
      <p>test-child</p>
    </Blockquote>,
  );

  expect(container.querySelector('blockquote.iui-blockquote')).toBeTruthy();

  const child = container.querySelector(
    'blockquote.iui-blockquote > p',
  ) as HTMLParagraphElement;
  expect(child).toBeTruthy();
  expect(child.textContent).toBe('test-child');
});

it('should add custom className', () => {
  const { container } = render(
    <Blockquote className='test-classname'>test-quote</Blockquote>,
  );

  expect(
    container.querySelector('blockquote.iui-blockquote.test-classname'),
  ).toBeTruthy();
});

it('should have cite attribute', () => {
  const { container } = render(
    <Blockquote cite='test-cite'>test-quote</Blockquote>,
  );

  const blockquote = container.querySelector(
    'blockquote.iui-blockquote',
  ) as HTMLQuoteElement;
  expect(blockquote).toBeTruthy();
  expect(blockquote.cite).toContain('test-cite');
});

it('should render correctly with footer', () => {
  const { container } = render(
    <Blockquote footer='test-footer'>test-quote</Blockquote>,
  );

  expect(container.querySelector('blockquote.iui-blockquote')).toBeTruthy();

  const footer = container.querySelector(
    'blockquote.iui-blockquote > footer',
  ) as HTMLElement;
  expect(footer).toBeTruthy();
  expect(footer.textContent).toBe('test-footer');
});
