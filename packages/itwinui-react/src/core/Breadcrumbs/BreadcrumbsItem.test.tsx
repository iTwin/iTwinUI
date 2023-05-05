/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbsItem } from './BreadcrumbsItem.js';

it('should render button type with misc props', () => {
  const { container } = render(
    <BreadcrumbsItem className='test-class' style={{ color: 'red' }}>
      test-title
    </BreadcrumbsItem>,
  );

  const button = container.querySelector('button') as HTMLElement;
  expect(button).toBeTruthy();
  expect(button).toHaveClass('iui-breadcrumbs-button test-class');
  expect(button.style.color).toEqual('red');

  const text = container.querySelector('span') as HTMLElement;
  expect(text).toBeTruthy();
  expect(text).toHaveClass('iui-breadcrumbs-text');
  expect(text.textContent).toEqual('test-title');
});

it('should render anchor type with misc props', () => {
  const { container } = render(
    <BreadcrumbsItem
      type='anchor'
      className='test-class'
      style={{ color: 'red' }}
    >
      test-title
    </BreadcrumbsItem>,
  );

  const anchor = container.querySelector('a') as HTMLElement;
  expect(anchor).toBeTruthy();
  expect(anchor).toHaveClass('iui-breadcrumbs-text test-class');
  expect(anchor.style.color).toEqual('red');
  expect(anchor.textContent).toEqual('test-title');
});

it('should render text type with misc props', () => {
  const { container } = render(
    <BreadcrumbsItem
      type='text'
      className='test-class'
      style={{ color: 'red' }}
    >
      test-title
    </BreadcrumbsItem>,
  );

  const span = container.querySelector('span') as HTMLElement;
  expect(span).toBeTruthy();
  expect(span).toHaveClass('iui-breadcrumbs-text test-class');
  expect(span.style.color).toEqual('red');
  expect(span.textContent).toEqual('test-title');
});
