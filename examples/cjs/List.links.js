'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <itwinui_react_1.List>
      <itwinui_react_1.ListItem actionable>
        <itwinui_react_1.LinkAction href='https://itwinui.bentley.com/docs/button'>
          Buttons
        </itwinui_react_1.LinkAction>
      </itwinui_react_1.ListItem>
      <itwinui_react_1.ListItem actionable>
        <itwinui_react_1.LinkAction href='https://itwinui.bentley.com/docs/input'>
          Inputs
        </itwinui_react_1.LinkAction>
      </itwinui_react_1.ListItem>
      <itwinui_react_1.ListItem actionable>
        <itwinui_react_1.LinkAction href='https://itwinui.bentley.com/docs/dialog'>
          Dialog
        </itwinui_react_1.LinkAction>
      </itwinui_react_1.ListItem>
    </itwinui_react_1.List>
  );
};
