'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var options = React.useMemo(function () {
    return [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapefruit', value: 'grapefruit' },
      { label: 'Lychee', value: 'lychee' },
      { label: 'Kiwi', value: 'kiwi' },
      { label: 'Orange', value: 'orange' },
    ];
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      inputProps={{ placeholder: 'Pick a fruit, any fruit' }}
    />
  );
};
