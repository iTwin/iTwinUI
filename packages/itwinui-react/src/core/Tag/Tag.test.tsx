/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';

import { Tag } from './Tag.js';

it('renders in its most basic state', () => {
  const { container } = render(<Tag>Mocked tag</Tag>);
  expect(container.querySelector('.iui-tag')).toBeTruthy();

  const text = container.querySelector('.iui-tag-label') as HTMLElement;
  expect(text).toBeTruthy();
  expect(text.textContent).toBe('Mocked tag');

  expect(container.querySelector('.iui-tag-button')).toBeNull();
});

it('should allow passing arbitrary props to all dom parts', () => {
  const { container } = render(
    <Tag
      className='the-tag'
      labelProps={{ className: 'the-label' }}
      onRemove={() => {}}
      removeButtonProps={{ className: 'the-button' }}
      style={{ color: 'yellow' }}
    >
      Tag
    </Tag>,
  );

  const tag = container.querySelector('.the-tag') as HTMLSpanElement;
  expect(tag.style.color).toEqual('yellow');
  expect(container.querySelector('.the-tag span')).toHaveClass('the-label');
  expect(container.querySelector('.the-tag button')).toHaveClass('the-button');
});

it('fires close event on click', () => {
  const fn = vi.fn();
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

it('should be usable as a button', () => {
  const { getByRole } = render(<Tag onClick={() => {}}>Tag</Tag>);
  const button = getByRole('button');
  expect(button).toHaveTextContent('Tag');
});

it('should not produce invalid markup when using both onClick and onRemove', () => {
  const { container } = render(
    <Tag
      onClick={() => {}}
      labelProps={{ className: 'the-label' }}
      onRemove={() => {}}
      removeButtonProps={{ className: 'the-remove' }}
      className='the-tag'
    >
      Tag
    </Tag>,
  );

  expect(container.querySelector('.the-tag')?.nodeName).toBe('DIV');
  expect(container.querySelector('.the-label')?.nodeName).toBe('BUTTON');
  expect(container.querySelector('.the-remove')?.nodeName).toBe('BUTTON');

  expect(container.querySelector('button button')).toBeNull();
});
