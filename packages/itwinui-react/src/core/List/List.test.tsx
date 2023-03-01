/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';

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
  expect(screen.getByRole('listitem')).toHaveClass('iui-list-item');
  expect(container.querySelectorAll('.iui-list-item')).toHaveLength(3);
});
