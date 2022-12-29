/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import '@itwin/itwinui-css/css/color-picker.css';
import {
  useTheme,
  CommonProps,
  ColorType,
  ColorValue,
  HsvColor,
  getTabbableElements,
} from '../utils';
import cx from 'classnames';
import { ColorPickerContext } from './ColorPickerContext';

export const getColorValue = (color: ColorType | ColorValue | undefined) => {
  if (color instanceof ColorValue) {
    return color;
  }
  return ColorValue.create(color);
};

export type ColorPickerProps = {
  /**
   * Content of the color palette.
   *
   * Pass a combination of `ColorBuilder`, `ColorInputPanel`, `ColorPalette`, and any custom children.
   */
  children: React.ReactNode;
  /**
   * The selected color within color picker.
   */
  selectedColor?: ColorType | ColorValue;
  /**
   * Callback fired when the color value is internally updated during
   * operations like dragging a thumb. Use this callback with caution as a
   * high-volume of updates will occur when dragging.
   */
  onChange?: (color: ColorValue) => void;
  /**
   * Callback fired when selectedColor is done changing.
   * This can be on pointerUp or keyUp when thumb is done dragging,
   * or when user clicks on color builder components, or when user clicks on color swatch.
   */
  onChangeComplete?: (color: ColorValue) => void;
  /**
   * If true, the first focusable element in the color picker will automatically be focused.
   * @default false
   */
  setFocus?: boolean;
  /**
   * If true, ColorBuilder will show the alpha slider and ColorInputPanel will show an alpha input.
   * @default false
   */
  showAlpha?: boolean;
} & Omit<CommonProps, 'title'>;

/**
 * ColorPicker to display color builder options, color inputs, and a palette of ColorSwatches.
 * @example
 * <ColorPicker onChangeComplete={() => {}} selectedColor={activeColor}>
 *   <ColorPalette colors={['#FFFFFF', '#5A6973']} />
 * </ColorPicker>
 * @example
 * <ColorPicker onChangeComplete={() => {}} selectedColor={activeColor}>
 *   <ColorBuilder />
 *   <ColorInputPanel defaultColorFormat='hsl' />
 *   <ColorPalette label='Saved colors' colors={['#FFFFFF', '#5A6973']} />
 * </ColorPicker>
 */
export const ColorPicker = (props: ColorPickerProps) => {
  const {
    children,
    className,
    selectedColor,
    onChange,
    onChangeComplete,
    setFocus = false,
    showAlpha = false,
    ...rest
  } = props;

  useTheme();

  const ref = React.useRef<HTMLDivElement>(null);

  // set focus on the first tabbable element
  React.useEffect(() => {
    if (ref.current && setFocus) {
      const tabbableElements = getTabbableElements(ref.current);
      (tabbableElements[0] as HTMLElement).focus();
    }
  }, [setFocus]);

  const inColor = React.useMemo(
    () => getColorValue(selectedColor),
    [selectedColor],
  );
  const activeColorTbgr = React.useRef(inColor.toTbgr());

  const [activeColor, setActiveColor] = React.useState<ColorValue>(inColor); // Color of colorDot or active ColorSwatch
  React.useEffect(() => {
    setActiveColor(inColor);
  }, [inColor]);

  const [hsvColor, setHsvColor] = React.useState(() =>
    activeColor.toHsvColor(),
  );

  // The following code is used to preserve the Hue after initial mount. If the current HSV value produces the same rgb value
  // as the selectedColor prop then leave the HSV color unchanged. This prevents the jumping of HUE as the s/v values are changed
  // by user moving the pointer.
  React.useEffect(() => {
    if (inColor.toTbgr() !== activeColorTbgr.current) {
      activeColorTbgr.current = inColor.toTbgr();
      setHsvColor(inColor.toHsvColor());
    }
  }, [inColor]);

  const applyHsvColorChange = React.useCallback(
    (
      newColor: HsvColor,
      selectionChanged: boolean,
      newColorValue?: ColorValue,
    ) => {
      // save the HSV values
      setHsvColor(newColor);
      const newActiveColor = newColorValue ?? ColorValue.create(newColor);

      // Only update selected color when dragging is done
      if (selectionChanged) {
        onChangeComplete?.(newActiveColor);
      } else {
        onChange?.(newActiveColor);
      }

      activeColorTbgr.current = newActiveColor.toTbgr();

      // this converts it to store in tbgr
      setActiveColor(newActiveColor);
    },
    [onChange, onChangeComplete],
  );

  return (
    <div className={cx('iui-color-picker', className)} ref={ref} {...rest}>
      <ColorPickerContext.Provider
        value={{
          activeColor,
          setActiveColor,
          hsvColor,
          applyHsvColorChange,
          onChangeComplete,
          showAlpha,
        }}
      >
        {children}
      </ColorPickerContext.Provider>
    </div>
  );
};

export default ColorPicker;
