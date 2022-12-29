/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ColorBuilder,
  ColorInputPanel,
  ColorPalette,
  ColorPicker,
  ColorValue,
} from '@itwin/itwinui-react';

export default () => {
  const [activeColor, setActiveColor] = React.useState<ColorValue>(ColorValue.create('#0073ba'));

  const onColorChanged = (color: ColorValue) => {
    setActiveColor(color);
  };

  return (
    <ColorPicker selectedColor={activeColor} onChangeComplete={onColorChanged}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat={'hsl'} />
    </ColorPicker>
  );
};
