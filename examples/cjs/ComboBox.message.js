'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(''),
    value = _a[0],
    setValue = _a[1];
  var options = React.useMemo(function () {
    return [
      { label: 'Helvetica', value: 'helvetica' },
      { label: 'Futura', value: 'futura' },
      { label: 'Verdana', value: 'verdana' },
      { label: 'Times New Roman', value: 'roman' },
      { label: 'Arial', value: 'arial' },
      { label: 'Rockwell', value: 'rockwell' },
      { label: 'Bodoni', value: 'bodoni' },
      { label: 'Garamond', value: 'garamond' },
    ];
  }, []);
  return (
    <itwinui_react_1.ComboBox
      options={options}
      message='This font will be used in your signature.'
      inputProps={{ placeholder: 'Choose a font' }}
      onChange={setValue}
      value={value}
    />
  );
};
