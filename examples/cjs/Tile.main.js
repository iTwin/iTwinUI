'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  return (
    <itwinui_react_1.Tile
      name='Tile name'
      description='Tile description that takes upto 3 lines'
      metadata={
        <itwinui_react_1.TagContainer>
          <itwinui_react_1.Tag variant='basic'>Tag 1</itwinui_react_1.Tag>
          <itwinui_react_1.Tag variant='basic'>Tag 2</itwinui_react_1.Tag>
        </itwinui_react_1.TagContainer>
      }
      thumbnail='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png'
      leftIcon={
        <itwinui_react_1.IconButton styleType='borderless'>
          <itwinui_icons_react_1.SvgInfo />
        </itwinui_react_1.IconButton>
      }
      rightIcon={
        <itwinui_react_1.IconButton styleType='borderless'>
          <itwinui_icons_react_1.SvgStar />
        </itwinui_react_1.IconButton>
      }
      isSelected={false}
      isNew={false}
    />
  );
};
