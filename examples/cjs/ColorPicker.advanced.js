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
      itwinui_react_1.ColorValue.create({ r: 90, g: 105, b: 115, a: 0.4 }),
    ),
    selectedColor = _a[0],
    setSelectedColor = _a[1];
  var onColorChanged = function (color) {
    setSelectedColor(color);
  };
  return (
    <itwinui_react_1.ColorPicker
      selectedColor={selectedColor}
      onChangeComplete={onColorChanged}
      showAlpha={true}
    >
      <itwinui_react_1.ColorBuilder />
      <itwinui_react_1.ColorInputPanel defaultColorFormat='rgb' />
      <itwinui_react_1.ColorPalette
        label='Saved Colors'
        colors={[
          { r: 90, g: 105, b: 115, a: 1 },
          { r: 90, g: 105, b: 115, a: 0.81 },
          { r: 90, g: 105, b: 115, a: 0.4 },
        ]}
      />
    </itwinui_react_1.ColorPicker>
  );
};
