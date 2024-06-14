/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import { getColorValue, ColorPicker } from './ColorPicker.js';
import { ColorPalette } from './ColorPalette.js';
import { ColorBuilder } from './ColorBuilder.js';
import { ColorInputPanel } from './ColorInputPanel.js';
import { ColorValue } from '../../utils/index.js';

it('should convert color list to ColorValues', () => {
  ['#9BA5AF', '#23450b', '#00121D', '#002A44'].forEach((value) => {
    const color = getColorValue(value);
    expect(color.toHexString()).toEqual(value.toLowerCase());
  });
});

it('should render in its most basic state', () => {
  const { container } = render(
    <ColorPicker>
      <ColorPalette colors={['#9BA5AF', '#23450b', '#00121D', '#002A44']} />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();
  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(4);
});

it('should add className and style correctly', () => {
  const { container } = render(
    <ColorPicker className='test-class' style={{ width: '100px' }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  const swatch = container.querySelector(
    '.iui-color-picker.test-class',
  ) as HTMLElement;
  expect(swatch).toBeTruthy();
  expect(swatch).toHaveStyle('width: 100px');
});

it('should render advanced color picker with no color swatches', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-selection-wrapper`)).toBeTruthy();
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');
  expect(container.querySelector(`.iui-color-palette`)).toBeFalsy();
  expect(container.querySelector(`.iui-color-field`)).toBeTruthy();
  expect(container.querySelector(`.iui-hue-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-dot`)).toBeTruthy();
  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(0);
});

it('should render advanced color picker with color swatches and no title', () => {
  const { container } = render(
    <ColorPicker>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hex' />
      <ColorPalette colors={['#FFFFFF']} />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-selection-wrapper`)).toBeTruthy();
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`)[0]
      .textContent,
  ).toBe('HEX');
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-field`)).toBeTruthy();
  expect(container.querySelector(`.iui-hue-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-dot`)).toBeTruthy();

  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(1);
});

it('should render color picker with color palette title', () => {
  const { container } = render(
    <ColorPicker>
      <ColorPalette colors={['#FFFFFF']} label='Test Title' />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(
    container.querySelector(`.iui-color-picker-section-label`),
  ).toBeTruthy();
  expect(container.querySelector(`.iui-color-palette`)).toBeTruthy();

  expect(container.querySelectorAll(`.iui-color-swatch`).length).toBe(1);
  expect(
    container.querySelector(`.iui-color-picker-section-label`)?.textContent,
  ).toEqual('Test Title');
});

it('should set the selected color', () => {
  const { container } = render(
    <ColorPicker selectedColor={{ h: 42, s: 100, l: 50 }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  //Set the correct square color
  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder).toHaveStyle(
    '--iui-color-field-hue: #ffb300; --iui-color-picker-selected-color: #ffb300',
  );
});

it('should set the dot positions', () => {
  const { container } = render(
    <ColorPicker
      selectedColor={{ h: 42, s: 100, l: 50, a: 0.8 }}
      showAlpha={true}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  //Set the correct position on color square
  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('100% auto');

  // Set the correct position on the slider
  const sliderDot = container.querySelectorAll(
    '.iui-slider-thumb',
  )[0] as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot).toHaveStyle(
    '--iui-slider-thumb-position: 11.699164345403899%',
  );
  // Set the correct position on the opacity slider
  const opacityDot = container.querySelectorAll(
    '.iui-slider-thumb',
  )[1] as HTMLElement;
  expect(opacityDot).toBeTruthy();
  expect(opacityDot).toHaveStyle('--iui-slider-thumb-position: 80%');
});

it('should handle arrow key navigation on hue slider dot', () => {
  const onSelectionChanged = vi.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={onSelectionChanged}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder).toHaveStyle(
    '--iui-color-field-hue: #ff0000; --iui-color-picker-selected-color: #ff0000',
  );

  const sliderDot = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot).toHaveStyle('--iui-slider-thumb-position: 0%');

  // Go right
  fireEvent.keyDown(sliderDot, { key: 'ArrowRight' });
  fireEvent.keyDown(sliderDot, { key: 'ArrowRight' });
  fireEvent.keyUp(sliderDot, { key: 'ArrowRight' }); // Releasing keyboard triggers calling onChangeCompleted
  expect(onSelectionChanged).toHaveBeenCalledTimes(1);
  expect(sliderDot).toHaveStyle(
    '--iui-slider-thumb-position: 0.5571030640668524%',
  );
  expect(colorBuilder).toHaveStyle('--iui-color-field-hue: #ff0800');

  // Go left
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  fireEvent.keyUp(sliderDot, { key: 'ArrowLeft' });
  expect(onSelectionChanged).toHaveBeenCalledTimes(2);
  expect(sliderDot).toHaveStyle(
    '--iui-slider-thumb-position: 0.2785515320334262%',
  );
  expect(colorBuilder).toHaveStyle('--iui-color-field-hue: #ff0400');

  // Go left to edge
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  expect(sliderDot).toHaveStyle('--iui-slider-thumb-position: 0%');
  fireEvent.keyDown(sliderDot, { key: 'ArrowLeft' });
  expect(sliderDot).toHaveStyle('--iui-slider-thumb-position: 0%');
});

it('should handle arrow key navigation on color dot', () => {
  const onChange = vi.fn();
  const onChangeComplete = vi.fn();

  const { container } = render(
    <ColorPicker
      onChange={onChange}
      onChangeComplete={onChangeComplete}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;

  expect(colorBuilder).toHaveStyle(
    '--iui-color-field-hue: #ff0000; --iui-color-picker-selected-color: #ff0000',
  );

  const sliderDot = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(sliderDot).toBeTruthy();
  expect(sliderDot).toHaveStyle('--iui-slider-thumb-position: 0%');

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('100% auto');

  // Go down
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChangeComplete).not.toHaveBeenCalled();
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('2% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('100% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #fa0000',
  );
  fireEvent.keyUp(colorDot, { key: 'ArrowDown' });
  expect(onChangeComplete).toHaveBeenCalledTimes(1);

  // Go left
  fireEvent.keyDown(colorDot, { key: 'ArrowLeft' });
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('2% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('99% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #fa0202',
  );

  fireEvent.keyUp(colorDot, { key: 'ArrowLeft' });
  expect(onChangeComplete).toHaveBeenCalledTimes(2);

  // Go up to top
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('99% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #ff0303',
  );

  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('99% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #ff0303',
  );
  fireEvent.keyUp(colorDot, { key: 'ArrowUp' });
  expect(onChangeComplete).toHaveBeenCalledTimes(3);

  // Go right to the edge
  fireEvent.keyDown(colorDot, { key: 'ArrowRight' });
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('100% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #ff0000',
  );
  fireEvent.keyUp(colorDot, { key: 'ArrowRight' });
  expect(onChangeComplete).toHaveBeenCalledTimes(4);

  // Go up
  fireEvent.keyDown(colorDot, { key: 'ArrowUp' });
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('0% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('100% auto');
  expect(colorBuilder).toHaveStyle(
    '--iui-color-picker-selected-color: #ff0000',
  );
  fireEvent.keyUp(colorDot, { key: 'ArrowUp' });
  expect(onChangeComplete).toHaveBeenCalledTimes(5);
});

it('should call onChange and onChangeComplete from hueSlider', () => {
  const handleOnUpdate = vi.fn();
  const handleOnChange = vi.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={handleOnChange}
      onChange={handleOnUpdate}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;

  fireEvent.pointerDown(thumb, {
    pointerId: 5,
    buttons: 1,
    clientX: 210,
  });

  fireEvent.pointerMove(sliderContainer, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);

  fireEvent.pointerUp(sliderContainer, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });

  expect(handleOnChange).toHaveBeenCalledTimes(2);
});

it('should handle pointer down/move/up from color square', () => {
  const handleOnUpdate = vi.fn();
  const handleOnChange = vi.fn();

  const { container } = render(
    <ColorPicker
      onChangeComplete={handleOnChange}
      onChange={handleOnUpdate}
      selectedColor={{ h: 0, s: 100, l: 50 }}
    >
      <ColorBuilder />
      <ColorPalette colors={[{ h: 0, s: 100, l: 50 }]} />
    </ColorPicker>,
  );

  const colorPicker = container.querySelector(
    '.iui-color-picker',
  ) as HTMLElement;
  expect(colorPicker).toBeTruthy();

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();

  fireEvent.pointerDown(colorDot, {
    pointerId: 5,
    buttons: 1,
    clientX: 210,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);
  expect(handleOnChange).toHaveBeenCalledTimes(0);
  expect(document.activeElement).toBe(colorDot);

  fireEvent.pointerMove(colorPicker.ownerDocument, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  fireEvent.pointerUp(colorPicker.ownerDocument, {
    pointerId: 5,
    buttons: 1,
    clientX: 410,
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should preserve hue when color dot is black/at bottom of square', () => {
  const { container } = render(
    <ColorPicker selectedColor={{ h: 140, s: 60, l: 1 }}>
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(
    colorBuilder.style.getPropertyValue('--iui-color-picker-selected-color'),
  ).toBe('#010402');
  expect(colorBuilder.style.getPropertyValue('--iui-color-field-hue')).toBe(
    '#00ff55',
  );

  const colorDot = container.querySelector('.iui-color-dot') as HTMLElement;
  expect(colorDot).toBeTruthy();
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('98.4% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('75% auto');

  // Go to bottom of square and hue should be preserved
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  fireEvent.keyDown(colorDot, { key: 'ArrowDown' });
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-block'),
  ).toEqual('100% auto');
  expect(
    colorDot.style.getPropertyValue('--iui-color-dot-inset-inline'),
  ).toEqual('75% auto');
  expect(colorBuilder.style.getPropertyValue('--iui-color-field-hue')).toBe(
    '#00ff55',
  );
});

it('should render advanced color picker with opacity slider', () => {
  const { container } = render(
    <ColorPicker showAlpha={true}>
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat='hsl' />
    </ColorPicker>,
  );

  expect(container.querySelector(`.iui-color-picker`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-selection-wrapper`)).toBeTruthy();
  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HSLA');
  expect(container.querySelector(`.iui-color-field`)).toBeTruthy();
  expect(container.querySelector(`.iui-hue-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-opacity-slider`)).toBeTruthy();
  expect(container.querySelector(`.iui-color-dot`)).toBeTruthy();
  expect(container.querySelectorAll('input').length).toBe(4);
});

it('should handle arrow key navigation on opacity slider dot', () => {
  const onSelectionChanged = vi.fn();
  const selectedColor = ColorValue.create({ h: 0, s: 100, l: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={true}
      onChangeComplete={onSelectionChanged}
      selectedColor={selectedColor}
    >
      <ColorBuilder />
    </ColorPicker>,
  );

  const colorBuilder = container.querySelector(
    '.iui-color-picker .iui-color-field',
  ) as HTMLElement;
  expect(colorBuilder).toHaveStyle(
    '--iui-color-field-hue: #ff0000; --iui-color-picker-selected-color: #ff0000',
  );

  const opacityDot = container.querySelectorAll(
    '.iui-slider-thumb',
  )[1] as HTMLElement;
  expect(opacityDot).toBeTruthy();
  expect(opacityDot).toHaveStyle('--iui-slider-thumb-position: 100%');

  // Go left
  fireEvent.keyDown(opacityDot, { key: 'ArrowLeft' });
  fireEvent.keyUp(opacityDot, { key: 'ArrowLeft' }); // Releasing keyboard triggers calling onChangeCompleted
  expect(onSelectionChanged).toHaveBeenNthCalledWith(
    1,
    ColorValue.create({ h: 0, s: 100, l: 50, a: 0.99 }),
  );
  expect(opacityDot).toHaveStyle('--iui-slider-thumb-position: 99%');

  // Go right
  fireEvent.keyDown(opacityDot, { key: 'ArrowRight' });
  fireEvent.keyUp(opacityDot, { key: 'ArrowRight' }); // Releasing keyboard triggers calling onChangeCompleted
  expect(onSelectionChanged).toHaveBeenNthCalledWith(
    2,
    ColorValue.create({ h: 0, s: 100, l: 50, a: 1 }),
  );
  expect(opacityDot).toHaveStyle('--iui-slider-thumb-position: 100%');
});

it('should render color picker and handle onChangeCompleted when alpha is false', () => {
  const handleOnChange = vi.fn();
  const selectedColor = ColorValue.create({ h: 0, s: 100, l: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={false}
      onChangeComplete={handleOnChange}
      selectedColor={selectedColor}
    >
      <ColorBuilder />
      <ColorInputPanel defaultColorFormat={'hex'} />
    </ColorPicker>,
  );

  expect(
    container.querySelector('.iui-color-picker .iui-color-field'),
  ).toHaveStyle(
    '--iui-color-field-hue: #ff0000; --iui-color-picker-selected-color: #ff0000',
  );
  expect(container.querySelector('.iui-hue-slider')).toBeTruthy();
  expect(container.querySelector('.iui-opacity-slider')).toBeFalsy();
  expect(container.querySelector('.iui-color-input-wrapper')).toBeTruthy();

  // Should only have hue slider thumb
  const sliderThumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(sliderThumbs.length).toEqual(1);

  const sliderDot = sliderThumbs[0] as HTMLElement;
  expect(sliderDot).toBeTruthy();

  // Should handle hue slider change
  fireEvent.keyDown(sliderDot, { key: 'ArrowRight' });
  fireEvent.keyUp(sliderDot, { key: 'ArrowRight' }); // Releasing keyboard triggers calling onChangeCompleted
  expect(handleOnChange).toHaveBeenCalledWith(
    ColorValue.create({ h: 1, s: 100, l: 50 }),
  );
});

it.each([true, false])('should respect `applyBackground`', (value) => {
  const { container } = render(
    <ColorPicker applyBackground={value}>blah</ColorPicker>,
  );
  if (value) {
    expect(container.querySelector('div')).toHaveClass('iui-popover-surface');
  } else {
    expect(container.querySelector('div')).not.toHaveClass(
      'iui-popover-surface',
    );
  }
});
