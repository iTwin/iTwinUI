/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Listbox, List, ListItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <Listbox style={{ width: 500 }}>
      <Listbox.Area>
        <Listbox.Label>Options</Listbox.Label>
        <List role={'listbox'}>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
          <ListItem>Option 4</ListItem>
          <ListItem>Option 5</ListItem>
          <ListItem>Option 6</ListItem>
        </List>
      </Listbox.Area>
    </Listbox>
  );
};
