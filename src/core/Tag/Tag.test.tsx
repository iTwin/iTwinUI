// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Tag } from './Tag';

it('renders in its most basic state', () => {
  const { container } = render(<Tag>Mocked tag</Tag>);
  expect(container.querySelector('.iui-tag')).toBeTruthy();

  const text = container.querySelector('.iui-tag-text') as HTMLElement;
  expect(text).toBeTruthy();
  expect(text.textContent).toBe('Mocked tag');

  expect(container.querySelector('.iui-tag-close-icon')).toBeNull();
});

it('fires close event on click', () => {
  const fn = jest.fn();
  const result = render(<Tag onRemove={fn}>Mocked tag</Tag>);

  const close = result.container.querySelector(
    '.iui-tag-close-icon',
  ) as HTMLElement;
  expect(close).toBeTruthy();
  fireEvent.click(close);
  expect(fn).toHaveBeenCalledTimes(1);
});
