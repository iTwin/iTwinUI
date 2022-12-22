/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/color-picker.css';
import { useTheme, ColorValue, ColorType } from '../utils';
import { getColorValue } from './ColorPicker';

export type ColorSwatchProps = {
  /**
   * Color code.
   */
  color: ColorValue | ColorType;
  /**
   * Is color selected.
   */
  isActive?: boolean;
} & Omit<React.ComponentPropsWithRef<'div'>, 'color'>;

/**
 * ColorSwatch component to display within a color palette.
 * @example
 * <ColorSwatch color='#23450b' onClick={onClick}/>
 * <ColorSwatch color={{ r: 255, g: 255, b: 0 }} onClick={onClick}/>
 */
export const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  (props, ref) => {
    const { color, style, onClick, isActive, className, ...rest } = props;
    useTheme();

    const colorString = React.useMemo(
      () =>
        typeof color === 'string'
          ? color
          : getColorValue(color).toHslString(true),
      [color],
    );

    return (
      <div
        className={cx(
          'iui-color-swatch',
          { 'iui-active': isActive },
          className,
        )}
        style={
          {
            '--iui-color-swatch-background': colorString,
            ...style,
          } as React.CSSProperties
        }
        onClick={onClick}
        tabIndex={isActive ? 0 : -1}
        aria-selected={isActive}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default ColorSwatch;
