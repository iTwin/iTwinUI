/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, Button, Badge } from '@itwin/itwinui-react';

export default () => {
  return (
    <Tile.Wrapper>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Stadium</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='/assets/stadium.png' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>This tile has two quick actions.</Tile.Description>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </Tile.Buttons>
    </Tile.Wrapper>
  );
};
