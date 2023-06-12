/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem, LinkAction } from '@itwin/itwinui-react';

export default () => {
  return (
    <List>
      <ListItem actionable>
        <LinkAction href='https://itwinui.bentley.com/docs/button'>
          Buttons
        </LinkAction>
      </ListItem>
      <ListItem actionable>
        <LinkAction href='https://itwinui.bentley.com/docs/input'>
          Inputs
        </LinkAction>
      </ListItem>
      <ListItem actionable>
        <LinkAction href='https://itwinui.bentley.com/docs/dialog'>
          Dialog
        </LinkAction>
      </ListItem>
    </List>
  );
};
