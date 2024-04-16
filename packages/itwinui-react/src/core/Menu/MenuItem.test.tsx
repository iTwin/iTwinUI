/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MenuItem } from './MenuItem.js';
import { SvgSmileyHappy } from '../../utils/index.js';
import { userEvent } from '@testing-library/user-event';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import { Button } from '../Buttons/Button.js';

function assertBaseElement(
  menuItem: HTMLElement,
  {
    role = 'menuitem',
    isSelected = false,
    hasIcon = false,
    hasBadge = false,
    disabled = false,
  } = {},
) {
  expect(menuItem).toBeTruthy();
  expect(menuItem.getAttribute('tabindex')).toEqual(disabled ? null : '-1');
  expect(menuItem.getAttribute('role')).toEqual(role);
  expect(menuItem.hasAttribute(`data-iui-active`)).toBe(isSelected);
  expect(menuItem.hasAttribute(`data-iui-disabled`)).toBe(disabled);
  expect(menuItem.textContent).toContain('Test item');
  const content = menuItem.querySelector(
    '.iui-list-item-content',
  ) as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toContain('Test item');
  expect(
    (menuItem.firstChild as HTMLElement).classList.contains(
      'iui-list-item-icon',
    ),
  ).toBe(hasIcon);
  expect(
    (menuItem.lastChild as HTMLElement).classList.contains(
      'iui-list-item-icon',
    ),
  ).toBe(hasBadge);
}

it('should render content', () => {
  const { container } = render(<MenuItem>Test item</MenuItem>);

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);
});

it('should render as selected', () => {
  const { container } = render(<MenuItem isSelected>Test item</MenuItem>);

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem, { isSelected: true });
});

it('should render as disabled', () => {
  const mockedOnClick = vi.fn();
  const { container } = render(
    <MenuItem disabled onClick={mockedOnClick}>
      Test item
    </MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem, { disabled: true });

  fireEvent.click(menuItem);
  expect(mockedOnClick).toHaveBeenCalledTimes(0);
});

it('should render with an startIcon', () => {
  const { container } = render(
    <MenuItem startIcon={<SvgSmileyHappy />}>Test item</MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem, { hasIcon: true });
});

it('should render with a endIcon', () => {
  const { container } = render(
    <MenuItem endIcon={<SvgSmileyHappy />}>Test item</MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem, { hasBadge: true });
});

it('should render with custom role', () => {
  const { container } = render(<MenuItem role='option'>Test item</MenuItem>);

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem, { role: 'option' });
});

it('should handle click', () => {
  const mockedOnClick = vi.fn();
  const { container } = render(
    <MenuItem onClick={mockedOnClick} value='test_value'>
      Test item
    </MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);

  fireEvent.click(menuItem);
  expect(mockedOnClick).toHaveBeenCalledWith('test_value');
});

it('should focus on hover', () => {
  render(<MenuItem data-testid='item'>Item</MenuItem>);

  const menuItem = screen.getByTestId('item');
  expect(menuItem).not.toHaveFocus();
  fireEvent.mouseEnter(menuItem);
  expect(menuItem).toHaveFocus();
});

it('should handle key press', () => {
  const mockedOnClick = vi.fn();
  const { container } = render(
    <MenuItem onClick={mockedOnClick} value='test_value'>
      Test item
    </MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);

  fireEvent.keyDown(menuItem, { key: 'Enter', altKey: true });
  expect(mockedOnClick).not.toHaveBeenCalled();

  fireEvent.keyDown(menuItem, { key: 'Enter' });
  expect(mockedOnClick).toHaveBeenNthCalledWith(1, 'test_value');
  fireEvent.keyDown(menuItem, { key: ' ' });
  expect(mockedOnClick).toHaveBeenNthCalledWith(2, 'test_value');
  fireEvent.keyDown(menuItem, { key: 'Spacebar' });
  expect(mockedOnClick).toHaveBeenNthCalledWith(3, 'test_value');
});

it('should add custom className', () => {
  const { container } = render(
    <MenuItem className='test-className'>Test item</MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);
  expect(menuItem.classList).toContain('test-className');
});

it('should add custom style', () => {
  const { container } = render(
    <MenuItem style={{ color: 'red' }}>Test item</MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);
  expect(menuItem.style.color).toEqual('red');
});

it('should render large size', () => {
  const { container } = render(<MenuItem size='large'>Test item</MenuItem>);

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);
  expect(menuItem).toHaveAttribute('data-iui-size', 'large');
});

it('should render sublabel', () => {
  const { container } = render(
    <MenuItem sublabel='Test sublabel'>Test item</MenuItem>,
  );

  const menuItem = container.querySelector('.iui-list-item') as HTMLElement;
  assertBaseElement(menuItem);
  expect(menuItem).toHaveAttribute('data-iui-size', 'large');

  const sublabel = menuItem.querySelector(
    '.iui-list-item-content .iui-list-item-description',
  ) as HTMLElement;
  expect(sublabel).toBeTruthy();
  expect(sublabel.textContent).toEqual('Test sublabel');
});

it('should show sub menu on hover', () => {
  vi.useFakeTimers();

  const mockedSubSubOnClick = vi.fn();
  render(
    <MenuItem
      value='test_value'
      data-testid='parent'
      subMenuItems={[
        <MenuItem
          key={1}
          data-testid='sub'
          value='test_value_sub'
          subMenuItems={[
            <MenuItem
              key={1}
              data-testid='sub-sub'
              onClick={mockedSubSubOnClick}
              value='test_value_sub_sub'
            >
              Test sub sub
            </MenuItem>,
          ]}
        >
          Test sub
        </MenuItem>,
      ]}
    >
      Test item
    </MenuItem>,
  );

  const menuItem = screen.getByTestId('parent');
  expect(menuItem).toHaveTextContent('Test item');

  // hover over menu item
  fireEvent.mouseEnter(menuItem);
  act(() => vi.advanceTimersByTime(100));
  const subMenuItem = screen.getByTestId('sub');
  expect(subMenuItem).toHaveTextContent('Test sub');

  // hover over sub menu item
  fireEvent.mouseEnter(subMenuItem);
  act(() => vi.advanceTimersByTime(100));
  const subSubMenuItem = screen.getByTestId('sub-sub');
  expect(subSubMenuItem).toHaveTextContent('Test sub sub');
  fireEvent.click(subSubMenuItem);
  expect(mockedSubSubOnClick).toHaveBeenCalled();

  // leave sub menu item
  fireEvent.mouseLeave(subMenuItem, { relatedTarget: menuItem });
  act(() => vi.advanceTimersByTime(100));
  expect(subSubMenuItem).not.toBeVisible();

  vi.useRealTimers();
});

it('should handle key press with sub menus', async () => {
  const mockedSubOnClick = vi.fn();
  render(
    <DropdownMenu
      menuItems={[
        <MenuItem
          key={0}
          value='test_value'
          data-testid='parent'
          subMenuItems={[
            <MenuItem
              key={1}
              onClick={mockedSubOnClick}
              value='test_value_sub'
              data-testid='sub'
            >
              Test sub
            </MenuItem>,
          ]}
        >
          Test item
        </MenuItem>,
      ]}
    >
      <Button data-testid='trigger'>Menu</Button>
    </DropdownMenu>,
  );

  // Open the DropdownMenu
  const trigger = screen.getByTestId('trigger');
  fireEvent.click(trigger);

  // focus + right arrow to open sub menu and move focus to it.
  const menuItem = screen.getByTestId('parent');
  act(() => menuItem.focus());
  await userEvent.keyboard('{ArrowRight}');
  const subMenuItem = screen.getByTestId('sub');
  expect(subMenuItem).toHaveTextContent('Test sub');
  expect(subMenuItem).toHaveFocus();

  // going left should close that submenu and move the focus back to the parent menu item.
  await userEvent.keyboard('{ArrowLeft}');
  expect(subMenuItem).not.toBeVisible();
  expect(menuItem).toHaveFocus();

  // go right again to move focus into sub menu
  await userEvent.keyboard('{ArrowRight}');

  // click
  await userEvent.keyboard('{Enter}');
  expect(mockedSubOnClick).toHaveBeenNthCalledWith(1, 'test_value_sub');
  await userEvent.keyboard(' ');
  expect(mockedSubOnClick).toHaveBeenNthCalledWith(2, 'test_value_sub');
  await userEvent.keyboard('{Spacebar}');
  expect(mockedSubOnClick).toHaveBeenNthCalledWith(3, 'test_value_sub');
});

it('should have only one active submenu at a time', async () => {
  render(
    <DropdownMenu
      menuItems={[
        <MenuItem
          key={0}
          data-testid='root-1'
          subMenuItems={[
            <MenuItem key={0} data-testid='sub-1'>
              Test sub
            </MenuItem>,
          ]}
        >
          Test item
        </MenuItem>,
        <MenuItem
          key={1}
          data-testid='root-2'
          subMenuItems={[
            <MenuItem key={0} data-testid='sub-2'>
              Test sub
            </MenuItem>,
          ]}
        >
          Test item
        </MenuItem>,
      ]}
    >
      <Button data-testid='trigger'>Menu</Button>
    </DropdownMenu>,
  );

  // Open the DropdownMenu
  const trigger = screen.getByTestId('trigger');
  fireEvent.click(trigger);

  const root1 = screen.getByTestId('root-1');

  // focus the first MenuItem
  act(() => root1.focus());

  // go right to open and move focus to the first submenu.
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.queryByTestId('sub-1')).toHaveFocus();
  expect(screen.queryByTestId('sub-2')).toBeFalsy();

  // hovering over the second MenuItem should close the previously opened submenu.
  fireEvent.mouseEnter(screen.getByTestId('root-2'));
  expect(screen.queryByTestId('sub-1')).toBeFalsy();
});
