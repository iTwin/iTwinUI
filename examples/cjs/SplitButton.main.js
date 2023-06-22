'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var onMenuItemClick = function (index, close) {
    return function () {
      close();
    };
  };
  var buttonMenuItems = function (close) {
    return [
      <itwinui_react_1.MenuItem key={1} onClick={onMenuItemClick(1, close)}>
        Item #1
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem key={2} onClick={onMenuItemClick(2, close)}>
        Item #2
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem key={3} onClick={onMenuItemClick(3, close)}>
        Item #3
      </itwinui_react_1.MenuItem>,
    ];
  };
  return (
    <itwinui_react_1.SplitButton
      onClick={function () {}}
      menuItems={buttonMenuItems}
      styleType='default'
    >
      Default
    </itwinui_react_1.SplitButton>
  );
};
