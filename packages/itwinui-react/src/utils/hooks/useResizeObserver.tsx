/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { getWindow } from '../functions/dom.js';
import { useLatestRef } from './useLatestRef.js';

/**
 * Hook that uses `ResizeObserver` to access an element's size every time it updates.
 * @private
 * @param onResizeProp callback fired with the element's new dimensions on every resize.
 * @returns a callback ref that needs to be set on the element, and a ResizeObserver instance.
 *
 * @example
 * const onResize = React.useCallback((size) => console.log(size), []);
 * const [ref] = useResizeObserver(onResize);
 * ...
 * return <div ref={ref}>...</div>;
 */
export const useResizeObserver = <T extends HTMLElement>(
  onResizeProp: (size: DOMRectReadOnly) => void,
) => {
  const onResize = useLatestRef(onResizeProp);
  const resizeObserver = React.useRef<ResizeObserver>();

  const elementRef = React.useCallback(
    (element: T | null | undefined) => {
      if (!getWindow()?.ResizeObserver) {
        return;
      }

      resizeObserver.current?.disconnect?.();
      if (element) {
        resizeObserver.current = new ResizeObserver((entries) => {
          // We wrap onResize with requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
          // See: https://github.com/iTwin/iTwinUI/issues/1317
          // See: https://stackoverflow.com/a/58701523/11547064
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return;
            }

            const [{ contentRect }] = entries;
            return onResize.current(contentRect);
          });
        });
        resizeObserver.current?.observe?.(element);
      }
    },
    [onResize],
  );

  return [elementRef, resizeObserver.current] as const;
};
