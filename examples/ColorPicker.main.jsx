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
  IconButton,
  ColorSwatch,
  Popover,
} from '@itwin/itwinui-react';

export default () => {
  const [activeColor, setActiveColor] = React.useState(
    ColorValue.create('#0073ba'),
  );

  const onColorChanged = (color) => {
    setActiveColor(color);
  };

  return (
    <Popover
      content={
        <ColorPicker
          selectedColor={activeColor}
          onChangeComplete={onColorChanged}
        >
          <ColorBuilder />
          <ColorInputPanel defaultColorFormat={'hsl'} />
        </ColorPicker>
      }
    >
      <IconButton>
        <ColorSwatch style={{ pointerEvents: 'none' }} color={activeColor} />
      </IconButton>
    </Popover>
  );
};
