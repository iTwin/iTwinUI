/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DropdownMenu, { DropdownMenuProps } from './DropdownMenu';
import { Button } from '../Buttons';
import { MenuItem } from '../Menu';

function assertBaseElement(menu: HTMLUListElement, role = 'menu') {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual(role);
  const menuItems = menu.querySelectorAll('li');
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

  let menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeFalsy();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
});

it('should close menu after menu item click', () => {
  renderComponent();

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  fireEvent.click(menuItem);

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('hidden');
});

it('should render menu with custom role', () => {
  renderComponent({ role: 'listbox' });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu, 'listbox');
});

it('should render menu with custom className', () => {
  renderComponent({ className: 'test-className' });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
  expect(menu.classList).toContain('test-className');
});

it('should render menu with custom style', () => {
  renderComponent({ style: { color: 'red' } });

  const button = screen.getByText('Click here');
  fireEvent.click(button);

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
  expect(menu.style.color).toEqual('red');
});

it('should be mounted lazily', () => {
  let content: unknown;
  renderComponent({
    onCreate: (i) => {
      content = i.props.content;
    },
    onShow: (i) => {
      content = i.props.content;
    },
  });
  expect((content as Element).children.length).toBe(0);

  screen.getByText('Click here').click();
  expect((content as Element).children.length).toBe(1);
});

it('should focus target after hide', () => {
  const { container } = renderComponent();

  const button = container.querySelector('.iui-button') as HTMLButtonElement;

  button.click();
  expect(document.activeElement).not.toEqual(button);

  button.click();
  expect(document.activeElement).toEqual(button);
});
