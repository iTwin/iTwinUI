/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, Tag, IconButton } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Tile
      name='Tile Name'
      thumbnail='https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1167'
      leftIcon={
        <IconButton styleType='borderless' size='small' label='Favorite'>
          <SvgStar />
        </IconButton>
      }
      rightIcon={
        <IconButton styleType='borderless' size='small' label='More info'>
          <SvgInfo />
        </IconButton>
      }
      description='This tile is using props.'
      metadata={[
        <Tag variant='basic'>Tag 1</Tag>,
        <Tag variant='basic'>Tag 2</Tag>,
      ]}
    />
  );
};
