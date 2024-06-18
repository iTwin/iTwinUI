/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MenuItem } from './MenuItem.js';
import { Menu } from './Menu.js';
import { MenuDivider } from './MenuDivider.js';
import { MenuExtraContent } from './MenuExtraContent.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { Button } from '../Buttons/Button.js';

const testLabels = ['Test0', 'Test1', 'Test2'];

async function assertBaseElement(
  menu: HTMLElement,
  {
    role = 'menu',
    focusedIndex,
    labels = testLabels,
  }: {
    role?: string;
    focusedIndex?: number;
    labels?: string[];
  } = {},
) {
  expect(menu).toBeTruthy();
  expect(menu.getAttribute('role')).toEqual(role);
  const menuItems = menu.querySelectorAll(`[role=${role}] > *`);
  expect(menuItems.length).toBe(labels.length);

  await Promise.all(
    Array.from(menuItems).map(async (item, index) => {
      expect(item.textContent).toContain(labels[index]);

      if (focusedIndex != null) {
        await waitFor(() =>
          expect(document.activeElement === item).toBe(focusedIndex === index),
        );
      }
    }),
  );
}

function renderComponent(
  initialProps?: Partial<React.ComponentProps<typeof Menu>>,
  selectedIndex?: number,
) {
  const props = {
    children: testLabels.map((label, index) => (
      <MenuItem key={index} isSelected={selectedIndex === index}>
        {label}
      </MenuItem>
    )),
    ...initialProps,
  };

  return render(
    <Menu
      trigger={<Button data-testid='trigger'>Trigger</Button>}
      {...props}
    />,
  );
}

/**
 * Toggles the menu by clicking the trigger button.
 */
const clickTrigger = async () => {
  const trigger = screen.getByTestId('trigger');
  await act(async () => trigger.click());
};

it('should render menu items', async () => {
  const { container } = renderComponent();
  await clickTrigger();

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
});

it('should render menu with custom role', async () => {
  const { container } = renderComponent({ role: 'listbox' });
  await clickTrigger();

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu, { role: 'listbox' });
});

it('should handle keyboard navigation', async () => {
  const { container } = renderComponent({
    children: [
      <MenuExtraContent key={0}>Test content</MenuExtraContent>,
      <MenuItem key={1}>Test0</MenuItem>,
      <MenuItem key={2}>
        <Checkbox />
        Test1
      </MenuItem>,
      <MenuDivider key={3} />,
      <MenuItem key={4} disabled>
        Test2
      </MenuItem>,
      <MenuItem key={5}>Test3</MenuItem>,
      <MenuExtraContent key={6}>
        <Button data-testid='inner-button'>Test4</Button>
      </MenuExtraContent>,
    ],
  });
  const trigger = screen.getByTestId('trigger');
  trigger.focus();
  expect(trigger).toHaveFocus();
  await clickTrigger();

  const labels = [
    'Test content',
    'Test0',
    'Test1',
    '',
    'Test2',
    'Test3',
    'Test4',
  ];

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  expect(trigger).toHaveFocus();
  await assertBaseElement(menu, { labels });

  fireEvent.keyDown(menu, { key: 'ArrowDown' });

  await assertBaseElement(menu, { labels, focusedIndex: 1 });

  // Test0 -> Test1
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  await assertBaseElement(menu, { labels, focusedIndex: 2 });
  // Test1 -> Test3
  // Should skip checkbox, separator and disabled item
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  await assertBaseElement(menu, { labels, focusedIndex: 5 });
  // Test3 -> Test4
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  // Extra content li element is not focused, therefore setting focusedIndex to -1
  await assertBaseElement(menu, { labels, focusedIndex: -1 });
  expect(screen.getByTestId('inner-button')).toHaveFocus();
  // Should stay on Test4
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  await assertBaseElement(menu, { labels, focusedIndex: -1 });
  expect(screen.getByTestId('inner-button')).toHaveFocus();

  // Test4 -> Test3
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  await assertBaseElement(menu, { labels, focusedIndex: 5 });
  // Test3 -> Test1
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  await assertBaseElement(menu, { labels, focusedIndex: 2 });
  // Test1 -> Test0
  // Should skip separator and disabled item
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  await assertBaseElement(menu, { labels, focusedIndex: 1 });
  // Should stay on Test0
  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  await assertBaseElement(menu, { labels, focusedIndex: 1 });
});

it('should add custom className', async () => {
  const { container } = renderComponent({ className: 'test-className' });
  await clickTrigger();

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
  expect(menu.classList).toContain('test-className');
});

it('should add custom style', async () => {
  const { container } = renderComponent({ style: { color: 'red' } });
  await clickTrigger();

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
  expect(menu.style.color).toEqual('red');
});

it('should keep focus on the trigger when opening the menu using the mouse', async () => {
  const { container } = renderComponent();

  const trigger = screen.getByTestId('trigger');
  trigger.focus();
  expect(trigger).toHaveFocus();

  await clickTrigger();

  const menu = container.querySelector('.iui-menu') as HTMLElement;
  assertBaseElement(menu);
  expect(trigger).toHaveFocus();
});
