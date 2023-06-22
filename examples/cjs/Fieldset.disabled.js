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
      legend='Disabled Fieldset'
      disabled
      style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
    >
      <itwinui_react_1.LabeledInput
        label='Full Name'
        placeholder='Enter full name'
      />
      <itwinui_react_1.LabeledInput
        label='Address'
        placeholder='Enter address'
      />
    </itwinui_react_1.Fieldset>
  );
};
