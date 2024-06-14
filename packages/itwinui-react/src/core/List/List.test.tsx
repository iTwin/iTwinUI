/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';

import { List } from './List.js';
import { ListItem } from './ListItem.js';

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
