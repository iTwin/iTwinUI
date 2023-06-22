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
  var _a = React.useState(true),
    option1 = _a[0],
    setOption1 = _a[1];
  var _b = React.useState(false),
    option2 = _b[0],
    setOption2 = _b[1];
  return (
    <itwinui_react_1.Surface>
      <itwinui_react_1.InputGroup
        label='Toggle group'
        style={{ padding: '12px' }}
      >
        <itwinui_react_1.ToggleSwitch
          onChange={function (event) {
            return setOption1(event.target.checked);
          }}
          checked={option1}
          label='Toggle feature No.1'
          icon={<itwinui_icons_react_1.SvgCheckmark />}
        />
        <itwinui_react_1.ToggleSwitch
          checked={true}
          disabled
          label='This you cannot change'
        />
        <itwinui_react_1.ToggleSwitch
          onChange={function (event) {
            return setOption2(event.target.checked);
          }}
          label='Toggle feature No.2'
          checked={option2}
        />
      </itwinui_react_1.InputGroup>
    </itwinui_react_1.Surface>
  );
};
