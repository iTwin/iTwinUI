/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import { Popover } from './Popover.js';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider.js';

it('should open on click', async () => {
  render(
    <Popover content='Popped over'>
      <button>Click me</button>
    </Popover>,
  );

  expect(screen.queryByText('Popped over')).toBeNull();
  await userEvent.click(screen.getByText('Click me'));

  const popover = screen.getByRole('dialog');
  expect(popover).toBeVisible();
  expect(popover).toHaveTextContent('Popped over');
});

it('should close on click outside', async () => {
  render(
    <>
      <Popover content='Popped over'>
        <button>Click me</button>
      </Popover>
      <button>Outside</button>
    </>,
  );

  await userEvent.click(screen.getByText('Click me'));
  expect(screen.getByText('Popped over')).toBeVisible();

  await userEvent.click(screen.getByText('Outside'));
  expect(screen.queryByText('Popped over')).toBeNull();
});

it('should close on Esc', async () => {
  render(
    <>
      <Popover content='Popped over'>
        <button>Click me</button>
      </Popover>
    </>,
  );

  await userEvent.click(screen.getByText('Click me'));
  expect(screen.getByText('Popped over')).toBeVisible();

  await userEvent.keyboard('{Esc}');
  expect(screen.queryByText('Popped over')).toBeNull();
});

it('should portal to within the ThemeProvider', async () => {
  render(
    <ThemeProvider theme='light' className='the-root'>
      <Popover content='Popped over' className='the-popover'>
        <button>Click me</button>
      </Popover>
    </ThemeProvider>,
  );
  await userEvent.click(screen.getByText('Click me'));
  expect(screen.getByText('Popped over')).toBeVisible();

  const root = document.querySelector('.the-root') as HTMLElement;
  expect(root.querySelector('.the-popover')).toBeNull();
  expect(
    document.body.querySelector('body > [data-iui-portal] .the-popover'),
  ).toBeVisible();
});
