/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ColorPalette,
  ColorPicker,
  ColorValue,
  ColorSwatch,
} from '@itwin/itwinui-react';
export default () => {
  const ColorsList = [
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
  const [activeColor, setActiveColor] = React.useState(ColorsList[5]);
  const [colorName, setColorName] = React.useState(ColorsList[5].name);
  const onColorChanged = (color) => {
    const hexString = color.toHexString();
    const index = ColorsList.findIndex(
      (swatch) => swatch.color === hexString.toLowerCase(),
    );
    setActiveColor(ColorsList[index]);
    setColorName(ColorsList[index].name);
  };
  return React.createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'row', gap: 10 } },
      React.createElement(ColorSwatch, {
        style: { pointerEvents: 'none', margin: 0 },
        color: activeColor.color,
      }),
      React.createElement('span', null, colorName),
    ),
    React.createElement(
      ColorPicker,
      { selectedColor: activeColor.color, onChangeComplete: onColorChanged },
      React.createElement(ColorPalette, {
        colors: ColorsList.map(({ color }) => color),
      }),
    ),
  );
};
