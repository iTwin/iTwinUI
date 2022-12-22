/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  ColorValue,
  CommonProps,
  getBoundedValue,
  HsvColor,
  useEventListener,
  useMergedRefs,
  useTheme,
} from '../utils';
import { Slider } from '../Slider';
import '@itwin/itwinui-css/css/color-picker.css';
import { useColorPickerContext } from './ColorPickerContext';

const getVerticalPercentageOfRectangle = (rect: DOMRect, pointer: number) => {
  const position = getBoundedValue(pointer, rect.top, rect.bottom);
  return ((position - rect.top) / rect.height) * 100;
};
const getHorizontalPercentageOfRectangle = (rect: DOMRect, pointer: number) => {
  const position = getBoundedValue(pointer, rect.left, rect.right);
  return ((position - rect.left) / rect.width) * 100;
};

export type ColorBuilderProps = Omit<CommonProps, 'title'>;

/**
 * `ColorBuilder` consists of two parts:
 * a color canvas to adjust saturation and lightness values,
 * and a set of sliders to adjust hue and alpha values.
 */
export const ColorBuilder = React.forwardRef(
  (props: ColorBuilderProps, ref: React.Ref<HTMLDivElement>) => {
    const { className, ...rest } = props;

    const builderRef = React.useRef<HTMLDivElement>();
    const refs = useMergedRefs(builderRef, ref);

    useTheme();

    const {
      activeColor,
      hsvColor,
      onChangeComplete,
      applyHsvColorChange,
      showAlpha,
    } = useColorPickerContext();

    // Set values for slider
    const hueSliderColor = React.useMemo(
      () => ColorValue.create({ h: hsvColor.h, s: 100, v: 100 }),
      [hsvColor.h],
    );
    const sliderValue = React.useMemo(() => hsvColor.h, [hsvColor]);
    const alphaValue = React.useMemo(
      () => (showAlpha ? hsvColor.a ?? 1 : 1),
      [hsvColor.a, showAlpha],
    );

    // Set values for color square and color dot
    const dotColorString = React.useMemo(
      () => activeColor.toHexString(),
      [activeColor],
    );
    const [colorDotActive, setColorDotActive] = React.useState(false);
    const hueColorString = hueSliderColor.toHexString();

    const squareTop = 100 - hsvColor.v;
    const squareLeft = hsvColor.s;

    // Update slider change
    const updateHueSlider = React.useCallback(
      (huePercent: number, selectionChanged: boolean) => {
        const hue = Number(huePercent.toFixed(2));
        const newHsvColor = {
          h: hue,
          s: hsvColor.s,
          v: hsvColor.v,
          a: hsvColor.a,
        };
        applyHsvColorChange(newHsvColor, selectionChanged);
      },
      [applyHsvColorChange, hsvColor],
    );

    // Update opacity slider change
    const updateOpacitySlider = React.useCallback(
      (alphaPercent: number, selectionChanged: boolean) => {
        const alpha = Number(alphaPercent.toFixed(2));
        const newHsvColor = {
          h: hsvColor.h,
          s: hsvColor.s,
          v: hsvColor.v,
          a: alpha,
        };
        applyHsvColorChange(newHsvColor, selectionChanged);
      },
      [applyHsvColorChange, hsvColor],
    );

    // Update Color field square change
    const squareRef = React.useRef<HTMLDivElement>(null);
    const colorDotRef = React.useRef<HTMLDivElement>(null);

    const updateColorDot = React.useCallback(
      (x: number, y: number, selectionChanged: boolean) => {
        const newHsvColor: HsvColor = {
          h: hsvColor.h,
          s: x,
          v: 100 - y,
          a: hsvColor.a,
        };
        applyHsvColorChange(newHsvColor, selectionChanged);
      },
      [applyHsvColorChange, hsvColor],
    );

    const updateSquareValue = React.useCallback(
      (
        event: PointerEvent | React.PointerEvent,
        callbackType: 'onChange' | 'onUpdate' | 'onClick',
      ) => {
        if (
          (squareRef.current && colorDotActive) ||
          (squareRef.current && callbackType === 'onClick')
        ) {
          const percentX = getHorizontalPercentageOfRectangle(
            squareRef.current.getBoundingClientRect(),
            event.clientX,
          );
          const percentY = getVerticalPercentageOfRectangle(
            squareRef.current.getBoundingClientRect(),
            event.clientY,
          );

          if (callbackType === 'onChange') {
            updateColorDot(percentX, percentY, true);
          } else {
            updateColorDot(percentX, percentY, false);
          }
        }
      },
      [colorDotActive, updateColorDot],
    );
    const handleSquarePointerUp = React.useCallback(
      (event: PointerEvent) => {
        if (!colorDotActive) {
          return;
        }
        updateSquareValue(event, 'onChange');
        setColorDotActive(false);
        event.preventDefault();
        event.stopPropagation();
      },
      [colorDotActive, updateSquareValue],
    );
    useEventListener(
      'pointerup',
      handleSquarePointerUp,
      builderRef.current?.ownerDocument,
    );

    const handleSquarePointerMove = React.useCallback(
      (event: PointerEvent): void => {
        if (!colorDotActive) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        updateSquareValue(event, 'onUpdate');
      },
      [colorDotActive, updateSquareValue],
    );
    useEventListener(
      'pointermove',
      handleSquarePointerMove,
      builderRef.current?.ownerDocument,
    );

    const handleSquarePointerLeave = React.useCallback(
      (event: PointerEvent): void => {
        if (!colorDotActive) {
          return;
        }
        updateSquareValue(event, 'onChange');
        setColorDotActive(false);
      },
      [colorDotActive, updateSquareValue],
    );
    useEventListener(
      'pointerleave',
      handleSquarePointerLeave,
      builderRef.current?.ownerDocument,
    );

    const keysPressed = React.useRef<Record<string, boolean>>({}); // keep track of which keys are currently pressed

    // Arrow key navigation for color dot
    const handleColorDotKeyDown = (event: React.KeyboardEvent) => {
      let x = squareLeft;
      let y = squareTop;
      keysPressed.current[event.key] = true;
      switch (event.key) {
        case 'ArrowDown': {
          y = Math.min(y + 1, 100);
          updateColorDot(x, y, false);
          break;
        }
        case 'ArrowUp': {
          y = Math.max(y - 1, 0);
          updateColorDot(x, y, false);
          break;
        }
        case 'ArrowLeft':
          x = Math.max(x - 1, 0);
          updateColorDot(x, y, false);
          break;
        case 'ArrowRight':
          x = Math.min(x + 1, 100);
          updateColorDot(x, y, false);
          break;
      }
    };

    const handleColorDotKeyUp = (event: React.KeyboardEvent) => {
      keysPressed.current[event.key] = false;
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          if (
            keysPressed.current['ArrowUp'] ||
            keysPressed.current['ArrowDown'] ||
            keysPressed.current['ArrowLeft'] ||
            keysPressed.current['ArrowRight']
          ) {
            return;
          }
          onChangeComplete?.(ColorValue.create(hsvColor));
          break;
      }
    };

    return (
      <div
        className={cx('iui-color-selection-wrapper', className)}
        ref={refs}
        {...rest}
      >
        <div
          className='iui-color-field'
          style={
            {
              '--iui-color-field-hue': hueColorString,
              '--iui-color-picker-selected-color': dotColorString,
            } as React.CSSProperties
          }
          ref={squareRef}
          onPointerDown={(event: React.PointerEvent) => {
            event.preventDefault();
            updateSquareValue(event, 'onClick');
            setColorDotActive(true);
            colorDotRef.current?.focus();
          }}
        >
          <div
            className='iui-color-dot'
            style={
              {
                '--iui-color-dot-inset': `${squareTop.toString()}% auto auto ${squareLeft.toString()}%`,
              } as React.CSSProperties
            }
            onPointerDown={() => {
              setColorDotActive(true);
              colorDotRef.current?.focus();
            }}
            onKeyDown={handleColorDotKeyDown}
            onKeyUp={handleColorDotKeyUp}
            tabIndex={0}
            ref={colorDotRef}
          />
        </div>

        <Slider
          minLabel=''
          maxLabel=''
          values={[sliderValue]}
          className='iui-hue-slider'
          trackDisplayMode='none'
          tooltipProps={() => ({ visible: false })}
          onChange={(values) => {
            updateHueSlider(values[0], true);
          }}
          onUpdate={(values) => {
            updateHueSlider(values[0], false);
          }}
          min={0}
          max={359}
        />

        {showAlpha && (
          <Slider
            minLabel=''
            maxLabel=''
            values={[alphaValue]}
            className='iui-opacity-slider'
            trackDisplayMode='none'
            tooltipProps={() => ({ visible: false })}
            onChange={(values) => {
              updateOpacitySlider(values[0], true);
            }}
            onUpdate={(values) => {
              updateOpacitySlider(values[0], false);
            }}
            min={0}
            max={1}
            step={0.01}
            style={
              {
                '--iui-color-picker-selected-color': hueColorString,
              } as React.CSSProperties
            }
          />
        )}
      </div>
    );
  },
);
