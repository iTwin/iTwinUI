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
  const [selectedColor, setSelectedColor] = React.useState<ColorValue>(
    ColorValue.create({ r: 90, g: 105, b: 115, a: 0.4 })
  );

  const onColorChanged = (color: ColorValue) => {
    setSelectedColor(color);
  };

  return (
    <ColorPicker selectedColor={selectedColor} onChangeComplete={onColorChanged} showAlpha={true}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='rgb' />
      <ColorPalette
        label='Saved Colors'
        colors={[
          { r: 90, g: 105, b: 115, a: 1 },
          { r: 90, g: 105, b: 115, a: 0.81 },
          { r: 90, g: 105, b: 115, a: 0.4 },
        ]}
      />
    </ColorPicker>
  );
};
