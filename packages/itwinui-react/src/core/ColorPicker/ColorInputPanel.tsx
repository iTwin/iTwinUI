/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { IconButton } from '../Buttons/IconButton.js';
import { Input } from '../Input/Input.js';
import {
  ColorValue,
  SvgSwap,
  Box,
  useId,
  useMergedRefs,
  mergeEventHandlers,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { useColorPickerContext } from './ColorPickerContext.js';

type ColorInputPanelProps = {
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
  /**
   * Passes props to the color picker section label.
   */
  panelLabelProps?: React.ComponentProps<'div'>;
  /**
   * Passes props to the color input container.
   */
  colorInputContainerProps?: React.ComponentProps<'div'>;
  /**
   * Passes props to the color input fields group.
   */
  inputFieldsGroupProps?: React.ComponentProps<'div'>;
  /**
   * Passes props to the swap color format button.
   */
  swapColorFormatButtonProps?: React.ComponentProps<typeof IconButton>;
};

/**
 * `ColorInputPanel` shows input fields to enter precise color values in the specified format.
 * It also allows switching between the specified formats using a swap button.
 * @example
 * <ColorPicker>
 *   // ...
 *   <ColorInputPanel defaultColorFormat='hsl' />
 * </ColorPicker>
 */
export const ColorInputPanel = React.forwardRef((props, ref) => {
  const {
    defaultColorFormat,
    allowedColorFormats = ['hsl', 'rgb', 'hex'],
    className,
    colorInputContainerProps,
    panelLabelProps,
    inputFieldsGroupProps,
    swapColorFormatButtonProps,
    ...rest
  } = props;

  const inputsContainerRef = React.useRef<HTMLDivElement>(null);
  const { activeColor, applyHsvColorChange, hsvColor, showAlpha } =
    useColorPickerContext();

  const [currentFormat, setCurrentFormat] = React.useState(defaultColorFormat);
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
    <Input
      size='small'
      maxLength={showAlpha ? 9 : 7}
      minLength={1}
      placeholder='HEX'
      aria-label='Hex'
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
      status={validHexInput ? undefined : 'negative'}
    />
  );

  const hslInputs = (
    <>
      <Input
        size='small'
        type='number'
        min='0'
        max='359'
        step='.1'
        placeholder='H'
        aria-label='Hue'
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
        status={
          Number(input[0]) < 0 || Number(input[0]) > 360
            ? 'negative'
            : undefined
        }
      />
      <Input
        size='small'
        type='number'
        min='0'
        max='100'
        step='.1'
        placeholder='S'
        aria-label='Saturation'
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
        status={
          Number(input[1]) < 0 || Number(input[1]) > 100
            ? 'negative'
            : undefined
        }
      />
      <Input
        size='small'
        type='number'
        min='0'
        max='100'
        step='.1'
        placeholder='L'
        aria-label='Lightness'
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
        status={
          Number(input[2]) < 0 || Number(input[2]) > 100
            ? 'negative'
            : undefined
        }
      />

      {showAlpha && (
        <Input
          size='small'
          type='number'
          min='0'
          max='1'
          step='.01'
          placeholder='A'
          aria-label='Alpha'
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
          status={
            Number(input[3]) < 0 || Number(input[3]) > 1
              ? 'negative'
              : undefined
          }
        />
      )}
    </>
  );

  const rgbInputs = (
    <>
      <Input
        size='small'
        type='number'
        min='0'
        max='255'
        placeholder='R'
        aria-label='Red'
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
        status={
          Number(input[0]) < 0 || Number(input[0]) > 255
            ? 'negative'
            : undefined
        }
      />

      <Input
        size='small'
        type='number'
        min='0'
        max='255'
        placeholder='G'
        aria-label='Green'
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
        status={
          Number(input[1]) < 0 || Number(input[1]) > 255
            ? 'negative'
            : undefined
        }
      />

      <Input
        size='small'
        type='number'
        min='0'
        max='255'
        placeholder={'B'}
        aria-label='Blue'
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
        status={
          Number(input[2]) < 0 || Number(input[2]) > 255
            ? 'negative'
            : undefined
        }
      />
      {showAlpha && (
        <Input
          size='small'
          type='number'
          min='0'
          max='1'
          step='.01'
          placeholder='A'
          aria-label='Alpha'
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
          status={
            Number(input[3]) < 0 || Number(input[3]) > 1
              ? 'negative'
              : undefined
          }
        />
      )}
    </>
  );

  const fallbackLabelId = useId();
  const labelId = panelLabelProps?.id ?? fallbackLabelId;

  return (
    <Box
      as='div'
      className={cx('iui-color-input-wrapper', className)}
      ref={ref}
      {...rest}
    >
      <Box
        as='div'
        {...panelLabelProps}
        className={cx(
          'iui-color-picker-section-label',
          panelLabelProps?.className,
        )}
        id={labelId}
      >
        {showAlpha && currentFormat !== 'hex'
          ? currentFormat.toUpperCase() + 'A'
          : currentFormat.toUpperCase()}
      </Box>
      <Box
        as='div'
        {...colorInputContainerProps}
        className={cx('iui-color-input', colorInputContainerProps?.className)}
      >
        {allowedColorFormats.length > 1 && (
          <IconButton
            size='small'
            styleType='borderless'
            label='Switch format'
            {...swapColorFormatButtonProps}
            onClick={mergeEventHandlers(
              swapColorFormatButtonProps?.onClick,
              swapColorFormat,
            )}
          >
            <SvgSwap />
          </IconButton>
        )}
        <Box
          as='div'
          role={currentFormat !== 'hex' ? 'group' : undefined}
          aria-labelledby={currentFormat !== 'hex' ? labelId : undefined}
          {...inputFieldsGroupProps}
          ref={useMergedRefs(inputsContainerRef, inputFieldsGroupProps?.ref)}
          className={cx(
            'iui-color-input-fields',
            inputFieldsGroupProps?.className,
          )}
        >
          {currentFormat === 'hex' && hexInputField}
          {currentFormat === 'rgb' && rgbInputs}
          {currentFormat === 'hsl' && hslInputs}
        </Box>
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ColorInputPanelProps>;
if (process.env.NODE_ENV === 'development') {
  ColorInputPanel.displayName = 'ColorInputPanel';
}
