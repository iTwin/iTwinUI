/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { ColorPalette } from './ColorPalette.js';
import { ColorPicker } from './ColorPicker.js';
import { IconButton } from '../Buttons/IconButton.js';
import { SvgMore } from '../../utils/index.js';

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
  });
});

it('should pass custom label with props', () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];

  const { container } = render(
    <ColorPicker>
      <ColorPalette
        label='Saved colors'
        labelProps={{
          className: 'test-picker-label',
          style: { fontSize: '16px', color: 'red' },
        }}
        colors={colors}
      />
    </ColorPicker>,
  );

  const paletteLabel = container.querySelector(
    '.iui-color-picker-section-label.test-picker-label',
  ) as HTMLElement;

  expect(paletteLabel).toBeTruthy();
  expect(paletteLabel.style.color).toBe('red');
  expect(paletteLabel.style.fontSize).toBe('16px');
});

it('should pass color palette with props', () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];

  const { container } = render(
    <ColorPicker>
      <ColorPalette
        label='Saved colors'
        paletteProps={{ className: 'test-palette', style: { gap: '10px' } }}
        colors={colors}
      />
    </ColorPicker>,
  );

  const palette = container.querySelector(
    '.iui-color-palette.test-palette',
  ) as HTMLElement;

  expect(palette).toBeTruthy();
  expect(palette.style.gap).toBe('10px');
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
      expect(swatch).toHaveAttribute('aria-pressed', 'true');
    } else {
      expect(swatch).not.toHaveClass('iui-active');
      expect(swatch).not.toHaveAttribute('aria-pressed');
    }
  });
});

it('should propagate misc props correctly', () => {
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
});
