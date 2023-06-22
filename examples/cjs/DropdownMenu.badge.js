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
  var dropdownMenuItems = function (close) {
    return [
      <itwinui_react_1.MenuItem
        key={1}
        onClick={function () {
          return close();
        }}
        endIcon={<itwinui_icons_react_1.SvgCrop />}
      >
        Crop
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={2}
        onClick={function () {
          return close();
        }}
        endIcon={<itwinui_icons_react_1.SvgClipboard />}
      >
        Paste
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={3}
        onClick={function () {
          return close();
        }}
        endIcon={<itwinui_icons_react_1.SvgMove />}
      >
        Move
      </itwinui_react_1.MenuItem>,
    ];
  };
  return (
    <>
      <itwinui_react_1.DropdownMenu menuItems={dropdownMenuItems}>
        <itwinui_react_1.IconButton aria-label='More options'>
          <itwinui_icons_react_1.SvgMore />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.DropdownMenu>
    </>
  );
};
