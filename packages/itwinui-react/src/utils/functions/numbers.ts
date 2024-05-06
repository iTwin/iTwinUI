/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Return input value bounded by specified range.
 */
export const getBoundedValue = (val: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, val));
};

/**
 * Returns a random value of a given length containing `A-Za-z0-9_-` symbols.
 */
export const getRandomValue = (length = 21) => {
  const alphabet = `_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let id = '';
  for (let i = 0; i < length; i++) {
    id += alphabet[(Math.random() * 64) | 0];
  }
  return id;
};

/**
 * Rounds a pixel value based on the device's pixel ratio. This ensures that values can be
 * placed evenly on the device’s pixel grid, avoiding any blurring.
 *
 * @see https://floating-ui.com/docs/misc#subpixel-and-accelerated-positioning
 */
export const roundByDPR = (value: number) => {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
};
