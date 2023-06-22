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
    <itwinui_react_1.Flex flexDirection='column' alignItems='flex-start'>
      <itwinui_react_1.Checkbox label='Enable 2D mode' defaultChecked />
      <itwinui_react_1.Checkbox label='Enable 3D mode' isLoading />
      <itwinui_react_1.Checkbox label='Enable 4D mode' disabled />
    </itwinui_react_1.Flex>
  );
};
