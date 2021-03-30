/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MenuItem from './MenuItem';
import Menu, { MenuProps } from './Menu';

function assertBaseElement(
  menu: HTMLUListElement,
  { role = 'menu', focusedIndex = 0 } = {},
) {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual(role);
  const menuItems = menu.querySelectorAll('li');
  expect(menuItems.length).toBe(3);
  menuItems.forEach((item, index) => {
    expect(item.textContent).toContain(`Test${index}`);
    expect(document.activeElement === item).toBe(focusedIndex === index);
  });
}

function renderComponent(props?: Partial<MenuProps>, selectedIndex?: number) {
  return render(
    <Menu {...props}>
      {[...new Array(3)].map((_, index) => (
        <MenuItem key={index} isSelected={selectedIndex === index}>
          Test{index}
        </MenuItem>
      ))}
    </Menu>,
  );
}

it('should render menu items', () => {
  const { container } = renderComponent();

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
});

it('should render menu with custom role', () => {
  const { container } = renderComponent({ role: 'listbox' });

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu, { role: 'listbox' });
});

it('should focus selected item', () => {
  const { container } = renderComponent(undefined, 1);

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu, { focusedIndex: 1 });
});

it('should handle keyboard navigation', () => {
  const { container } = renderComponent();

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  assertBaseElement(menu, { focusedIndex: 1 });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  assertBaseElement(menu, { focusedIndex: 2 });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  assertBaseElement(menu, { focusedIndex: 2 });

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  assertBaseElement(menu, { focusedIndex: 1 });
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  assertBaseElement(menu, { focusedIndex: 0 });
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  assertBaseElement(menu, { focusedIndex: 0 });
});

it('should add custom className', () => {
  const { container } = renderComponent({ className: 'test-className' });

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
  expect(menu.classList).toContain('test-className');
});

it('should add custom style', () => {
  const { container } = renderComponent({ style: { color: 'red' } });

  const menu = container.querySelector('.iui-menu') as HTMLUListElement;
  assertBaseElement(menu);
  expect(menu.style.color).toEqual('red');
});
