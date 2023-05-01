/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TransferList, List, ListItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <TransferList style={{ width: 500 }}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <List role={'listbox'}>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
          <ListItem>Option 4</ListItem>
          <ListItem>Option 5</ListItem>
          <ListItem>Option 6</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>
  );
};
