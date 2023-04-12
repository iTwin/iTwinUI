/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { List, ListItem } from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <List>
      <ListItem size='large'>
        <ListItem.Icon>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>
          <div>Milk</div>
          <ListItem.Description>Whole, almond or oat milk</ListItem.Description>
        </ListItem.Content>
      </ListItem>

      <ListItem size='large'>
        <ListItem.Icon>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>
          <div>Cheese</div>
          <ListItem.Description>Blue or feta</ListItem.Description>
        </ListItem.Content>
        <ListItem.Icon>
          <SvgCheckmarkSmall />
        </ListItem.Icon>
      </ListItem>

      <ListItem size='large'>
        <ListItem.Icon>
          <SvgPlaceholder />
        </ListItem.Icon>
        Yogurt
      </ListItem>
    </List>
  );
};
