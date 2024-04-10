/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { ColorValue, Box } from '../../utils/index.js';
import type {
  ColorType,
  PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { getColorValue } from './ColorPicker.js';
import { ColorSwatch } from './ColorSwatch.js';
import { useColorPickerContext } from './ColorPickerContext.js';

export type ColorPaletteProps = {
  /**
   * Label shown above the palette.
   */
  label?: React.ReactNode;
  /**
   * List of colors shown as swatches in the palette.
   */
  colors?: Array<ColorType | ColorValue>;
  /**
   * Pass any custom swatches as children.
   */
  children?: React.ReactNode;
};

/**
 * `ColorPalette` is used to show a group of `ColorSwatch` components.
 * @example
 * <ColorPalette colors={['#ffffff', '#000000']} />
 * @example
 * <ColorPalette>
 *   <ColorSwatch color='#ffffff' />
 *   <ColorSwatch color='#000000' />
 *   // ...
 * </ColorPalette>
 */
export const ColorPalette = React.forwardRef((props, ref) => {
  const { colors, label, className, children, ...rest } = props;

  const { activeColor, setActiveColor, onChangeComplete } =
    useColorPickerContext();

  return (
    <Box
      className={cx('iui-color-palette-wrapper', className)}
      ref={ref}
      {...rest}
    >
      {label && <Box className='iui-color-picker-section-label'>{label}</Box>}
      <Box className='iui-color-palette'>
        {children}
        {colors &&
          colors.map((_color, index) => {
            const color = getColorValue(_color);
            return (
              <ColorSwatch
                key={index}
                color={color}
                onClick={() => {
                  onChangeComplete?.(color);
                  setActiveColor(color);
                }}
                isActive={color.equals(activeColor)}
              />
            );
          })}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ColorPaletteProps>;
