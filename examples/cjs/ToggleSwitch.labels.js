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
      <itwinui_react_1.ToggleSwitch
        label='Label on the right'
        defaultChecked={true}
      />
      <itwinui_react_1.ToggleSwitch
        label='Label on the left'
        labelPosition='left'
        defaultChecked={true}
      />
    </itwinui_react_1.Flex>
  );
};
