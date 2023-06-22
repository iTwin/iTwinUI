'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var ColorsList = [
    { color: '#ffffff', name: 'WHITE' },
    { color: '#5a6973', name: 'GREY' },
    { color: '#00121d', name: 'KURETAKE BLACK MANGA' },
    { color: '#002a44', name: 'RHAPSODY IN BLUE' },
    { color: '#00426b', name: 'DARK IMPERIAL BLUE' },
    { color: '#005a92', name: 'JETSKI RACE' },
    { color: '#0073ba', name: 'FRENCH BLUE' },
    { color: '#008be1', name: 'BLUE COLA' },
    { color: '#30b0ff', name: 'FANTASY CONSOLE SKY' },
    { color: '#58bfff', name: 'HELLO SUMMER' },
    { color: '#7fceff', name: 'CHROMIS DAMSEL BLUE' },
    { color: '#a6ddff', name: 'DROPLET' },
    { color: '#cdecff', name: 'LUCID DREAMS' },
    { color: '#e5f5fd', name: 'KODAMA WHITE' },
    { color: '#010200', name: 'REGISTRATION BLACK' },
    { color: '#122306', name: 'YUZU SOY' },
    { color: '#23450b', name: 'FOREST GREEN' },
    { color: '#346711', name: 'TATZELWURM GREEN' },
    { color: '#458816', name: 'CHLOROPHYLL' },
    { color: '#56aa1c', name: 'PLASTIC PINES' },
    { color: '#5fbb1f', name: 'FIELD GREEN' },
    { color: '#67cc22', name: 'GREEN HIGH' },
    { color: '#91e458', name: 'LILLIPUTIAN LIME' },
    { color: '#b2ec8b', name: 'GREEN DAY' },
    { color: '#d4f4bd', name: 'TEA GREEN' },
    { color: '#eef6e8', name: 'VERDE PASTEL' },
    { color: '#9ba5af', name: 'SERYI GREY' },
    { color: '#cf0000', name: 'RED EPIPHYLLUM' },
    { color: '#ff6300', name: 'SAFETY ORANGE' },
    { color: '#ffc335', name: 'RISE-N-SHINE' },
  ];
  var _a = React.useState(ColorsList[5]),
    activeColor = _a[0],
    setActiveColor = _a[1];
  var _b = React.useState(ColorsList[5].name),
    colorName = _b[0],
    setColorName = _b[1];
  var onColorChanged = function (color) {
    var hexString = color.toHexString();
    var index = ColorsList.findIndex(function (swatch) {
      return swatch.color === hexString.toLowerCase();
    });
    setActiveColor(ColorsList[index]);
    setColorName(ColorsList[index].name);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <itwinui_react_1.ColorSwatch
          style={{ pointerEvents: 'none', margin: 0 }}
          color={activeColor.color}
        />
        <span>{colorName}</span>
      </div>
      <itwinui_react_1.ColorPicker
        selectedColor={activeColor.color}
        onChangeComplete={onColorChanged}
      >
        <itwinui_react_1.ColorPalette
          colors={ColorsList.map(function (_a) {
            var color = _a.color;
            return color;
          })}
        />
      </itwinui_react_1.ColorPicker>
    </div>
  );
};
