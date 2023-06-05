/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, MenuItem, Badge, Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <Tile>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Some User</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
          <Avatar
            size='x-large'
            status='online'
            abbreviation='TR'
            backgroundColor={getUserColor('Terry Rivers')}
            image={
              <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
            }
            title='Terry Rivers'
          />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>User Description</Tile.Description>
        <Tile.MoreOptions>
          <MenuItem key={1}>Item 1</MenuItem>
          <MenuItem key={2}>Item 2</MenuItem>
        </Tile.MoreOptions>
      </Tile.ContentArea>
    </Tile>
  );
};
