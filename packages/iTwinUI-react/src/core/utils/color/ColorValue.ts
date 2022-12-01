/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getBoundedValue } from '../functions/numbers';

// portions adapted from Three.js Copyright © 2010-2017 three.js authors

const scratchBytes = new Uint8Array(4);
const scratchUInt32 = new Uint32Array(scratchBytes.buffer);

/**
 * A color defined by Red, Green, and Blue
 */
export type RgbColor = {
  /** 0-255 */
  r: number;
  /** 0-255 */
  g: number;
  /** 0-255 */
  b: number;
  /** 0-1 */
  a?: number;
};

/**
 * A color defined by Hue, Saturation, and Lightness.
 */
export type HslColor = {
  /** 0-360 */
  h: number;
  /** 0-100 */
  s: number;
  /** 0-100 */
  l: number;
  /** 0-1 */
  a?: number;
};

/**
 * A color defined by Hue, Saturation, and Value
 */
export type HsvColor = {
  /** 0-360 */
  h: number;
  /** 0-100 */
  s: number;
  /** 0-100 */
  v: number;
  /** 0-1 */
  a?: number;
};

/**
 * All supported color specifications.
 */
export type ColorType = string | RgbColor | HslColor | HsvColor;

/**
 * isRgbValue type guard.
 */
export const isRgbColor = (value: ColorType): value is RgbColor => {
  return (
    typeof value !== 'string' && 'r' in value && 'g' in value && 'b' in value
  );
};

/**
 * isHslValue type guard.
 */
export const isHslColor = (value: ColorType): value is HslColor => {
  return (
    typeof value !== 'string' && 'h' in value && 's' in value && 'l' in value
  );
};

/**
 * isHsvValue type guard.
 */
export const isHsvColor = (value: ColorType): value is HsvColor => {
  return (
    typeof value !== 'string' && 'h' in value && 's' in value && 'v' in value
  );
};

/**
 * An immutable integer representation of a color.
 *
 * Colors are stored as 4 components: Red, Blue, Green, and Transparency (0=fully opaque). Each is an 8-bit integer between 0-255.
 * ColorValue uses `0xTTBBGGRR` (red in the low byte. 0==fully opaque in high byte) internally, but it also provides methods
 * to return colors in popular web formats.
 *
 * The `create` method accepts any ColorType format.
 *
 * @public
 */
export class ColorValue {
  private readonly _tbgr: number;

  /** hue value provided by user */
  private readonly _hue?: number;

  private constructor(tbgr: number, hue?: number) {
    scratchUInt32[0] = tbgr; // Force to be a 32-bit unsigned integer
    this._tbgr = scratchUInt32[0];
    this._hue = hue;
  }

  /**
   * Create a new ColorValue.
   * @param val value to use.
   *
   * If a string, must be in one of the following forms:
   * *"rgb(255,0,0)"*
   * *"rgba(255,0,0,.2)"*
   * *"rgb(100%,0%,0%)"*
   * *"hsl(120,50%,50%)"*
   * *"#rrggbb"*
   */
  public static create(val?: ColorType): ColorValue {
    if (!val) {
      return ColorValue.fromTbgr(0);
    }

    if (isRgbColor(val)) {
      return ColorValue.fromRGB(val);
    }
    if (isHslColor(val)) {
      return ColorValue.fromHSL(val);
    }
    if (isHsvColor(val)) {
      return ColorValue.fromHSV(val);
    }
    if (typeof val === 'string') {
      return ColorValue.fromString(val, ColorValue.fromTbgr(0));
    }
    return ColorValue.fromTbgr(0);
  }

  /**
   * Convert this ColorValue to an unsigned 32 bit integer representing the 0xTTBBGGRR value
   */
  public toTbgr(): number {
    return this._tbgr;
  }

  /**
   * Create a ColorValue from its 0xTTBBGGRR representation.
   */
  public static fromTbgr(tbgr: number): ColorValue {
    return new ColorValue(tbgr);
  }

  /**
   * Create a ColorValue from Red, Green, Blue, Transparency values. All inputs should be integers between 0-255.
   */
  private static fromRgbt(
    red: number,
    green: number,
    blue: number,
    transparency?: number,
  ): ColorValue {
    return this.fromTbgr(
      this.computeTbgrFromComponents(red, green, blue, transparency),
    );
  }

  /**
   * Compute the 0xTTBBGGRR value corresponding to the specified Red, Green, Blue, Transparency components.
   *  All inputs should be integers between 0-255.
   */
  private static computeTbgrFromComponents(
    red: number,
    green: number,
    blue: number,
    transparency?: number,
  ): number {
    scratchBytes[0] = red;
    scratchBytes[1] = green;
    scratchBytes[2] = blue;
    scratchBytes[3] = transparency || 0;
    return scratchUInt32[0];
  }

  /**
   * Create a ColorValue from a string representation. The following representations are supported:
   * *"rgb(255,0,0)"*
   * *"rgba(255,0,0,.2)"*
   * *"rgb(100%,0%,0%)"*
   * *"hsl(120,50%,50%)"*
   * *"#rrggbb"*
   * NOTE: If defaultColorIfNotParsed is not defined and string is invalid then error is thrown.
   * This allows component builders to know if they received bad input from user.
   */
  public static fromString(
    val: string,
    defaultColorIfNotParsed?: ColorValue,
  ): ColorValue {
    const [tbgr, hue] = this.computeTbgrFromString(
      val,
      defaultColorIfNotParsed?.toTbgr(),
    );
    return new ColorValue(tbgr, hue);
  }

  /** Create a ColorValue from hue, saturation, lightness values.  */
  private static fromHSL(hsl: HslColor): ColorValue {
    const alpha = hsl.a ?? 1;
    return new ColorValue(
      this.computeTbgrFromHSL(
        hsl.h / 360,
        hsl.s / 100,
        hsl.l / 100,
        Math.round((1 - alpha) * 255),
      ),
      hsl.h,
    );
  }

  /** Create a ColorValue from an RgbColor */
  private static fromRGB(rgb: RgbColor): ColorValue {
    const alpha = rgb.a ?? 1;
    return ColorValue.fromRgbt(
      rgb.r,
      rgb.g,
      rgb.b,
      Math.round((1 - alpha) * 255),
    );
  }

  /**
   * Create a ColorValue from an HsvColor
   */
  private static fromHSV(hsv: HsvColor): ColorValue {
    const alpha = hsv.a ?? 1;
    const transparency = Math.round((1 - alpha) * 255);

    // Check for simple case first.
    if (!hsv.s || hsv.h === -1) {
      // hue must be undefined, have no color only white
      const white = 0xff & Math.floor((255.0 * hsv.v) / 100.0 + 0.5 + 3.0e-14);
      return ColorValue.fromRgbt(white, white, white, 0);
    }

    let dhue = hsv.h,
      dsaturation = hsv.s,
      dvalue = hsv.v;
    if (dhue === 360) {
      dhue = 0.0;
    }

    dhue /= 60; // hue is now [0..6]
    const hueIntpart = Math.floor(dhue); // convert double -> int
    const hueFractpart = dhue - hueIntpart;
    dvalue /= 100;
    dsaturation /= 100;

    const p = 0xff & Math.floor(dvalue * (1.0 - dsaturation) * 255.0 + 0.5);
    const q =
      0xff &
      Math.floor(dvalue * (1.0 - dsaturation * hueFractpart) * 255.0 + 0.5);
    const t =
      0xff &
      Math.floor(
        dvalue * (1.0 - dsaturation * (1.0 - hueFractpart)) * 255.0 + 0.5,
      );
    const v = 0xff & Math.floor(dvalue * 255 + 0.5);

    let r = 0,
      b = 0,
      g = 0;
    switch (hueIntpart) {
      case 0:
        r = v;
        g = t;
        b = p;
        break; // reddish
      case 1:
        (r = q), (g = v);
        b = p;
        break; // yellowish
      case 2:
        (r = p), (g = v);
        b = t;
        break; // greenish
      case 3:
        (r = p), (g = q);
        b = v;
        break; // cyanish
      case 4:
        (r = t), (g = p);
        b = v;
        break; // bluish
      case 5:
        (r = v), (g = p);
        b = q;
        break; // magenta-ish
    }

    return new ColorValue(
      ColorValue.computeTbgrFromComponents(r, g, b, transparency),
      hsv.h,
    );
  }

  /**
   * Compute the 0xTTBBGGRR value corresponding to a string representation of a color. The following representations are supported:
   * *"rgb(255,0,0)"*
   * *"rgba(255,0,0,.2)"*
   * *"rgb(100%,0%,0%)"*
   * *"hsl(120,50%,50%)"*
   * *"#rrggbb"*
   */
  private static computeTbgrFromString(
    val: string,
    defaultColorIfNotParsed?: number,
  ): [number, number | undefined] {
    val = val.toLowerCase();
    let m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(val);
    if (m) {
      // rgb / hsl
      let color;
      const name = m[1];
      const components = m[2];

      const hasPercent = (str: string) => str[str.length - 1] === '%';
      const floatOrPercent = (str: string) => {
        const v = parseFloat(str);
        return 255 * getBoundedValue(hasPercent(str) ? v / 100 : v, 0, 1);
      };
      const intOrPercent = (str: string) => {
        const v = hasPercent(str)
          ? (parseFloat(str) / 100) * 255
          : parseInt(str, 10);
        return getBoundedValue(v, 0, 255);
      };

      switch (name) {
        case 'rgb':
        case 'rgba':
          color =
            /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
              components,
            );
          if (color) {
            // rgb(255,0,0) rgba(255,0,0,0.5)
            return [
              this.computeTbgrFromComponents(
                intOrPercent(color[1]),
                intOrPercent(color[2]),
                intOrPercent(color[3]),
                typeof color[4] === 'string'
                  ? 255 - floatOrPercent(color[4])
                  : 0,
              ),
              undefined,
            ];
          }

          break;
        case 'hsl':
        case 'hsla':
          color =
            /^(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
              components,
            );
          if (color) {
            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
            const h = parseFloat(color[1]);
            const s = parseInt(color[2], 10) / 100;
            const l = parseInt(color[3], 10) / 100;
            const t =
              typeof color[4] === 'string' ? 255 - floatOrPercent(color[4]) : 0;
            return [this.computeTbgrFromHSL(h / 360, s, l, t), h];
          }

          break;
      }
      // eslint-disable-next-line no-cond-assign
    } else if ((m = /^\#([A-Fa-f\d]+)$/.exec(val))) {
      // hex color
      const hex = m[1];
      const size = hex.length;

      if (size === 3) {
        // #ff0
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(0), 16),
            parseInt(hex.charAt(1) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(2), 16),
            0,
          ),
          undefined,
        ];
      }
      if (size === 6) {
        // #ff0000
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(3), 16),
            parseInt(hex.charAt(4) + hex.charAt(5), 16),
            0,
          ),
          undefined,
        ];
      }
      if (size === 8) {
        // #ff0000ff
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(3), 16),
            parseInt(hex.charAt(4) + hex.charAt(5), 16),
            255 - parseInt(hex.charAt(6) + hex.charAt(7), 16),
          ),
          undefined,
        ];
      }
    }

    if (defaultColorIfNotParsed) {
      return [defaultColorIfNotParsed, undefined];
    }
    throw new Error('unable to parse string into ColorValue');
  }

  /**
   * Get the r,g,b,t values encoded in an 0xTTBBGGRR value. Values will be integers between 0-255.
   */
  private static getColors(tbgr: number) {
    scratchUInt32[0] = tbgr;
    return {
      b: scratchBytes[2],
      g: scratchBytes[1],
      r: scratchBytes[0],
      t: scratchBytes[3],
    };
  }

  /**
   * Get the RGB value of the 0xTTBBGGRR color as a number in 0xRRGGBB or 0xRRGGBBAA format
   */
  private getRgb(includeAlpha?: boolean): number {
    scratchUInt32[0] = this._tbgr;
    if (includeAlpha) {
      return (
        (scratchBytes[0] << 24) +
        (scratchBytes[1] << 16) +
        (scratchBytes[2] << 8) +
        (255 - scratchBytes[3])
      );
    }

    return (scratchBytes[0] << 16) + (scratchBytes[1] << 8) + scratchBytes[2];
  }

  /**
   * Get the alpha value for this ColorDef. Will be between 0-255
   */
  public getAlpha(): number {
    return ColorValue.getAlpha(this._tbgr);
  }

  /**
   * Extract the alpha value from a 0xTTBBGGRR color.
   */
  private static getAlpha(tbgr: number): number {
    scratchUInt32[0] = tbgr;
    return 255 - scratchBytes[3];
  }

  /**
   * Convert this ColorValue to a string in the form "#rrggbb" or "#rrggbbaa" where values are hex digits of the respective colors
   */
  public toHexString(includeAlpha?: boolean): string {
    if (includeAlpha) {
      let value = this.getRgb(includeAlpha);
      if (value < 0) {
        value = 0xffffffff + value + 1;
      }
      return `#${`00000000${value.toString(16)}`.slice(-8)}`;
    }
    return `#${`000000${this.getRgb().toString(16)}`.slice(-6)}`;
  }

  /**
   * Compute the 0xTTBBGGRR color corresponding to the specified hue, saturation, lightness values.
   */
  private static computeTbgrFromHSL(
    /** 0-1 */
    h: number,
    /** 0-1 */
    s: number,
    /** 0-1 */
    l: number,
    transparency = 0,
  ): number {
    const torgb = (p1: number, q1: number, t: number) => {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p1 + (q1 - p1) * 6 * t;
      }
      if (t < 1 / 2) {
        return q1;
      }
      if (t < 2 / 3) {
        return p1 + (q1 - p1) * 6 * (2 / 3 - t);
      }
      return p1;
    };

    const hue2rgb = (p1: number, q1: number, t: number) =>
      Math.round(torgb(p1, q1, t) * 255);
    const modulo = (n: number, m: number) => ((n % m) + m) % m;

    // h,s,l ranges are in 0.0 - 1.0
    h = modulo(h, 1);
    s = getBoundedValue(s, 0, 1);
    l = getBoundedValue(l, 0, 1);

    if (s === 0) {
      l *= 255;
      return this.computeTbgrFromComponents(l, l, l, transparency);
    }

    const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
    const q = 2 * l - p;
    return this.computeTbgrFromComponents(
      hue2rgb(q, p, h + 1 / 3),
      hue2rgb(q, p, h),
      hue2rgb(q, p, h - 1 / 3),
      transparency,
    );
  }

  /**
   * Return HslColor from this ColorValue
   */
  public toHslColor(): HslColor {
    return {
      ...ColorValue.toHsl(this._tbgr),
      ...(this._hue != undefined && { h: this._hue }),
    };
  }

  /** Create an HslColor from this ColorValue */
  private static toHsl(tbgr: number): HslColor {
    const { r, g, b } = ColorValue.getColors(tbgr);
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const cMin = Math.min(red, green, blue);
    const cMax = Math.max(red, green, blue);
    const delta = cMax - cMin;
    let hue = 0;
    let saturation = 0;

    if (0 === delta) {
      hue = 0;
    } else if (red === cMax) {
      hue = ((green - blue) / delta) % 6;
    } else if (green === cMax) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) {
      hue += 360;
    }

    let lightness = (cMax + cMin) / 2;
    saturation = 0 === delta ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // round values to 1 decimal place
    saturation = Number((saturation * 100).toFixed(1));
    lightness = Number((lightness * 100).toFixed(1));

    return {
      h: hue,
      s: saturation,
      l: lightness,
      a: this.getAlpha(tbgr) / 255,
    };
  }

  /**
   * Create an RgbColor from this ColorValue
   */
  public toRgbColor(): RgbColor {
    const { r, g, b } = ColorValue.getColors(this._tbgr);
    return { r, g, b, a: this.getAlpha() / 255 };
  }

  /**
   * Return HsvColor from this ColorValue
   */
  public toHsvColor(): HsvColor {
    return {
      ...ColorValue.toHsv(this._tbgr),
      ...(this._hue != undefined && { h: this._hue }),
    };
  }

  /**
   * Create an HsvColor from this ColorValue
   */
  private static toHsv(tbgr: number): HsvColor {
    const { r, g, b } = ColorValue.getColors(tbgr);
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const cMin = Math.min(red, green, blue);
    const cMax = Math.max(red, green, blue);
    const delta = cMax - cMin;
    let hue = 0;

    if (0 === delta) {
      hue = 0;
    } else if (red === cMax) {
      hue = ((green - blue) / delta) % 6;
    } else if (green === cMax) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) {
      hue += 360;
    }

    let brightness = cMax;
    let saturation = cMax === 0 ? 0 : delta / cMax;

    // round values to 1 decimal place
    saturation = Number((saturation * 100).toFixed(1));
    brightness = Number((brightness * 100).toFixed(1));

    return {
      h: hue,
      s: saturation,
      v: brightness,
      a: this.getAlpha(tbgr) / 255,
    };
  }

  /** True if the value of this ColorValue is the same as another ColorValue. */
  public equals(other: ColorValue): boolean {
    return this._tbgr === other._tbgr;
  }

  public static getFormattedColorNumber(value: number, precision = 1) {
    if (0 === precision) {
      Math.round(value).toString();
    }
    return Number(value.toFixed(precision)).toString();
  }

  /** Convert the 0xTTBBGGRR color to a string of the form "rgba(r,g,b,a)" where the color components are specified in decimal and the alpha component is a fraction. */
  public toRgbString(includeAlpha?: boolean): string {
    const rgb = this.toRgbColor();
    const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

    if (includeAlpha) {
      const alpha = rgb.a ?? 1;
      return `rgba(${rgbString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2,
      )})`;
    }
    return `rgb(${rgbString})`;
  }

  /** Convert this ColorValue to a string in the form "hsl(h,s,l) or hsla(h,s,l,a)" - i.e hsl(120,50%,50%). */
  public toHslString(includeAlpha?: boolean): string {
    const hsl = this.toHslColor();
    const hslString = `${ColorValue.getFormattedColorNumber(
      this._hue ?? hsl.h,
    )}, ${ColorValue.getFormattedColorNumber(
      hsl.s,
    )}%, ${ColorValue.getFormattedColorNumber(hsl.l)}%`;
    if (includeAlpha) {
      const alpha = hsl.a ?? 1;
      return `hsla(${hslString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2,
      )})`;
    }
    return `hsl(${hslString})`;
  }

  /** Convert this ColorValue to a string in the form "hsv(h,s,v) or hsva(h,s,v,a)" - i.e hsv(120,50%,50%). */
  public toHsvString(includeAlpha?: boolean): string {
    const hsv = this.toHsvColor();
    const hsvString = `${this._hue ?? hsv.h}, ${hsv.s}%, ${hsv.v}%`;

    if (includeAlpha) {
      const alpha = hsv.a ?? 1;
      return `hsva(${hsvString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2,
      )})`;
    }
    return `hsv(${hsvString})`;
  }
}
