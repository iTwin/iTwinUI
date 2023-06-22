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
    <itwinui_react_1.Flex flexDirection='column' gap='m'>
      <itwinui_react_1.ButtonGroup>
        <itwinui_react_1.Button>Button 1</itwinui_react_1.Button>
        <itwinui_react_1.Input />
        <itwinui_react_1.IconButton>
          <itwinui_icons_react_1.SvgSearch />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.ButtonGroup>
      <itwinui_react_1.ButtonGroup>
        <itwinui_react_1.Input value='https://itwinui.bentley.com/docs/buttongroup' />
        <itwinui_react_1.Button styleType='high-visibility'>
          Copy
        </itwinui_react_1.Button>
      </itwinui_react_1.ButtonGroup>
    </itwinui_react_1.Flex>
  );
};
