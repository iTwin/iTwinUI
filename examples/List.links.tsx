/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <List>
      <ListItem actionable>
        <ListItem.Action href='https://itwinui.bentley.com/docs/button'>
          Buttons
        </ListItem.Action>
      </ListItem>
      <ListItem actionable>
        <ListItem.Action href='https://itwinui.bentley.com/docs/input'>
          Inputs
        </ListItem.Action>
      </ListItem>
      <ListItem actionable>
        <ListItem.Action href='https://itwinui.bentley.com/docs/dialog'>
          Dialog
        </ListItem.Action>
      </ListItem>
    </List>
  );
};
