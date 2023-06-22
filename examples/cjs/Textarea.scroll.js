'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(
      'If the area is shrunk to a size smaller than the amount of text within, a scrollbar appears to keep navigation possible. This behavior is especially important for textarea without a resizing handle, to avoid making text editing tedious.',
    ),
    value = _a[0],
    setValue = _a[1];
  return (
    <itwinui_react_1.Textarea
      id='text-area'
      value={value}
      onChange={function (event) {
        return setValue(event.target.value);
      }}
      style={{ width: '70%' }}
    />
  );
};
