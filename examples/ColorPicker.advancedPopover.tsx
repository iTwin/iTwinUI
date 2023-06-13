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
  ButtonGroup,
  ColorSwatch,
  IconButton,
  Button,
} from '@itwin/itwinui-react';
import { Popover } from '@itwin/itwinui-react/esm/core/utils';
import { SvgSwap } from '@itwin/itwinui-icons-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<ColorValue>(
    ColorValue.create({ h: 0, s: 100, l: 50 }),
  );

  const formats = ['hsl', 'rgb', 'hex'] as const;
  const [currentFormat, setCurrentFormat] = React.useState<
    typeof formats[number]
  >(formats[0]);

  const onColorChanged = (color: ColorValue) => {
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

  return (
    <>
      <ButtonGroup>
        <Popover
          content={
            <ColorPicker
              selectedColor={selectedColor}
              onChangeComplete={onColorChanged}
            >
              <ColorBuilder />
              <ColorPalette
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
            </ColorPicker>
          }
          appendTo={() => document.body}
          visible={isOpen}
          placement='bottom-start'
        >
          <IconButton onClick={() => setIsOpen((open) => !open)}>
            <ColorSwatch
              style={{ pointerEvents: 'none', margin: 0 }}
              color={selectedColor}
            />
          </IconButton>
        </Popover>
        <Button
          onClick={() => {
            setCurrentFormat(
              formats[(formats.indexOf(currentFormat) + 1) % formats.length],
            );
          }}
          endIcon={<SvgSwap />}
        >
          <div style={{ width: 200 }}>
            {getDisplayString() ?? 'No color selected.'}
          </div>
        </Button>
      </ButtonGroup>
    </>
  );
};
