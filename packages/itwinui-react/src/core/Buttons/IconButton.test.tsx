/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen, waitFor } from '@testing-library/react';
import { SvgMore } from '../../utils/index.js';
import * as React from 'react';

import { IconButton } from './IconButton.js';
import { userEvent } from '@testing-library/user-event';

it('renders icon button correctly', () => {
  const onClickMock = vi.fn();
  const { container } = render(
    <IconButton onClick={onClickMock} label='More options'>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).toHaveAccessibleName('More options');
  expect(button).not.toHaveAttribute('aria-pressed');

  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('renders active icon button correctly', () => {
  const onClickMock = vi.fn();
  const { container } = render(
    <IconButton isActive onClick={onClickMock}>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).toHaveAttribute('data-iui-active', 'true');
  expect(button).toHaveAttribute('aria-pressed', 'true');

  button.click();
  expect(onClickMock).toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('renders disabled small icon button correctly', () => {
  const onClickMock = vi.fn();
  const { container } = render(
    <IconButton disabled size='small' onClick={onClickMock}>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  expect(button).toBeTruthy();
  expect(button).toHaveAttribute('data-iui-size', 'small');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  button.click();
  expect(onClickMock).not.toHaveBeenCalled();
  const icon = container.querySelector('.iui-button-icon');
  expect(icon).toBeTruthy();
});

it('should render borderless button correctly', () => {
  const { container } = render(
    <IconButton styleType='borderless'>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('.iui-button');
  expect(button).toBeTruthy();
  expect(button).toHaveAttribute('data-iui-variant', 'borderless');
});

it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <IconButton as='a' href='https://example.com/'>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('a.iui-button') as HTMLAnchorElement;
  expect(button.href).toEqual('https://example.com/');
});

it('should pass props to IconButton parts', () => {
  const { container } = render(
    <IconButton
      label='hello'
      labelProps={{ className: 'the-label', visible: true }}
      iconProps={{ className: 'custom-icon-class', style: { width: 80 } }}
    >
      <SvgMore />
    </IconButton>,
  );

  const icon = container.querySelector(
    '.iui-button-icon.custom-icon-class',
  ) as HTMLElement;
  expect(icon).toBeTruthy;
  expect(icon.style.width).toBe('80px');

  const label = document.querySelector('.iui-tooltip') as HTMLElement;
  expect(label).toHaveTextContent('hello');
  expect(label).toHaveClass('the-label');
});

it('should not leave behind tooltip in DOM when not visible', async () => {
  render(
    <IconButton label='hello'>
      <svg />
    </IconButton>,
  );

  expect(screen.queryAllByText('hello')).toHaveLength(1);

  // focus the button
  await userEvent.tab();
  expect(screen.queryAllByText('hello')).toHaveLength(2);

  // unfocus the button
  await userEvent.tab();
  await waitFor(() => {
    expect(screen.queryAllByText('hello')).toHaveLength(1);
  });
});

it.each(['default', 'small', 'large'] as const)(
  'should respect `size` prop (size=%s)',
  (size) => {
    const { container } = render(
      <IconButton size={size === 'default' ? undefined : size}>
        Click me
      </IconButton>,
    );

    const button = container.querySelector('button') as HTMLElement;

    if (size === 'default') {
      expect(button).not.toHaveAttribute('data-iui-size');
    } else {
      expect(button).toHaveAttribute('data-iui-size', size);
    }
  },
);

it('should reroute title to label', () => {
  const { container } = render(
    <IconButton title='Add'>
      <SvgMore />
    </IconButton>,
  );

  const button = container.querySelector('button') as HTMLElement;
  expect(button).toHaveAccessibleName('Add');
  expect(button).toHaveTextContent('Add');
  expect(button).not.toHaveAttribute('title');
});
