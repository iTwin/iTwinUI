/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

const tabbableElementsSelector =
  'a[href], button, input, textarea, select, details, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

/**
 * Return array of tabbable elements in the container.
 */
export const getTabbableElements = (
  container: HTMLElement | undefined | null,
) => {
  if (!container) {
    return [];
  }

  const elements = container.querySelectorAll(tabbableElementsSelector);

  return Array.from(elements).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.classList.contains('iui-disabled') &&
      el.getAttribute('aria-disabled') !== 'true',
  );
};

/**
 * Return array of focusable elements in the container.
 */
export const getFocusableElements = (
  container: HTMLElement | undefined | null,
) => {
  if (!container) {
    return [];
  }

  const elements = container.querySelectorAll(
    `${tabbableElementsSelector}, [tabindex="-1"]`,
  );

  return Array.from(elements).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.classList.contains('iui-disabled') &&
      el.getAttribute('aria-disabled') !== 'true',
  );
};
