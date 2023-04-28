/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { List } from './List';
import { ListItem } from './ListItem';

it('should render in its most basic state', () => {
  const { container } = render(
    <List>
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>,
  );
  expect(screen.getByRole('list')).toHaveClass('iui-list');
  const items = container.querySelectorAll('.iui-list-item');
  expect(items).toHaveLength(3);
  items.forEach((item, index) => {
    expect(item).toHaveTextContent(`item ${index + 1}`);
  });
});

it('should be polymorphic', () => {
  const { container } = render(<List as='div'>Item</List>);
  expect(container.querySelector('div')).toHaveAttribute('role', 'list');
});

it('should handle keyboard navigation', () => {
  const { container } = render(
    <List>
      <ListItem actionable>item 1</ListItem>
      <ListItem actionable>item 2</ListItem>
      <ListItem actionable>item 3</ListItem>
      <ListItem actionable>item 4</ListItem>
    </List>,
  );
  const list = container.querySelector('.iui-list') as HTMLUListElement;
  const items = container.querySelectorAll('.iui-list-item');

  // item 1
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  expect(document.activeElement === items[0]).toBeTruthy();
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
