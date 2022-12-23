/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  ColorPicker,
  ColorPickerProps,
  IconButton,
  ColorSwatch,
  Button,
  ButtonGroup,
  ColorValue,
  ColorPalette,
  ColorBuilder,
  ColorInputPanel,
} from '@itwin/itwinui-react';
import { Popover } from '@itwin/itwinui-react/esm/core/utils';
import { action } from '@storybook/addon-actions';
import { SvgSwap } from '@itwin/itwinui-icons-react';

export default {
  component: ColorPicker,
  subcomponents: { ColorBuilder, ColorPalette, ColorInputPanel, ColorSwatch },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    children: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  title: 'Core/ColorPicker',
} as Meta<ColorPickerProps>;

const ColorsList = [
  { color: '#ffffff', name: 'WHITE' },
  { color: '#5a6973', name: 'GREY' },
  { color: '#00121d', name: 'KURETAKE BLACK MANGA' },
  { color: '#002a44', name: 'RHAPSODY IN BLUE' },
  { color: '#00426b', name: 'DARK IMPERIAL BLUE' },
  { color: '#005a92', name: 'JETSKI RACE' },
  { color: '#0073ba', name: 'FRENCH BLUE' },
  { color: '#008be1', name: 'BLUE COLA' },
  { color: '#30b0ff', name: 'FANTASY CONSOLE SKY' },
  { color: '#58bfff', name: 'HELLO SUMMER' },
  { color: '#7fceff', name: 'CHROMIS DAMSEL BLUE' },
  { color: '#a6ddff', name: 'DROPLET' },
  { color: '#cdecff', name: 'LUCID DREAMS' },
  { color: '#e5f5fd', name: 'KODAMA WHITE' },
  { color: '#010200', name: 'REGISTRATION BLACK' },
  { color: '#122306', name: 'YUZU SOY' },
  { color: '#23450b', name: 'FOREST GREEN' },
  { color: '#346711', name: 'TATZELWURM GREEN' },
  { color: '#458816', name: 'CHLOROPHYLL' },
  { color: '#56aa1c', name: 'PLASTIC PINES' },
  { color: '#5fbb1f', name: 'FIELD GREEN' },
  { color: '#67cc22', name: 'GREEN HIGH' },
  { color: '#91e458', name: 'LILLIPUTIAN LIME' },
  { color: '#b2ec8b', name: 'GREEN DAY' },
  { color: '#d4f4bd', name: 'TEA GREEN' },
  { color: '#eef6e8', name: 'VERDE PASTEL' },
  { color: '#9ba5af', name: 'SERYI GREY' },
  { color: '#cf0000', name: 'RED EPIPHYLLUM' },
  { color: '#ff6300', name: 'SAFETY ORANGE' },
  { color: '#ffc335', name: 'RISE-N-SHINE' },
];

export const Basic: Story<ColorPickerProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeColor, setActiveColor] = React.useState(ColorsList[5]);
  const [colorName, setColorName] = React.useState(ColorsList[5].name);

  const onColorChanged = (color: ColorValue) => {
    const hexString = color.toHexString();
    const index = ColorsList.findIndex(
      (swatch) => swatch.color === hexString.toLowerCase(),
    );
    setActiveColor(ColorsList[index]);
    setColorName(ColorsList[index].name);
    action(`Selected ${ColorsList[index].color}`)();
  };

  return (
    <>
      <Popover
        content={
          <ColorPicker
            selectedColor={activeColor.color}
            {...args}
            onChangeComplete={onColorChanged}
          >
            <ColorPalette colors={ColorsList.map(({ color }) => color)} />
          </ColorPicker>
        }
        visible={isOpen}
        placement='bottom-start'
      >
        <IconButton onClick={() => setIsOpen((open) => !open)}>
          <ColorSwatch
            style={{ pointerEvents: 'none', margin: 0 }}
            color={activeColor.color}
          />
        </IconButton>
      </Popover>
      <span style={{ marginLeft: 16 }}>{colorName}</span>
    </>
  );
};
Basic.args = {};

export const Advanced: Story<ColorPickerProps> = (args) => {
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
    action(`Selected ${getDisplayString(color)}`)();
  };

  const getDisplayString = (color = selectedColor) => {
    switch (currentFormat) {
      case 'hsl':
        return color.toHslString();
      case 'rgb':
        return color.toRgbString();
      case 'hex':
        return color.toHexString().toUpperCase();
    }
  };

  return (
    <>
      <ButtonGroup>
        <Popover
          content={
            <ColorPicker
              selectedColor={selectedColor}
              {...args}
              onChangeComplete={onColorChanged}
            >
              <ColorBuilder />
              <ColorInputPanel defaultColorFormat={currentFormat} />
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
          <div style={{ width: 170 }}>
            {getDisplayString() ?? 'No color selected.'}
          </div>
        </Button>
      </ButtonGroup>
    </>
  );
};

Advanced.args = {};

export const WithAlpha: Story<ColorPickerProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<ColorValue>(
    ColorValue.create({ r: 90, g: 105, b: 115, a: 0.4 }),
  );

  const formats = ['hsl', 'rgb', 'hex'] as const;
  const [currentFormat, setCurrentFormat] = React.useState<
    typeof formats[number]
  >(formats[0]);

  const onColorChanged = (color: ColorValue) => {
    setSelectedColor(color);
    action(`Selected ${getDisplayString(color)}`)();
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
              {...args}
              onChangeComplete={onColorChanged}
              showAlpha={true}
            >
              <ColorBuilder />
              <ColorInputPanel defaultColorFormat={currentFormat} />
              <ColorPalette
                label='Saved Colors'
                colors={[
                  { r: 90, g: 105, b: 115, a: 1 },
                  { r: 90, g: 105, b: 115, a: 0.81 },
                  { r: 90, g: 105, b: 115, a: 0.4 },
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

WithAlpha.args = {};
