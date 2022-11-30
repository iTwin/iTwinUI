/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Returns translate values as an array of a given element.
 * @param element HTML element you want to get translate value of
 * @returns Translate values in pixels in an array `[translateX, translateY]`
 */
export const getTranslateValues = (element: HTMLElement | null | undefined) => {
  if (!element) {
    return [];
  }

  const transformValue =
    getComputedStyle(element).getPropertyValue('transform');
  const matrix = new DOMMatrix(transformValue);

  return [matrix.m41, matrix.m42];
};
