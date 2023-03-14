/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag, IconButton } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile
      name='Tile name'
      description='Tile description that takes upto 3 lines'
      metadata={
        <TagContainer>
          <Tag variant='basic'>Tag 1</Tag>
          <Tag variant='basic'>Tag 2</Tag>
        </TagContainer>
      }
      thumbnail='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
      leftIcon={
        <IconButton styleType='borderless'>
          <SvgInfo />
        </IconButton>
      }
      rightIcon={
        <IconButton styleType='borderless'>
          <SvgStar />
        </IconButton>
      }
      isSelected={false}
      isNew={false}
    />
  );
};
