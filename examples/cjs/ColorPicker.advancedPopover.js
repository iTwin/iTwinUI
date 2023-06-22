'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var utils_1 = require('@itwin/itwinui-react/esm/core/utils');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var _a;
  var _b = React.useState(false),
    isOpen = _b[0],
    setIsOpen = _b[1];
  var _c = React.useState(
      itwinui_react_1.ColorValue.create({ h: 0, s: 100, l: 50 }),
    ),
    selectedColor = _c[0],
    setSelectedColor = _c[1];
  var formats = ['hsl', 'rgb', 'hex'];
  var _d = React.useState(formats[0]),
    currentFormat = _d[0],
    setCurrentFormat = _d[1];
  var onColorChanged = function (color) {
    setSelectedColor(color);
  };
  var getDisplayString = function (color) {
    if (color === void 0) {
      color = selectedColor;
    }
    switch (currentFormat) {
      case 'hsl':
        return color.toHslString(true);
      case 'rgb':
        return color.toRgbString(true);
      case 'hex':
        return color.toHexString(true);
    }
  };
  return (
    <>
      <itwinui_react_1.ButtonGroup>
        <utils_1.Popover
          content={
            <itwinui_react_1.ColorPicker
              selectedColor={selectedColor}
              onChangeComplete={onColorChanged}
            >
              <itwinui_react_1.ColorBuilder />
              <itwinui_react_1.ColorPalette
                label='Saved Colors'
                colors={[
                  { h: 0, s: 100, l: 50 },
                  { r: 255, g: 98, b: 0 },
                  '#fec134',
                  '#5A6973',
                  { h: 95, s: 83, v: 72 },
                  { h: 250, s: 100, l: 59 },
                ]}
              />
            </itwinui_react_1.ColorPicker>
          }
          appendTo={function () {
            return document.body;
          }}
          visible={isOpen}
          placement='bottom-start'
        >
          <itwinui_react_1.IconButton
            onClick={function () {
              return setIsOpen(function (open) {
                return !open;
              });
            }}
          >
            <itwinui_react_1.ColorSwatch
              style={{ pointerEvents: 'none', margin: 0 }}
              color={selectedColor}
            />
          </itwinui_react_1.IconButton>
        </utils_1.Popover>
        <itwinui_react_1.Button
          onClick={function () {
            setCurrentFormat(
              formats[(formats.indexOf(currentFormat) + 1) % formats.length],
            );
          }}
          endIcon={<itwinui_icons_react_1.SvgSwap />}
        >
          <div style={{ width: 200 }}>
            {(_a = getDisplayString()) !== null && _a !== void 0
              ? _a
              : 'No color selected.'}
          </div>
        </itwinui_react_1.Button>
      </itwinui_react_1.ButtonGroup>
    </>
  );
};
