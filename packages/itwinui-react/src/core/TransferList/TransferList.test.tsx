/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { TransferList } from './TransferList';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';
import { Button } from '../Buttons';

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
