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
    <itwinui_react_1.Flex flexDirection='column'>
      <itwinui_react_1.Input placeholder='Small' size='small' />
      <itwinui_react_1.Input placeholder='Medium' />
      <itwinui_react_1.Input placeholder='Large' size='large' />
    </itwinui_react_1.Flex>
  );
};
