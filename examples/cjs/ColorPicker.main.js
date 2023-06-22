'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(itwinui_react_1.ColorValue.create('#0073ba')),
    activeColor = _a[0],
    setActiveColor = _a[1];
  var onColorChanged = function (color) {
    setActiveColor(color);
  };
  return (
    <itwinui_react_1.ColorPicker
      selectedColor={activeColor}
      onChangeComplete={onColorChanged}
    >
      <itwinui_react_1.ColorBuilder />
      <itwinui_react_1.ColorInputPanel defaultColorFormat={'hsl'} />
    </itwinui_react_1.ColorPicker>
  );
};
