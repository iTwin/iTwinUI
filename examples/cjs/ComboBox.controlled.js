'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState('green'),
    value = _a[0],
    setValue = _a[1];
  var options = React.useMemo(function () {
    return [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' },
    ];
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      inputProps={{ placeholder: 'Select a color' }}
      value={value}
      onChange={setValue}
    />
  );
};
