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
    <itwinui_react_1.InputGroup label='Home lights'>
      <itwinui_react_1.ToggleSwitch label='Dining room' defaultChecked={true} />
      <itwinui_react_1.ToggleSwitch label='Garage' defaultChecked={false} />
      <itwinui_react_1.ToggleSwitch label='Kitchen' defaultChecked={true} />
      <itwinui_react_1.ToggleSwitch
        label='Living room'
        defaultChecked={false}
      />
    </itwinui_react_1.InputGroup>
  );
};
