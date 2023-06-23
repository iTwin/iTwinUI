/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ColorBuilder,
  ColorPalette,
  ColorPicker,
  ColorValue,
  ButtonGroup,
  ColorSwatch,
  IconButton,
  Button,
} from '@itwin/itwinui-react';
import { Popover } from '@itwin/itwinui-react/esm/core/utils';
import { SvgSwap } from '@itwin/itwinui-icons-react';
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(
    ColorValue.create({ h: 0, s: 100, l: 50 }),
  );
  const formats = ['hsl', 'rgb', 'hex'];
  const [currentFormat, setCurrentFormat] = React.useState(formats[0]);
  const onColorChanged = (color) => {
    setSelectedColor(color);
  };
  const getDisplayString = (color = selectedColor) => {
    switch (currentFormat) {
      case 'hsl':
        return color.toHslString(true);
      case 'rgb':
        return color.toRgbString(true);
      case 'hex':
        return color.toHexString(true);
    }
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      ButtonGroup,
      null,
      React.createElement(
        Popover,
        {
          content: React.createElement(
            ColorPicker,
            { selectedColor: selectedColor, onChangeComplete: onColorChanged },
            React.createElement(ColorBuilder, null),
            React.createElement(ColorPalette, {
              label: 'Saved Colors',
              colors: [
                { h: 0, s: 100, l: 50 },
                { r: 255, g: 98, b: 0 },
                '#fec134',
                '#5A6973',
                { h: 95, s: 83, v: 72 },
                { h: 250, s: 100, l: 59 },
              ],
            }),
          ),
          appendTo: () => document.body,
          visible: isOpen,
          placement: 'bottom-start',
        },
        React.createElement(
          IconButton,
          { onClick: () => setIsOpen((open) => !open) },
          React.createElement(ColorSwatch, {
            style: { pointerEvents: 'none', margin: 0 },
            color: selectedColor,
          }),
        ),
      ),
      React.createElement(
        Button,
        {
          onClick: () => {
            setCurrentFormat(
              formats[(formats.indexOf(currentFormat) + 1) % formats.length],
            );
          },
          endIcon: React.createElement(SvgSwap, null),
        },
        React.createElement(
          'div',
          { style: { width: 200 } },
          getDisplayString() ?? 'No color selected.',
        ),
      ),
    ),
  );
};
