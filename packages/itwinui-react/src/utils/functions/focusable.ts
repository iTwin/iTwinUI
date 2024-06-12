/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { useSyncExternalStore, useLatestRef } from '../hooks/index.js';

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

/**
 * Returns a ref of the latest focusable elements in the `root` element.
 *
 * Pass `extraOptions.filter` to filter the elements.
 *
 * @example
 * const focusableElementsRef = useFocusableElementsRef(root, {
 *   // Filter out focusable elements that are inside other focusable elements.
 *   filter: (allElements) => allElements.filter(
 *     (i) => !allElements?.some((p) => p.contains(i.parentElement)),
 *   ),
 * });
 */
export function useFocusableElementsRef(
  root: HTMLElement | null,
  extraOptions?: {
    filter?: (elements: HTMLElement[]) => HTMLElement[];
  },
) {
  const focusableElementsRef = React.useRef<HTMLElement[]>([]);
  const { filter: filterProp } = extraOptions ?? {};

  const filter = useLatestRef(filterProp);

  return useSyncExternalStore(
    React.useCallback(() => {
      if (!root) {
        focusableElementsRef.current = [];
        return () => {};
      }

      updateFocusableElements();
      const observer = new MutationObserver(() => updateFocusableElements());
      observer.observe(root, { childList: true, subtree: true });
      return () => observer.disconnect();

      function updateFocusableElements() {
        let newFocusableElements = getFocusableElements(root) as HTMLElement[];
        if (filter.current) {
          newFocusableElements = filter.current?.(newFocusableElements);
        }

        focusableElementsRef.current = newFocusableElements;
      }
    }, [root, filter]),
    () => focusableElementsRef,
    () => focusableElementsRef,
  );
}
