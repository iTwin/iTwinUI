/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ColorValue } from './ColorValue';

describe('ColorValue', () => {
  it('should properly handle RGB number values', () => {
    const cadetBlueRgb = ColorValue.create('#5f9ea0');
    const cadetBlueTbgr = ColorValue.fromTbgr(0xa09e5f);
    expect(cadetBlueRgb.toTbgr()).toEqual(cadetBlueTbgr.toTbgr());
    expect(cadetBlueRgb.equals(cadetBlueTbgr)).toBeTruthy();
  });

  it('should properly handle RgbColor values', () => {
    const cadetBlueRgb = ColorValue.create('#5f9ea0');
    const cadetBlueColor = ColorValue.create({ r: 95, g: 158, b: 160 });
    expect(cadetBlueRgb.equals(cadetBlueColor)).toBeTruthy();
  });

  it('should properly handle RgbaColor values', () => {
    const colorRgbNumber = ColorValue.create('#c8141480');
    const rgbColor = ColorValue.create({ r: 200, g: 20, b: 20, a: 0.5 });
    expect(colorRgbNumber.toRgbString()).toEqual(`rgb(200, 20, 20)`);
    expect(rgbColor.toRgbString()).toEqual(`rgb(200, 20, 20)`);
    expect(colorRgbNumber.toRgbString(true)).toEqual(`rgba(200, 20, 20, 0.5)`);
    expect(rgbColor.toRgbString(true)).toEqual(`rgba(200, 20, 20, 0.5)`);
  });

  it('should properly handle rgb string values', () => {
    const rgbColor = ColorValue.create(`rgb(200, 20, 20)`);
    expect(rgbColor.toRgbString()).toEqual(`rgb(200, 20, 20)`);
    expect(rgbColor.toRgbString(true)).toEqual(`rgba(200, 20, 20, 1)`);
  });

  it('should properly handle rgba string values', () => {
    const rgbColor = ColorValue.create(`rgb(200, 20, 20, 0.5)`);
    expect(rgbColor.toRgbString()).toEqual(`rgb(200, 20, 20)`);
    expect(rgbColor.toRgbString(true)).toEqual(`rgba(200, 20, 20, 0.5)`);
  });

  it('should properly handle HslString values', () => {
    const hslColor1 = ColorValue.create({ h: 10, s: 100, l: 50 });
    const hslColor = ColorValue.create(`hsl(10, 100%, 50%)`);
    expect(hslColor1.toHslString()).toEqual(`hsl(10, 100%, 50%)`);
    expect(hslColor.toHslString()).toEqual(`hsl(10, 100%, 50%)`);
    expect(hslColor.toHslString(true)).toEqual(`hsla(10, 100%, 50%, 1)`);
  });

  it('should properly handle HslColor values', () => {
    const hslColor = ColorValue.create({ h: 10, s: 100, l: 50 });
    expect(hslColor.toHslString()).toEqual(`hsl(10, 100%, 50%)`);
    const hslaColor = ColorValue.create({ h: 10, s: 100, l: 50, a: 0.5 });
    expect(hslaColor.toHslString(true)).toEqual(`hsla(10, 100%, 50%, 0.5)`);
  });

  it('should properly handle HexString values', () => {
    const colorHex = ColorValue.create('#5f9ea0');
    const colorHexString = ColorValue.create(`#5f9ea0`);
    expect(colorHex.equals(colorHexString)).toBeTruthy();
    expect(colorHex.toRgbString()).toEqual(`rgb(95, 158, 160)`);
  });

  it('should properly handle standard HexString values', () => {
    // White
    let colorHex = ColorValue.create(`#ffffff`);
    expect(colorHex.toRgbString()).toEqual(`rgb(255, 255, 255)`);

    // Black
    colorHex = ColorValue.create(`#000000`);
    expect(colorHex.toRgbString()).toEqual(`rgb(0, 0, 0)`);

    // Magenta
    colorHex = ColorValue.create(`#ff00ff`);
    expect(colorHex.toRgbString()).toEqual(`rgb(255, 0, 255)`);
  });

  it('should properly handle 3 character HexString values', () => {
    const colorHexString = ColorValue.create(`#ff0`);
    expect(colorHexString.toRgbString()).toEqual(`rgb(255, 255, 0)`);
  });

  it('should properly handle HexString values with alpha', () => {
    const colorRgba = ColorValue.create({ r: 95, g: 158, b: 160, a: 0.5 });
    const colorHex = ColorValue.create(`#5f9ea07f`);
    expect(colorHex.equals(colorRgba)).toBeTruthy();
    expect(colorHex.toRgbString(true)).toEqual(`rgba(95, 158, 160, 0.5)`);
    expect(colorHex.toHexString(true)).toEqual(`#5f9ea07f`);
  });

  it('should properly handle HsvColor values', () => {
    const inValue = { h: 10, s: 100, v: 100 };
    const inHsvColor = ColorValue.create(inValue);
    const outHsvColor = inHsvColor.toHsvColor();
    expect(outHsvColor.h).toEqual(inValue.h);
    expect(outHsvColor.s).toEqual(inValue.s);
    expect(outHsvColor.v).toEqual(inValue.v);
    expect(inHsvColor.toHsvString()).toEqual(`hsv(10, 100%, 100%)`);
    const hsvaColor = ColorValue.create({ h: 10, s: 100, v: 100, a: 0.5 });
    expect(hsvaColor.toHsvString(true)).toEqual(`hsva(10, 100%, 100%, 0.5)`);
  });
});
