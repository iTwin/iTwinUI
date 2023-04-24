/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { Listbox } from './Listbox';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';
import { Button } from '../Buttons';

it('should render in its most basic state', () => {
  const { container } = render(
    <Listbox>
      <Listbox.Area>
        <List role={'listbox'}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Listbox.Area>
    </Listbox>,
  );
  const listBoxWrapper = container.querySelector('.iui-listbox-wrapper');
  expect(listBoxWrapper).toBeTruthy();
  const listBoxArea = container.querySelector('.iui-listbox-area');
  expect(listBoxArea).toBeTruthy();
});

it('should render custom listbox with label and toolbar', () => {
  const { container } = render(
    <Listbox>
      <Listbox.Area>
        <Listbox.Label>Label</Listbox.Label>
        <List role={'listbox'}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Listbox.Area>
      <Listbox.Toolbar>
        <Button />
      </Listbox.Toolbar>
      <Listbox.Area>
        <List role={'listbox'}>
          <ListItem>Item 4</ListItem>
          <ListItem>Item 5</ListItem>
          <ListItem>Item 6</ListItem>
        </List>
      </Listbox.Area>
    </Listbox>,
  );
  const listBoxLabel = container.querySelector('.iui-listbox-label');
  expect(listBoxLabel).toBeTruthy();

  const listBoxToolbar = container.querySelector('.iui-listbox-toolbar');
  expect(listBoxToolbar).toBeTruthy();
});
