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
  return (
    <itwinui_react_1.Flex flexDirection='column' alignItems='flex-start'>
      <itwinui_react_1.ToggleSwitch
        label='Option 1'
        icon={<itwinui_icons_react_1.SvgCheckmark />}
        defaultChecked={true}
      />
      <itwinui_react_1.ToggleSwitch
        label='Option 2'
        icon={<itwinui_icons_react_1.SvgCheckmark />}
        defaultChecked={true}
        disabled
      />
    </itwinui_react_1.Flex>
  );
};
