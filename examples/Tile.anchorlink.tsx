/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag, Badge } from '@itwin/itwinui-react';
import { SvgTag } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile>
      <Tile.Name>
        <Tile.NameLabel>
          <Tile.Action href='https://inclusive-components.design/cards/'>
            Stadium
          </Tile.Action>
        </Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          If you click on this stadium, it is going to open another page.
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
