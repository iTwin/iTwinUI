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
  const items = container.querySelectorAll('.iui-list-item');
  expect(items).toHaveLength(3);
  items.forEach((item, index) => {
    expect(item).toHaveTextContent(`item ${index + 1}`);
  });
});

describe('ListItem', () => {
  it('should respect actionable prop', () => {
    render(<ListItem actionable>Item</ListItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-iui-actionable',
      'true',
    );
  });

  it('should respect active prop', () => {
    render(<ListItem active>Item</ListItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-iui-active',
      'true',
    );
  });

  it('should respect focused prop', () => {
    render(<ListItem focused>Item</ListItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-iui-focused',
      'true',
    );
  });

  it('should respect disabled prop', () => {
    render(<ListItem disabled>Item</ListItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-iui-disabled',
      'true',
    );
  });

  it('should respect size prop', () => {
    render(<ListItem size='large'>Item</ListItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute(
      'data-iui-size',
      'large',
    );
  });

  it('should work with subcomponents', () => {
    render(
      <ListItem>
        <ListItem.Icon>icon</ListItem.Icon>
        <ListItem.Content>
          item
          <ListItem.Description>description</ListItem.Description>
        </ListItem.Content>
      </ListItem>,
    );

    expect(screen.getByText('icon')).toHaveClass('iui-list-item-icon');
    expect(screen.getByText('item')).toHaveClass('iui-list-item-content');
    expect(screen.getByText('description')).toHaveClass(
      'iui-list-item-description',
    );
  });

  it('should respect other props', () => {
    const { container } = render(
      <ListItem as='div' role='option'>
        Item
      </ListItem>,
    );
    expect(container.querySelector('div')).toHaveAttribute('role', 'option');
  });
});
