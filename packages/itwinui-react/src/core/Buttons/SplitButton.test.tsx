/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { SplitButton } from './SplitButton.js';
import { MenuItem } from '../Menu/MenuItem.js';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '../../utils/index.js';
import { userEvent } from '@testing-library/user-event';

function renderComponent(
  onClick?: () => void,
  props?: Partial<React.ComponentProps<typeof SplitButton>>,
) {
  return render(
    <SplitButton
      onClick={onClick ?? vi.fn()}
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
      {...props}
    >
      child
    </SplitButton>,
  );
}

it('should render in its most basic state', () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button-split')).toBeTruthy();
  expect(container.querySelector('.iui-button-icon')).toBeTruthy();
});

it('should fire onClick callback', async () => {
  const onClickMock = vi.fn();
  const { container } = renderComponent(onClickMock);
  expect(container.querySelector('.iui-button-split')).toBeTruthy();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;
  await userEvent.click(button);
  expect(onClickMock).toHaveBeenCalledTimes(1);

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  await userEvent.click(dropdownButton);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('should update when menu opens or closes', async () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button-split')).toBeTruthy();
  expect(container.querySelector('.iui-button')).toBeTruthy();

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  expect(dropdownButton).toBeTruthy();
  expect(dropdownButton).not.toHaveAttribute('data-iui-has-popover', 'open');

  const {
    container: { firstChild: downArrow },
  } = render(<SvgCaretDownSmall />);

  let buttonIcon = container.querySelector('.iui-button-icon');
  let svg = buttonIcon?.querySelector('svg');

  expect(buttonIcon).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toEqual(downArrow);

  // Open menu
  await userEvent.click(dropdownButton);
  expect(dropdownButton).toHaveAttribute('data-iui-has-popover', 'open');

  const {
    container: { firstChild: upArrow },
  } = render(<SvgCaretUpSmall />);

  buttonIcon = container.querySelector('.iui-button-icon');
  svg = buttonIcon?.querySelector('svg');

  expect(svg).toEqual(upArrow);

  // Close menu
  await userEvent.click(dropdownButton);
  expect(dropdownButton).not.toHaveAttribute('data-iui-has-popover', 'open');
  expect(container.querySelector('.iui-button-icon svg')).toEqual(downArrow);
});

it('should work with menu items', async () => {
  const { container } = renderComponent();
  expect(container.querySelector('.iui-button-split')).toBeTruthy();

  let menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeFalsy();

  const dropdownButton = container.querySelectorAll(
    '.iui-button',
  )[1] as HTMLButtonElement;
  await userEvent.click(dropdownButton);

  menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeTruthy();

  expect(document.querySelectorAll('[role=menuitem]')).toHaveLength(3);

  const menuItem = menu.querySelector('[role=menuitem]') as HTMLElement;
  expect(menuItem).toBeVisible();
  await userEvent.click(menuItem);

  expect(menuItem).not.toBeVisible();
});

it('should support polymorphic `as` prop', async () => {
  const { container } = render(
    <SplitButton
      as='a'
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
      ]}
      href='https://www.example.com/'
      rel='nofollow'
    >
      Example
    </SplitButton>,
  );

  const splitMenu = container.querySelector('.iui-button-split') as HTMLElement;
  expect(splitMenu).toBeTruthy();

  const anchor = splitMenu.querySelector('a') as HTMLAnchorElement;
  expect(anchor.href).toEqual('https://www.example.com/');
  expect(anchor).toHaveTextContent('Example');
  expect(anchor).toHaveAttribute('rel', 'nofollow');

  expect(document.querySelector('.iui-menu')).toBeFalsy();
  const dropdownButton = splitMenu.querySelector('button') as HTMLButtonElement;
  await userEvent.click(dropdownButton);
  expect(document.querySelector('.iui-menu')).toBeVisible();
});

it('passes custom props to subcomponents', () => {
  const { container } = render(
    <SplitButton
      wrapperProps={{
        className: 'custom-wrapper-class',
        style: { fontSize: 12 },
      }}
      menuButtonProps={{
        className: 'custom-menu-button-class',
        style: { fontSize: 14 },
      }}
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
      ]}
    >
      Example
    </SplitButton>,
  );

  const wrapperElement = container.querySelector(
    '.custom-wrapper-class',
  ) as HTMLElement;
  expect(wrapperElement).toBeTruthy();
  expect(wrapperElement.style.fontSize).toBe('12px');

  const menuButtonElement = container.querySelector(
    '.iui-button.custom-menu-button-class',
  ) as HTMLElement;
  expect(menuButtonElement).toBeTruthy();
  expect(menuButtonElement.style.fontSize).toBe('14px');
});
