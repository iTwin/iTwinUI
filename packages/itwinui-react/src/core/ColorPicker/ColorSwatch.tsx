/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { ColorValue, Box, ButtonBase } from '../../utils/index.js';
import type {
  ColorType,
  PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { getColorValue } from './ColorPicker.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

type ColorSwatchProps = {
  /**
   * Color code.
   */
  color: ColorValue | ColorType;
  /**
   * Is color selected.
   */
  isActive?: boolean;
};

/**
 * ColorSwatch component to display within a color palette.
 * @example
 * <ColorSwatch color='#23450b' onClick={onClick}/>
 * <ColorSwatch color={{ r: 255, g: 255, b: 0 }} onClick={onClick}/>
 */
export const ColorSwatch = React.forwardRef((props, ref) => {
  const { color, style, onClick, isActive, className, ...rest } = props;

  const colorString = React.useMemo(
    () =>
      typeof color === 'string'
        ? color
        : getColorValue(color).toHslString(true),
    [color],
  );

  return (
    <Box
      as={(!!onClick ? ButtonBase : 'span') as 'button'}
      className={cx('iui-color-swatch', { 'iui-active': isActive }, className)}
      style={
        {
          '--iui-color-swatch-background': colorString,
          ...style,
        } as React.CSSProperties
      }
      onClick={onClick}
      aria-pressed={!!onClick && isActive ? 'true' : undefined}
      ref={ref}
      {...rest}
    >
      {props.children ?? (
        <VisuallyHidden>{colorString.toUpperCase()}</VisuallyHidden>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', ColorSwatchProps>;
if (process.env.NODE_ENV === 'development') {
  ColorSwatch.displayName = 'ColorSwatch';
}
