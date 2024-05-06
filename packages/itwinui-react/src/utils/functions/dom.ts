/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Get document if it is defined.
 * Used to support SSR/SSG applications.
 */
export const getDocument = () => {
  return typeof document === 'undefined' ? undefined : document;
};

/**
 * Get window if it is defined.
 * Used to support SSR/SSG applications.
 */
export const getWindow = () => {
  return typeof window === 'undefined' ? undefined : window;
};

/**
 * Merges multiple event handlers into one, while making sure that
 * `defaultPrevented` is respected for each callback.
 */
export const mergeEventHandlers =
  <E extends React.SyntheticEvent>(
    ...callbacks: Array<((event: E) => void) | undefined>
  ) =>
  (event: E) => {
    for (const cb of callbacks) {
      cb?.(event);
      if (event?.defaultPrevented) {
        return;
      }
    }
  };

/**
 * Returns translate values as an array of a given element.
 * @param element HTML element you want to get translate value of
 * @returns Translate values in pixels in an array `[translateX, translateY]`
 */
export const getTranslateValuesFromElement = (
  element: HTMLElement | null | undefined,
) => {
  if (!element) {
    return [];
  }

  const transformValue =
    getComputedStyle(element).getPropertyValue('transform');

  return getTranslateValues(transformValue);
};

export const getTranslateValues = (transformValue: string) => {
  const matrix = new DOMMatrix(transformValue);
  return [matrix.m41, matrix.m42];
};
