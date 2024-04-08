/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MenuItem } from './MenuItem.js';
import { SvgSmileyHappy } from '../utils/index.js';
import { userEvent } from '@testing-library/user-event';

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
    <MenuItem
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
  );

  const menuItem = screen.getByTestId('parent');

  // focus to open sub menu
  act(() => menuItem.focus());
  const subMenuItem = screen.getByTestId('sub');
  expect(subMenuItem).toHaveTextContent('Test sub');

  // go right to move focus
  await userEvent.keyboard('{ArrowRight}');
  expect(subMenuItem).toHaveFocus();

  // going left should close that submenu and move the focus back to the parent menu item.
  await userEvent.keyboard('{ArrowLeft}');
  expect(subMenuItem).not.toBeVisible();
  expect(menuItem).toHaveFocus();

  // escape to close
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByTestId('sub')).toBeFalsy();

  // going right to should re-open the sub menu and move the focus to the first item in the submenu.
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.queryByTestId('sub')).toBeTruthy();
  expect(screen.getByTestId('sub')).toHaveFocus();

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
    <MenuItem
      key={0}
      data-testid='parent'
      subMenuItems={[
        <MenuItem
          key={1}
          data-testid='sub-1'
          subMenuItems={[
            <MenuItem key={2} data-testid='sub-2'>
              Test sub sub
            </MenuItem>,
          ]}
        >
          Test sub
        </MenuItem>,
        <MenuItem
          key={3}
          data-testid='sub-3'
          subMenuItems={[
            <MenuItem key={4} data-testid='sub-4'>
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

  // focus to open sub menu
  act(() => menuItem.focus());

  // go right to move focus to the first submenu item. The first submenu's submenu should open.
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByTestId('sub-1')).toHaveFocus();
  expect(screen.getByTestId('sub-2')).toBeVisible();

  // hover over the second submenu item. The first submenu's submenu should close.
  fireEvent.mouseEnter(screen.getByTestId('sub-3'));
  expect(screen.queryByTestId('sub-4')).toBeFalsy();
});
