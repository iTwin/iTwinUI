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
      thumbnail='/assets/stadium.png'
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
