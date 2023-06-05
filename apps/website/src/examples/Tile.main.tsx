/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag, IconButton } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile>
      <Tile.Name name='Tile name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.TypeIndicator>
          <IconButton styleType='borderless'>
            <SvgInfo />
          </IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <IconButton styleType='borderless'>
            <SvgStar />
          </IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>Tile description that takes upto 3 lines</Tile.Description>
        <Tile.Metadata>
          <TagContainer>
            <Tag variant='basic'>Tag 1</Tag>
            <Tag variant='basic'>Tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile>
  );
};
