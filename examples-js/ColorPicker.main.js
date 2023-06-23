/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ColorBuilder,
  ColorInputPanel,
  ColorPicker,
  ColorValue,
} from '@itwin/itwinui-react';
export default () => {
  const [activeColor, setActiveColor] = React.useState(
    ColorValue.create('#0073ba'),
  );
  const onColorChanged = (color) => {
    setActiveColor(color);
  };
  return React.createElement(
    ColorPicker,
    { selectedColor: activeColor, onChangeComplete: onColorChanged },
    React.createElement(ColorBuilder, null),
    React.createElement(ColorInputPanel, { defaultColorFormat: 'hsl' }),
  );
};
