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
    <itwinui_react_1.InputGroup label='What are your hobbies?'>
      <itwinui_react_1.Checkbox label='Sports' defaultChecked />
      <itwinui_react_1.Checkbox label='Writing' />
      <itwinui_react_1.Checkbox label='Cooking' />
      <itwinui_react_1.Checkbox label='Arts and crafts' />
    </itwinui_react_1.InputGroup>
  );
};
