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
    <itwinui_react_1.Flex style={{ width: '60%' }}>
      <itwinui_react_1.Button
        styleType='high-visibility'
        startIcon={<itwinui_icons_react_1.SvgAdd />}
      >
        New
      </itwinui_react_1.Button>
      <itwinui_react_1.ButtonGroup>
        <itwinui_react_1.IconButton>
          <itwinui_icons_react_1.SvgEdit />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton disabled>
          <itwinui_icons_react_1.SvgDelete />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton>
          <itwinui_icons_react_1.SvgUndo />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.ButtonGroup>
      <itwinui_react_1.Flex.Spacer />
      <itwinui_react_1.ButtonGroup>
        <itwinui_react_1.IconButton isActive>
          <itwinui_icons_react_1.SvgFilter />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton>
          <itwinui_icons_react_1.SvgSearch />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.ButtonGroup>
    </itwinui_react_1.Flex>
  );
};
