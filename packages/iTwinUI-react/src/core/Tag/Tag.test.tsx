/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Tag } from './Tag';

it('renders in its most basic state', () => {
  const { container } = render(<Tag>Mocked tag</Tag>);
  expect(container.querySelector('.iui-tag')).toBeTruthy();

  const text = container.querySelector('.iui-tag-label') as HTMLElement;
  expect(text).toBeTruthy();
  expect(text.textContent).toBe('Mocked tag');

  expect(container.querySelector('.iui-tag-button')).toBeNull();
});

it('should propagate custom styles and className', () => {
  const { container } = render(
    <Tag className='test-class' style={{ color: 'yellow' }}>
      Mocked tag
    </Tag>,
  );
  const tag = container.querySelector('.iui-tag.test-class') as HTMLSpanElement;
  expect(tag).toBeTruthy();
  expect(tag.style.color).toEqual('yellow');
});

it('fires close event on click', () => {
  const fn = jest.fn();
  const result = render(<Tag onRemove={fn}>Mocked tag</Tag>);

  const close = result.container.querySelector(
    '.iui-tag-button',
  ) as HTMLElement;
  expect(close).toBeTruthy();
  fireEvent.click(close);
  expect(fn).toHaveBeenCalledTimes(1);
});

it('should render correctly with basic variant', () => {
  const { container } = render(<Tag variant='basic'>Mocked tag</Tag>);
  expect(container.querySelector('.iui-tag-basic')).toBeTruthy();

  const text = container.querySelector('.iui-tag-label') as HTMLElement;
  expect(text).not.toBeTruthy();
  expect(container.textContent).toBe('Mocked tag');
});
