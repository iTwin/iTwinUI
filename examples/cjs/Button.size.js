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
    <itwinui_react_1.Flex>
      <itwinui_react_1.Button size='small'>Small</itwinui_react_1.Button>
      <itwinui_react_1.Button>Medium</itwinui_react_1.Button>
      <itwinui_react_1.Button size='large'>Large</itwinui_react_1.Button>
    </itwinui_react_1.Flex>
  );
};
