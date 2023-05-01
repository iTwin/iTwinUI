/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TransferList } from './TransferList';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';
import { Button } from '../Buttons';
import userEvent from '@testing-library/user-event';

it('should render in its most basic state', () => {
  const { container } = render(
    <TransferList>
      <TransferList.Area>
        <List role={'listbox'}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>,
  );
  const listBoxWrapper = container.querySelector('.iui-transfer-list-wrapper');
  expect(listBoxWrapper).toBeTruthy();
  const listBoxArea = container.querySelector('.iui-transfer-list-area');
  expect(listBoxArea).toBeTruthy();
});

it('should handle keyboard navigation', () => {
  const { container } = render(
    <TransferList.List>
      <TransferList.ListItem actionable>item 1</TransferList.ListItem>
      <TransferList.ListItem actionable>item 2</TransferList.ListItem>
      <TransferList.ListItem actionable>item 3</TransferList.ListItem>
      <TransferList.ListItem actionable>item 4</TransferList.ListItem>
    </TransferList.List>,
  );
  const list = container.querySelector('.iui-list') as HTMLUListElement;
  const items = container.querySelectorAll('.iui-list-item');

  // item 1
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(0 === index);
  });

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

  // item
  fireEvent.keyDown(list, { key: 'ArrowUp' });
  items.forEach((item, index) => {
    expect(document.activeElement === item).toBe(0 === index);
  });
});

it('should handle key presses', async () => {
  const mockedOnClick = jest.fn();
  render(
    <TransferList.ListItem actionable onClick={mockedOnClick}>
      Item
    </TransferList.ListItem>,
  );

  const listItem = screen.getByRole('listitem');
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
      <TransferList.Area>
        <TransferList.Label>Label</TransferList.Label>
        <List role={'listbox'}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </TransferList.Area>
      <TransferList.Toolbar>
        <Button />
      </TransferList.Toolbar>
      <TransferList.Area>
        <List role={'listbox'}>
          <ListItem>Item 4</ListItem>
          <ListItem>Item 5</ListItem>
          <ListItem>Item 6</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>,
  );
  const listBoxLabel = container.querySelector('.iui-transfer-list-label');
  expect(listBoxLabel).toBeTruthy();

  const listBoxToolbar = container.querySelector('.iui-transfer-list-toolbar');
  expect(listBoxToolbar).toBeTruthy();
});
