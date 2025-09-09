/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo, SvgTag } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile.Wrapper>
      <Tile.Name name='Tile name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167' />
        <Tile.TypeIndicator>
          <Tile.IconButton label='Favorite'>
            <SvgStar />
          </Tile.IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <Tile.IconButton label='More info'>
            <SvgInfo />
          </Tile.IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          Tile description that takes upto 3 lines
        </Tile.Description>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>Tag 1</Tag>
            <Tag variant='basic'>Tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
    </Tile.Wrapper>
  );
};
