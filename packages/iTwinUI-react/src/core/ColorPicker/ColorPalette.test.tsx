/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ColorPalette } from './ColorPalette';
import { ColorPicker } from './ColorPicker';
import { IconButton } from '../Buttons';
import { ColorValue, SvgMore } from '../utils';

it('should render in its most basic state', () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];
  // required due to precision error going from hsl -> tbgr -> hsl
  const expectedStyleString = [
    'hsla(210, 11.2%, 65.1%, 1)',
    'hsla(95, 73.2%, 16.1%, 1)',
    'hsla(203, 100%, 6.1%, 1)',
    'hsla(203, 100%, 12.9%, 1)',
  ];

  const { container } = render(
    <ColorPicker>
      <ColorPalette colors={colors} />
    </ColorPicker>,
  );

  const palette = container.querySelector('.iui-color-palette') as HTMLElement;

  palette.querySelectorAll('.iui-color-swatch').forEach((swatch, index) => {
    expect(swatch).toHaveStyle(
      `--iui-color-swatch-background: ${expectedStyleString[index]}`,
    );
    expect(swatch).toHaveAttribute('tabindex', index === 0 ? '0' : '-1');
  });
});

it('should render with selectedColor', () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];
  // required due to precision error going from hsl -> tbgr -> hsl
  const expectedStyleString = [
    'hsla(210, 11.2%, 65.1%, 1)',
    'hsla(95, 73.2%, 16.1%, 1)',
    'hsla(203, 100%, 6.1%, 1)',
    'hsla(203, 100%, 12.9%, 1)',
  ];

  const { container } = render(
    <ColorPicker selectedColor={colors[1]}>
      <ColorPalette colors={colors} />
    </ColorPicker>,
  );

  const palette = container.querySelector('.iui-color-palette') as HTMLElement;

  palette.querySelectorAll('.iui-color-swatch').forEach((swatch, index) => {
    expect(swatch).toHaveStyle(
      `--iui-color-swatch-background: ${expectedStyleString[index]}`,
    );
    if (index === 1) {
      expect(swatch).toHaveClass('iui-active');
      expect(swatch).toHaveAttribute('tabindex', '0');
    } else {
      expect(swatch).not.toHaveClass('iui-active');
      expect(swatch).toHaveAttribute('tabindex', '-1');
    }
  });
});

it('should render with selectedColor 0', () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];
  // required due to precision error going from hsl -> tbgr -> hsl
  const expectedStyleString = [
    'hsla(210, 11.2%, 65.1%, 1)',
    'hsla(95, 73.2%, 16.1%, 1)',
    'hsla(203, 100%, 6.1%, 1)',
    'hsla(203, 100%, 12.9%, 1)',
  ];

  const { container } = render(
    <ColorPicker selectedColor={colors[0]}>
      <ColorPalette colors={colors} />
    </ColorPicker>,
  );

  const palette = container.querySelector('.iui-color-palette') as HTMLElement;

  palette.querySelectorAll('.iui-color-swatch').forEach((swatch, index) => {
    expect(swatch).toHaveStyle(
      `--iui-color-swatch-background: ${expectedStyleString[index]}`,
    );
    if (index === 0) {
      expect(swatch).toHaveClass('iui-active');
      expect(swatch).toHaveAttribute('tabindex', '0');
    } else {
      expect(swatch).not.toHaveClass('iui-active');
      expect(swatch).toHaveAttribute('tabindex', '-1');
    }
  });
});

it('should handle keyboard navigation on color swatches', () => {
  const onColorClick = jest.fn();

  const colorsList = [
    ColorValue.create('#FFFFFF'),
    ColorValue.create('#5A6973'),
    ColorValue.create('#002A44'),
    ColorValue.create('#00426B'),
    ColorValue.create('#005A92'),
    ColorValue.create('#0073BA'),
    ColorValue.create('#30B0FF'),
    ColorValue.create('#58BFFF'),
    ColorValue.create('#7FCEFF'),
    ColorValue.create('#A6DDFF'),
    ColorValue.create('#00121D'),
    ColorValue.create('#CDECFF'),
    ColorValue.create('#E5F5FD'),
    ColorValue.create('#010200'),
  ];

  const { container } = render(
    <ColorPicker selectedColor={colorsList[10]} onChangeComplete={onColorClick}>
      <ColorPalette colors={colorsList} />
    </ColorPicker>,
  );

  const colorPalette = container.querySelector(
    `.iui-color-palette`,
  ) as HTMLElement;
  expect(colorPalette).toBeTruthy();

  const colorSwatches = Array.from<HTMLElement>(
    colorPalette.querySelectorAll('.iui-color-swatch'),
  );
  expect(colorSwatches).toHaveLength(colorsList.length);

  colorSwatches[10].focus();

  // Go Down
  fireEvent.keyDown(colorPalette, { key: 'ArrowDown' });

  colorSwatches.forEach((item, index) => {
    expect(document.activeElement === item).toBe(11 === index);
  });

  // Go Up
  fireEvent.keyDown(colorPalette, { key: 'ArrowUp' });

  colorSwatches.forEach((item, index) => {
    expect(document.activeElement === item).toBe(10 === index);
  });

  // Go Left
  fireEvent.keyDown(colorPalette, { key: 'ArrowLeft' });

  colorSwatches.forEach((item, index) => {
    expect(document.activeElement === item).toBe(9 === index);
  });

  // Go Right
  fireEvent.keyDown(colorPalette, { key: 'ArrowRight' });

  colorSwatches.forEach((item, index) => {
    expect(document.activeElement === item).toBe(10 === index);
  });

  // Go right and select with enter
  fireEvent.keyDown(colorPalette, { key: 'ArrowRight' });
  fireEvent.keyDown(colorPalette, { key: 'Enter' });
  expect(onColorClick).toHaveBeenCalledTimes(1);
  expect(colorSwatches[11]).toHaveFocus();

  // Go right and select with space
  fireEvent.keyDown(colorPalette, { key: 'ArrowRight' });
  fireEvent.keyDown(colorPalette, { key: ' ' });
  expect(onColorClick).toHaveBeenCalledTimes(2);
  expect(colorSwatches[12]).toHaveFocus();
});

it('should propagate misc props correctly', () => {
  const colors = ['#9ba5af', '#23450b', '#00121d', '#002a44'];

  const { container } = render(
    <ColorPicker>
      <ColorPalette className='test-class' style={{ overflow: 'auto' }}>
        <IconButton className='custom-child'>
          <SvgMore />
        </IconButton>
      </ColorPalette>
    </ColorPicker>,
  );

  const paletteWrapper = container.querySelector('.iui-color-palette-wrapper');
  expect(paletteWrapper).toHaveClass('test-class');
  expect(paletteWrapper).toHaveStyle('overflow: auto');

  const palette = paletteWrapper?.querySelector(
    '.iui-color-palette',
  ) as HTMLElement;

  Array.from(palette.children).forEach((child, index) => {
    if (index === 0) {
      expect(child).toHaveClass('custom-child');
      expect(child).toHaveAttribute('tabindex', '0');
    } else {
      expect(child).toHaveStyle(
        `--iui-color-swatch-background: ${colors[index + 1]}`,
      );
      expect(child).toHaveAttribute('tabindex', '-1');
    }
  });
});
