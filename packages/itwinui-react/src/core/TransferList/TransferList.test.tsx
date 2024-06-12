/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '../Buttons/Button.js';
import { TransferList } from './TransferList.js';

it('should render in its most basic state', () => {
  const { container } = render(
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          <TransferList.Item>Item 0</TransferList.Item>
          <TransferList.Item active>Item 1</TransferList.Item>
          <TransferList.Item>Item 2</TransferList.Item>
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>,
  );
  const transferListWrapper = container.querySelector(
    '.iui-transfer-list-wrapper',
  );
  expect(transferListWrapper).toBeTruthy();
  const listBoxWrapper = container.querySelector(
    '.iui-transfer-list-listbox-wrapper',
  );
  expect(listBoxWrapper).toBeTruthy();
  const listbox = container.querySelector('.iui-transfer-list-listbox');
  expect(listbox).toBeTruthy();
  const items = container.querySelectorAll('.iui-list-item');
  expect(items).toHaveLength(3);

  items.forEach((item, index) => {
    expect(item).toHaveTextContent(`Item ${index}`);
    if (index === 1) {
      expect(item).toHaveAttribute('aria-selected', 'true');
    }
  });
});

it('should handle keyboard navigation', () => {
  const { container } = render(
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          <TransferList.Item actionable>item 1</TransferList.Item>
          <TransferList.Item actionable>item 2</TransferList.Item>
          <TransferList.Item actionable>item 3</TransferList.Item>
          <TransferList.Item actionable>item 4</TransferList.Item>
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>,
  );
  const list = container.querySelector('.iui-list') as HTMLUListElement;
  const items = container.querySelectorAll('.iui-list-item');

  // 1 -> 2
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(1 === index);
  });

  // 2 -> 3
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(2 === index);
  });

  // 3 -> 4
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(3 === index);
  });

  // item 4
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(3 === index);
  });

  // 4 -> 3
  fireEvent.keyDown(list, { key: 'ArrowUp' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(2 === index);
  });

  // 3 -> 2
  fireEvent.keyDown(list, { key: 'ArrowUp' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(1 === index);
  });

  // 2 -> 1
  fireEvent.keyDown(list, { key: 'ArrowUp' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(0 === index);
  });

  // item 1
  fireEvent.keyDown(list, { key: 'ArrowUp' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(0 === index);
  });
});

it('should handle key presses', async () => {
  const mockedOnClick = vi.fn();
  render(
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          <TransferList.Item actionable onActiveChange={mockedOnClick}>
            Item
          </TransferList.Item>
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>,
  );

  const listItem = screen.getByRole('option');
  listItem.focus();

  // click
  await userEvent.keyboard('{Enter}');
  expect(mockedOnClick).toHaveBeenCalledTimes(1);
  await userEvent.keyboard(' ');
  expect(mockedOnClick).toHaveBeenCalledTimes(2);
  await userEvent.keyboard('{Spacebar}');
  expect(mockedOnClick).toHaveBeenCalledTimes(3);
});

it('should render custom transfer list with label and toolbar', () => {
  const { container } = render(
    <TransferList>
      <TransferList.ListboxWrapper>
        <TransferList.ListboxLabel>Label</TransferList.ListboxLabel>
        <TransferList.Listbox>
          <TransferList.Item>Item 1</TransferList.Item>
          <TransferList.Item>Item 2</TransferList.Item>
          <TransferList.Item>Item 3</TransferList.Item>
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
      <TransferList.Toolbar>
        <Button />
      </TransferList.Toolbar>
      <TransferList.ListboxWrapper>
        <TransferList.Listbox>
          <TransferList.Item>Item 4</TransferList.Item>
          <TransferList.Item>Item 5</TransferList.Item>
          <TransferList.Item>Item 6</TransferList.Item>
        </TransferList.Listbox>
      </TransferList.ListboxWrapper>
    </TransferList>,
  );
  const listBoxLabel = container.querySelector('.iui-input-label');
  expect(listBoxLabel).toBeTruthy();
  expect(listBoxLabel).toHaveTextContent('Label');

  const toolbar = container.querySelector('.iui-transfer-list-toolbar');
  expect(toolbar).toBeTruthy();
});
