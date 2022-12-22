/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { IconButton } from '../Buttons';
import { Input } from '../Input';
import {
  ColorValue,
  CommonProps,
  InputContainer,
  useTheme,
  SvgSwap,
} from '../utils';
import { useColorPickerContext } from './ColorPickerContext';
import '@itwin/itwinui-css/css/color-picker.css';

export type ColorInputPanelProps = {
  /**
   * The default color format to be inputted in the panel.
   */
  defaultColorFormat: 'hsl' | 'rgb' | 'hex';
  /**
   * Color formats to switch between. The swap button will cycle between these formats.
   *
   * If array only has one option, then swap button will not be shown.
   *
   * @default ['hsl', 'rgb', 'hex']
   */
  allowedColorFormats?: ('hsl' | 'rgb' | 'hex')[];
} & Omit<CommonProps, 'title'>;

/**
 * `ColorInputPanel` shows input fields to enter precise color values in the specified format.
 * It also allows switching between the specified formats using a swap button.
 * @example
 * <ColorPicker>
 *   // ...
 *   <ColorInputPanel defaultColorFormat='hsl' />
 * </ColorPicker>
 */
export const ColorInputPanel = React.forwardRef(
  (props: ColorInputPanelProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      defaultColorFormat,
      allowedColorFormats = ['hsl', 'rgb', 'hex'],
      className,
      ...rest
    } = props;

    useTheme();

    const inputsContainerRef = React.useRef<HTMLDivElement>(null);
    const { activeColor, applyHsvColorChange, hsvColor, showAlpha } =
      useColorPickerContext();

    const [currentFormat, setCurrentFormat] =
      React.useState(defaultColorFormat);
    React.useEffect(() => {
      setCurrentFormat(defaultColorFormat);
    }, [defaultColorFormat]);

    // need to use state since input may have parsing error
    const [input, setInput] = React.useState<Array<string>>(['', '', '', '']);
    React.useEffect(() => {
      if (currentFormat === 'hsl') {
        const hsl = activeColor.toHslColor();
        setInput([
          ColorValue.getFormattedColorNumber(hsvColor.h), // use hsvColor to preserve hue for 0,0,0 edge case
          ColorValue.getFormattedColorNumber(hsl.s),
          ColorValue.getFormattedColorNumber(hsl.l),
          ColorValue.getFormattedColorNumber(
            hsl.a ?? activeColor.getAlpha() / 255,
            2,
          ),
        ]);
      } else if (currentFormat === 'rgb') {
        const rgb = activeColor.toRgbColor();
        setInput([
          rgb.r.toString(),
          rgb.g.toString(),
          rgb.b.toString(),
          ColorValue.getFormattedColorNumber(
            rgb.a ?? activeColor.getAlpha() / 255,
            2,
          ),
        ]);
      } else {
        setInput([activeColor.toHexString(showAlpha)]);
        setValidHexInput(true);
      }
    }, [activeColor, hsvColor.h, currentFormat, showAlpha]);

    const [validHexInput, setValidHexInput] = React.useState(true);

    const swapColorFormat = React.useCallback(() => {
      const newFormat =
        allowedColorFormats[
          (allowedColorFormats.indexOf(currentFormat) + 1) %
            allowedColorFormats.length
        ] ?? allowedColorFormats[0];
      setCurrentFormat(newFormat);
    }, [currentFormat, allowedColorFormats]);

    const isFocusInside = (focused?: EventTarget | null) =>
      !!(
        focused &&
        inputsContainerRef.current &&
        inputsContainerRef.current.contains(focused as HTMLElement)
      );

    const handleColorInputChange = () => {
      let color;

      if (currentFormat === 'hex') {
        try {
          const value = input[0].replace(/ /g, '').toLowerCase(); // remove white space from input
          color = ColorValue.create(value);
          setValidHexInput(true);
          if (activeColor.toHexString(showAlpha).toLowerCase() === value) {
            return;
          }
        } catch (_e) {
          setValidHexInput(false);
          return;
        }
      }

      if (currentFormat === 'hsl') {
        const [h, s, l, a] = input.map(Number);

        if (
          h < 0 ||
          h > 360 ||
          s < 0 ||
          s > 100 ||
          l < 0 ||
          l > 100 ||
          a < 0 ||
          a > 1
        ) {
          return;
        }
        const hsl = activeColor.toHslColor();
        if (hsl.h === h && hsl.s === s && hsl.l === l && hsl.a === a) {
          return;
        }

        color = ColorValue.create({ h, s, l, a });
      }

      if (currentFormat === 'rgb') {
        const [r, g, b, a] = input.map(Number);

        if (
          r < 0 ||
          r > 255 ||
          g < 0 ||
          g > 255 ||
          b < 0 ||
          b > 255 ||
          a < 0 ||
          a > 1
        ) {
          return;
        }
        const rgb = activeColor.toRgbColor();
        if (rgb.r === r && rgb.g === g && rgb.b === b && rgb.a === a) {
          return;
        }

        color = ColorValue.create({ r, g, b, a });
      }

      if (color) {
        applyHsvColorChange(color.toHsvColor(), true, color);
      }
    };

    const hexInputField = (
      <InputContainer status={validHexInput ? undefined : 'negative'}>
        <Input
          size='small'
          maxLength={showAlpha ? 9 : 7}
          minLength={1}
          placeholder='HEX'
          value={input[0]}
          onChange={(event) => {
            const value = event.target.value.startsWith('#')
              ? event.target.value
              : `#${event.target.value}`;
            setInput([value]);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleColorInputChange();
            }
          }}
          onBlur={(event) => {
            event.preventDefault();
            handleColorInputChange();
          }}
        />
      </InputContainer>
    );

    const hslInputs = (
      <>
        <InputContainer
          status={
            Number(input[0]) < 0 || Number(input[0]) > 360
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='359'
            step='.1'
            placeholder='H'
            value={input[0] ?? ''}
            onChange={(event) => {
              setInput([event.target.value, input[1], input[2], input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        <InputContainer
          status={
            Number(input[1]) < 0 || Number(input[1]) > 100
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='100'
            step='.1'
            placeholder='S'
            value={input[1] ?? ''}
            onChange={(event) => {
              setInput([input[0], event.target.value, input[2], input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        <InputContainer
          status={
            Number(input[2]) < 0 || Number(input[2]) > 100
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='100'
            step='.1'
            placeholder='L'
            value={input[2] ?? ''}
            onChange={(event) => {
              setInput([input[0], input[1], event.target.value, input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        {showAlpha && (
          <InputContainer
            status={
              Number(input[3]) < 0 || Number(input[3]) > 1
                ? 'negative'
                : undefined
            }
          >
            <Input
              size='small'
              type='number'
              min='0'
              max='1'
              step='.01'
              placeholder='A'
              value={input[3] ?? ''}
              onChange={(event) => {
                setInput([input[0], input[1], input[2], event.target.value]);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleColorInputChange();
                }
              }}
              onBlur={(event) => {
                event.preventDefault();
                if (!isFocusInside(event.relatedTarget)) {
                  handleColorInputChange();
                }
              }}
            />
          </InputContainer>
        )}
      </>
    );

    const rgbInputs = (
      <>
        <InputContainer
          status={
            Number(input[0]) < 0 || Number(input[0]) > 255
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='255'
            placeholder='R'
            value={input[0] ?? ''}
            onChange={(event) => {
              setInput([event.target.value, input[1], input[2], input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        <InputContainer
          status={
            Number(input[1]) < 0 || Number(input[1]) > 255
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='255'
            placeholder='G'
            value={input[1] ?? ''}
            onChange={(event) => {
              setInput([input[0], event.target.value, input[2], input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        <InputContainer
          status={
            Number(input[2]) < 0 || Number(input[2]) > 255
              ? 'negative'
              : undefined
          }
        >
          <Input
            size='small'
            type='number'
            min='0'
            max='255'
            placeholder={'B'}
            value={input[2] ?? ''}
            onChange={(event) => {
              setInput([input[0], input[1], event.target.value, input[3]]);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleColorInputChange();
              }
            }}
            onBlur={(event) => {
              event.preventDefault();
              if (!isFocusInside(event.relatedTarget)) {
                handleColorInputChange();
              }
            }}
          />
        </InputContainer>
        {showAlpha && (
          <InputContainer
            status={
              Number(input[3]) < 0 || Number(input[3]) > 1
                ? 'negative'
                : undefined
            }
          >
            <Input
              size='small'
              type='number'
              min='0'
              max='1'
              step='.01'
              placeholder='A'
              value={input[3] ?? ''}
              onChange={(event) => {
                setInput([input[0], input[1], input[2], event.target.value]);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleColorInputChange();
                }
              }}
              onBlur={(event) => {
                event.preventDefault();
                if (!isFocusInside(event.relatedTarget)) {
                  handleColorInputChange();
                }
              }}
            />
          </InputContainer>
        )}
      </>
    );

    return (
      <div
        className={cx('iui-color-input-wrapper', className)}
        ref={ref}
        {...rest}
      >
        <div className='iui-color-picker-section-label'>
          {showAlpha && currentFormat != 'hex'
            ? currentFormat.toUpperCase() + 'A'
            : currentFormat.toUpperCase()}
        </div>
        <div className='iui-color-input'>
          {allowedColorFormats.length > 1 && (
            <IconButton
              styleType='borderless'
              onClick={swapColorFormat}
              size='small'
            >
              <SvgSwap />
            </IconButton>
          )}
          <div ref={inputsContainerRef} className='iui-color-input-fields'>
            {currentFormat === 'hex' && hexInputField}
            {currentFormat === 'rgb' && rgbInputs}
            {currentFormat === 'hsl' && hslInputs}
          </div>
        </div>
      </div>
    );
  },
);

export default ColorInputPanel;
