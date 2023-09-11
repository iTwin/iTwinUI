/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag, Badge } from '@itwin/itwinui-react';
import { SvgTag } from '@itwin/itwinui-icons-react';

export default () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Tile.Wrapper isSelected={selected}>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>
          <Tile.Action onClick={() => setSelected((prev) => !prev)}>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>This Tile is going to be selected.</Tile.Description>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};
