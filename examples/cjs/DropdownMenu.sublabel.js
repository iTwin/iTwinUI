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
        startIcon={<itwinui_icons_react_1.SvgPlaceholder />}
        sublabel='Sublabel #1'
      >
        Item #1
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={2}
        onClick={function () {
          return close();
        }}
        startIcon={<itwinui_icons_react_1.SvgPlaceholder />}
        sublabel='Sublabel #2'
      >
        Item #2
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem
        key={3}
        onClick={function () {
          return close();
        }}
        startIcon={<itwinui_icons_react_1.SvgPlaceholder />}
        sublabel='Sublabel #3'
      >
        Item #3
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
