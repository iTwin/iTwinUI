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
    <itwinui_react_1.Fieldset
      legend='General Settings'
      style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
    >
      <itwinui_react_1.InputGroup label='Color Theme'>
        <itwinui_react_1.Radio name='choice' value='option1' label={'Light'} />
        <itwinui_react_1.Radio name='choice' value='option2' label={'Dark'} />
        <itwinui_react_1.Radio
          name='choice'
          value='option3'
          label={'Match device'}
        />
      </itwinui_react_1.InputGroup>

      <itwinui_react_1.InputGroup>
        <itwinui_react_1.ToggleSwitch label='Share crash logs' />
        <itwinui_react_1.ToggleSwitch disabled label='Advanced settings' />
      </itwinui_react_1.InputGroup>
    </itwinui_react_1.Fieldset>
  );
};
