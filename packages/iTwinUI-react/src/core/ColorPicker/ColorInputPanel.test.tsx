/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';
import { ColorInputPanel } from './ColorInputPanel';
import { ColorValue } from '../utils';
import userEvent from '@testing-library/user-event';

it('should render ColorInputPanel with input fields', async () => {
  const { container } = render(
    <ColorPicker>
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  expect(container.querySelector('.iui-color-input')).toBeTruthy();
  expect(container.querySelector('.iui-color-input-fields')).toBeTruthy();
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);

  const swapButton = container.querySelector(
    '.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(swapButton).toBeTruthy();

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HSL');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(3);

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('RGB');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(3);

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HEX');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);
});

it('should render ColorInputPanel with input fields with alpha', async () => {
  const { container } = render(
    <ColorPicker showAlpha={true}>
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  expect(container.querySelector('.iui-color-input')).toBeTruthy();
  expect(container.querySelector('.iui-color-input-fields')).toBeTruthy();
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);

  const swapButton = container.querySelector(
    '.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(swapButton).toBeTruthy();

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HSLA');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(4);

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('RGBA');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(4);

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HEX');
  expect(container.querySelectorAll('.iui-input-container').length).toBe(1);
});

it('should only show allowed color formats on input panel', async () => {
  const { container } = render(
    <ColorPicker>
      <ColorInputPanel
        defaultColorFormat='hex'
        allowedColorFormats={['hex', 'hsl']}
      />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  const swapButton = container.querySelector(
    '.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(swapButton).toBeTruthy();

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HSL');

  await userEvent.click(swapButton);
  expect(element.textContent).toBe('HEX');
});

it('should not show swap button if only 1 color format allowed on input panel', () => {
  const { container } = render(
    <ColorPicker>
      <ColorInputPanel defaultColorFormat='hex' allowedColorFormats={['hex']} />
    </ColorPicker>,
  );

  expect(
    container.querySelectorAll(`.iui-color-picker-section-label`).length,
  ).toBe(1);
  const element = container.querySelectorAll(
    `.iui-color-picker-section-label`,
  )[0];
  expect(element).toBeDefined();
  expect(element?.textContent).toBe('HEX');

  const swapButton = container.querySelector(
    '.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(swapButton).toBeFalsy();
});

it('should handle hex input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange} showAlpha={true}>
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  const input = container.querySelectorAll('input')[0] as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '#FF6200' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  // Should handle hex input with alpha value
  fireEvent.change(input, { target: { value: '#5A6973CF' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  // Should not update with invalid input
  fireEvent.change(input, { target: { value: '#A' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  // Should not update with keys other than Enter
  fireEvent.change(input, { target: { value: '#A' } });
  fireEvent.keyDown(input, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  // Should update even if # was not typed in
  fireEvent.change(input, { target: { value: '5A697366' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  // Should not update with same value
  fireEvent.change(input, { target: { value: '#5a697366' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should handle hsl input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange} showAlpha={true}>
      <ColorInputPanel defaultColorFormat='hsl' />
    </ColorPicker>,
  );

  const h = container.querySelectorAll('input')[0] as HTMLInputElement;
  const s = container.querySelectorAll('input')[1] as HTMLInputElement;
  const l = container.querySelectorAll('input')[2] as HTMLInputElement;
  const a = container.querySelectorAll('input')[3] as HTMLInputElement;
  expect(h).toBeTruthy();
  expect(s).toBeTruthy();
  expect(l).toBeTruthy();
  expect(a).toBeTruthy();

  // Should not update if value hasn't changed
  fireEvent.change(h, { target: { value: '0' } });
  fireEvent.keyDown(h, { key: 'Enter' });

  fireEvent.change(s, { target: { value: '0' } });
  fireEvent.keyDown(s, { key: 'Enter' });

  fireEvent.change(l, { target: { value: '0' } });
  fireEvent.keyDown(l, { key: 'Enter' });

  fireEvent.change(a, { target: { value: '1' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).not.toHaveBeenCalled();

  // Should call handleOnChange
  fireEvent.change(h, { target: { value: '100' } });
  fireEvent.keyDown(h, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  fireEvent.change(s, { target: { value: '50' } });
  fireEvent.keyDown(s, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  fireEvent.change(l, { target: { value: '50' } });
  fireEvent.keyDown(l, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(a, { target: { value: '.50' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  // Should not update with invalid input
  fireEvent.change(h, { target: { value: '-1' } });
  fireEvent.keyDown(h, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(s, { target: { value: '101' } });
  fireEvent.keyDown(s, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(l, { target: { value: '5000' } });
  fireEvent.keyDown(l, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(a, { target: { value: '2' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  // Should not update with keys other than Enter
  fireEvent.keyDown(h, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(s, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(l, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(a, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);
});

it('should handle rgb input change', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange} showAlpha={true}>
      <ColorInputPanel defaultColorFormat='rgb' />
    </ColorPicker>,
  );

  const r = container.querySelectorAll('input')[0] as HTMLInputElement;
  const g = container.querySelectorAll('input')[1] as HTMLInputElement;
  const b = container.querySelectorAll('input')[2] as HTMLInputElement;
  const a = container.querySelectorAll('input')[3] as HTMLInputElement;
  expect(r).toBeTruthy();
  expect(g).toBeTruthy();
  expect(b).toBeTruthy();
  expect(a).toBeTruthy();

  // Should not update if value hasn't changed
  fireEvent.change(r, { target: { value: '0' } });
  fireEvent.keyDown(r, { key: 'Enter' });

  fireEvent.change(g, { target: { value: '0' } });
  fireEvent.keyDown(g, { key: 'Enter' });

  fireEvent.change(b, { target: { value: '0' } });
  fireEvent.keyDown(b, { key: 'Enter' });

  fireEvent.change(a, { target: { value: '1' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).not.toHaveBeenCalled;

  // Should call handleOnChange
  fireEvent.change(r, { target: { value: '100' } });
  fireEvent.keyDown(r, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(1);

  fireEvent.change(g, { target: { value: '50' } });
  fireEvent.keyDown(g, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  fireEvent.change(b, { target: { value: '50' } });
  fireEvent.keyDown(b, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(3);

  fireEvent.change(a, { target: { value: '.51' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  // Should not update with invalid input
  fireEvent.change(r, { target: { value: '-1' } });
  fireEvent.keyDown(r, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(g, { target: { value: '256' } });
  fireEvent.keyDown(g, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(b, { target: { value: '5000' } });
  fireEvent.keyDown(b, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.change(a, { target: { value: '2' } });
  fireEvent.keyDown(a, { key: 'Enter' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  // Should not update with keys other than Enter
  fireEvent.keyDown(r, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(g, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(b, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);

  fireEvent.keyDown(a, { key: ' ' });
  expect(handleOnChange).toHaveBeenCalledTimes(4);
});

it('should handle hex input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange}>
      <ColorInputPanel defaultColorFormat='hex' />
    </ColorPicker>,
  );

  const input = container.querySelectorAll('input')[0] as HTMLInputElement;
  expect(input).toBeTruthy();
  act(() => {
    input.focus();
    fireEvent.change(input, { target: { value: '#FF6200' } });
    input.blur();
  });
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should NOT handle hsl input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange} showAlpha={true}>
      <ColorInputPanel defaultColorFormat='hsl' />
    </ColorPicker>,
  );

  const h = container.querySelectorAll('input')[0] as HTMLInputElement;
  const s = container.querySelectorAll('input')[1] as HTMLInputElement;
  const l = container.querySelectorAll('input')[2] as HTMLInputElement;
  const a = container.querySelectorAll('input')[3] as HTMLInputElement;
  expect(h).toBeTruthy();
  expect(s).toBeTruthy();
  expect(l).toBeTruthy();
  expect(a).toBeTruthy();

  act(() => {
    h.focus();
    fireEvent.change(h, { target: { value: '100' } });
    s.focus();
    fireEvent.change(s, { target: { value: '50' } });
    l.focus();
    fireEvent.change(l, { target: { value: '50' } });
    a.focus();
    fireEvent.change(a, { target: { value: '.50' } });
    a.blur();
  });
  const hslColorValue = ColorValue.create({ h: 100, s: 50, l: 50, a: 0.5 });
  expect(handleOnChange).toHaveBeenCalledWith(hslColorValue);
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should NOT handle rgb input change with lose focus', () => {
  const handleOnChange = jest.fn();

  const { container } = render(
    <ColorPicker onChangeComplete={handleOnChange} showAlpha={true}>
      <ColorInputPanel defaultColorFormat='rgb' />
    </ColorPicker>,
  );

  const r = container.querySelectorAll('input')[0] as HTMLInputElement;
  const g = container.querySelectorAll('input')[1] as HTMLInputElement;
  const b = container.querySelectorAll('input')[2] as HTMLInputElement;
  const a = container.querySelectorAll('input')[3] as HTMLInputElement;
  expect(r).toBeTruthy();
  expect(g).toBeTruthy();
  expect(b).toBeTruthy();
  expect(a).toBeTruthy();

  act(() => {
    r.focus();
    fireEvent.change(r, { target: { value: '100' } });
    g.focus();
    fireEvent.change(g, { target: { value: '50' } });
    b.focus();
    fireEvent.change(b, { target: { value: '50' } });
    a.focus();
    fireEvent.change(a, { target: { value: '.50' } });
    a.blur();
  });
  expect(handleOnChange).toHaveBeenCalledTimes(1);
});

it('should handle hex input when alpha is false', () => {
  const handleOnChange = jest.fn();
  const selectedColor = ColorValue.create({ h: 0, s: 100, l: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={false}
      onChangeComplete={handleOnChange}
      selectedColor={selectedColor}
    >
      <ColorInputPanel defaultColorFormat={'hex'} />
    </ColorPicker>,
  );

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(1);
  const input = inputs[0] as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: '#FF6200' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  const hexColorValue = ColorValue.create('#FF6200');
  expect(handleOnChange).toHaveBeenCalledWith(hexColorValue);
});

it('should handle hsl input when alpha is false', () => {
  const handleOnChange = jest.fn();
  const selectedColor = ColorValue.create({ h: 0, s: 100, l: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={false}
      onChangeComplete={handleOnChange}
      selectedColor={selectedColor}
    >
      <ColorInputPanel defaultColorFormat={'hsl'} />
    </ColorPicker>,
  );

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(3);
  const input = inputs[0] as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: '100' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(handleOnChange).toHaveBeenCalledWith(
    ColorValue.create({ h: 100, s: 100, l: 50 }),
  );
});

it('should handle rgb input when alpha is false', () => {
  const handleOnChange = jest.fn();
  const selectedColor = ColorValue.create({ h: 0, s: 100, l: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={false}
      onChangeComplete={handleOnChange}
      selectedColor={selectedColor}
    >
      <ColorInputPanel defaultColorFormat={'rgb'} />
    </ColorPicker>,
  );

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(3);
  const input = inputs[0] as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: '41' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  const rgbColorValue = ColorValue.create({ r: 41, g: 0, b: 0 });
  expect(handleOnChange).toHaveBeenCalledWith(rgbColorValue);
});

it('should handle rgb input without any side effects', () => {
  const handleOnChange = jest.fn();
  const selectedColor = ColorValue.create({ r: 0, g: 100, b: 50 });
  const { container } = render(
    <ColorPicker
      showAlpha={false}
      onChangeComplete={handleOnChange}
      selectedColor={selectedColor}
    >
      <ColorInputPanel defaultColorFormat={'rgb'} />
    </ColorPicker>,
  );

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(3);
  const input = inputs[0] as HTMLInputElement;
  expect(input).toBeTruthy();

  fireEvent.change(input, { target: { value: '41' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  const rgbColorValue = ColorValue.create({ r: 41, g: 100, b: 50 });
  expect(handleOnChange).toHaveBeenCalledWith(rgbColorValue);
});
