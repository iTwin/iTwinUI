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
export const getTranslateValues = (element: HTMLElement | null | undefined) => {
  if (!element) {
    return [];
  }

  const transformValue =
    getComputedStyle(element).getPropertyValue('transform');
  const matrix = new DOMMatrix(transformValue);

  return [matrix.m41, matrix.m42];
};

/**
 * Accepts a handler which gets called when focus leaves the element
 * as a result of a keypress (rather than mouse clicks).
 *
 * Must be passed to `keydown` to ensure it gets called before `blur` event.
 *
 * @example
 * onKeyDown={handleFocusOut(() => {})}
 */
export const handleFocusOut =
  (handler: () => void) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Tab') {
      const element = e.currentTarget as HTMLElement;

      element.dataset.iuiKeydown = 'true';
      element.addEventListener(
        'blur',
        ({ relatedTarget }: FocusEvent) => {
          if (
            element?.dataset?.iuiKeydown &&
            relatedTarget &&
            !element.contains(relatedTarget as HTMLElement)
          ) {
            handler();
          }
        },
        { once: true },
      );
      element?.ownerDocument.addEventListener(
        'keyup',
        () => {
          if (element?.dataset.iuiKeydown) {
            delete element.dataset.iuiKeydown;
          }
        },
        { once: true },
      );
    }
  };
