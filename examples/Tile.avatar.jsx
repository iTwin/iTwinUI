/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Tile,
  MenuItem,
  Badge,
  Avatar,
  getUserColor,
} from '@itwin/itwinui-react';

export default () => {
  return (
    <Tile.Wrapper>
      <Tile.Name name='Some User' />
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture>
          <Avatar
            size='x-large'
            status='online'
            abbreviation='TR'
            backgroundColor={getUserColor('Terry Rivers')}
            image={<img src='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167' alt='' />}
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
    </Tile.Wrapper>
  );
};
