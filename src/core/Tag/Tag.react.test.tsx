// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tag } from './Tag';

it('renders in its most basic state', () => {
  const { container } = render(<Tag />);

  expect(container.querySelector('.iui-tag')).toBeTruthy();
  expect(container.querySelector('.iui-tag-text')).toBeTruthy();
  expect(container.querySelector('.iui-tag-close-icon')).toBeNull();
});

it('renders tag text', () => {
  const { container } = render(<Tag>Mocked tag</Tag>);

  const element = screen.getByText('Mocked tag');
  expect(element).toBeTruthy();
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
