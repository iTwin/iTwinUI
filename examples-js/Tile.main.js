/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tile, TagContainer, Tag, IconButton } from '@itwin/itwinui-react';
import { SvgStar, SvgInfo } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(Tile, {
    name: 'Tile name',
    description: 'Tile description that takes upto 3 lines',
    metadata: React.createElement(
      TagContainer,
      null,
      React.createElement(Tag, { variant: 'basic' }, 'Tag 1'),
      React.createElement(Tag, { variant: 'basic' }, 'Tag 2'),
    ),
    thumbnail: 'https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png',
    leftIcon: React.createElement(
      IconButton,
      { styleType: 'borderless' },
      React.createElement(SvgInfo, null),
    ),
    rightIcon: React.createElement(
      IconButton,
      { styleType: 'borderless' },
      React.createElement(SvgStar, null),
    ),
    isSelected: false,
    isNew: false,
  });
};
