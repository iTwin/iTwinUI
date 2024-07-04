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
 * Returns the latest focusable elements in the `root` element.
 * This is returned as a ref and a state. Choose which one to use according to the use case. E.g.:
 * - ref: since FloatingUI needs a ref ([`listRef`](https://floating-ui.com/docs/useListNavigation#listref)).
 * - state: when reading this value in a render.
 *
 * Pass `extraOptions.filter` to filter the elements.
 *
 * @example
 * const {focusableElementsRef, focusableElements} = useFocusableElements(root, {
 *   // Filter out focusable elements that are inside other focusable elements.
 *   filter: (allElements) => allElements.filter(
 *     (i) => !allElements?.some((p) => p.contains(i.parentElement)),
 *   ),
 * });
 */
export function useFocusableElements(
  root: HTMLElement | null,
  extraOptions?: {
    filter?: (elements: HTMLElement[]) => HTMLElement[];
  },
) {
  const focusableElementsRef = React.useRef<HTMLElement[]>([]);
  const [focusableElements, setFocusableElements] = React.useState(
    focusableElementsRef.current,
  );

  const setFocusableElementsRefAndState = (
    newFocusableElements: HTMLElement[],
  ) => {
    focusableElementsRef.current = newFocusableElements;
    setFocusableElements(newFocusableElements);
  };

  const { filter: filterProp } = extraOptions ?? {};

  const filter = useLatestRef(filterProp);

  const returnValue = React.useMemo(() => {
    return {
      focusableElementsRef,
      focusableElements,
    };
  }, [focusableElementsRef, focusableElements]);

  return useSyncExternalStore(
    React.useCallback(() => {
      if (!root) {
        setFocusableElementsRefAndState([]);
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

        setFocusableElementsRefAndState(newFocusableElements);
      }
    }, [root, filter]),
    () => returnValue,
    () => returnValue,
  );
}
