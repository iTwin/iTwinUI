/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DropdownMenu, type DropdownMenuProps } from './DropdownMenu.js';
import { Button } from '../Buttons/Button.js';
import { MenuItem } from '../Menu/MenuItem.js';

function assertBaseElement(menu: HTMLElement, role = 'menu') {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual(role);
  const menuItems = menu.querySelectorAll('.iui-list-item');
  expect(menuItems.length).toBe(3);
  menuItems.forEach((item, index) => {
    expect(item.textContent).toContain(`Test${index}`);
  });
}

function renderComponent(props?: Partial<DropdownMenuProps>) {
  return render(
    <DropdownMenu
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
      <Button>Click here</Button>
    </DropdownMenu>,
  );
}

it('should show menu only after click', () => {
  renderComponent();

  let menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeFalsy();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
});

it('should close menu after menu item click', () => {
  renderComponent();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeVisible();
  assertBaseElement(menu);

  const menuItem = menu.querySelector('.iui-list-item') as HTMLElement;
  expect(menuItem).toBeTruthy();
  fireEvent.click(menuItem);

  expect(menu).not.toBeVisible();
});

it('should render menu with custom role', () => {
  renderComponent({ role: 'listbox' });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu, 'listbox');
});

it('should render menu with custom className', () => {
  renderComponent({ className: 'test-className' });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
  expect(menu.classList).toContain('test-className');
});

it('should render menu with custom style', () => {
  renderComponent({ style: { color: 'red' } });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
  expect(menu.style.color).toEqual('red');
});

it('should render menu from list', () => {
  renderComponent({
    menuItems: [
      <MenuItem key={0}>Test0</MenuItem>,
      <MenuItem key={1}>Test1</MenuItem>,
      <MenuItem key={2}>Test2</MenuItem>,
    ],
  });

  let menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeFalsy();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
});

it('should render menu from element', () => {
  renderComponent({
    menuItems: (
      <>
        <MenuItem key={0}>Test0</MenuItem>,<MenuItem key={1}>Test1</MenuItem>,
        <MenuItem key={2}>Test2</MenuItem>,
      </>
    ),
  });

  let menu = document.querySelector('.iui-menu') as HTMLElement;
  expect(menu).toBeFalsy();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  menu = document.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
});
