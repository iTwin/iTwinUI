/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ColorInputPanel, ColorPicker, ColorValue } from '@itwin/itwinui-react';

export default () => {
  const [activeColor, setActiveColor] = React.useState<ColorValue>(ColorValue.create('#28d467'));

  const onColorChanged = (color: ColorValue) => {
    setActiveColor(color);
  };

  return (
    <ColorPicker selectedColor={activeColor} onChangeComplete={onColorChanged}>
      <ColorInputPanel defaultColorFormat={'hex'} />
    </ColorPicker>
  );
};
