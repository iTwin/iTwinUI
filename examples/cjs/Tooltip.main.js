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
    <itwinui_react_1.Tooltip placement='top' content='I am a tooltip'>
      <itwinui_react_1.Button>Please, hover me!</itwinui_react_1.Button>
    </itwinui_react_1.Tooltip>
  );
};
