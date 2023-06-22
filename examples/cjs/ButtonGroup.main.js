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
    <itwinui_react_1.ButtonGroup>
      <itwinui_react_1.IconButton onClick={function () {}}>
        <itwinui_icons_react_1.SvgAdd />
      </itwinui_react_1.IconButton>
      <itwinui_react_1.IconButton onClick={function () {}} isActive>
        <itwinui_icons_react_1.SvgEdit />
      </itwinui_react_1.IconButton>
      <itwinui_react_1.IconButton disabled onClick={function () {}}>
        <itwinui_icons_react_1.SvgDelete />
      </itwinui_react_1.IconButton>
      <itwinui_react_1.IconButton onClick={function () {}}>
        <itwinui_icons_react_1.SvgUndo />
      </itwinui_react_1.IconButton>
    </itwinui_react_1.ButtonGroup>
  );
};
