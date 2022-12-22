/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getWindow } from '../functions/dom';

/**
 * Hook that uses `ResizeObserver` to access an element's size every time it updates.
 * @private
 * @param onResize callback fired with the element's new dimensions on every resize.
 * @returns a callback ref that needs to be set on the element, and a ResizeObserver instance.
 *
 * @example
 * const onResize = React.useCallback((size) => console.log(size), []);
 * const [ref] = useResizeObserver(onResize);
 * ...
 * return <div ref={ref}>...</div>;
 */
export const useResizeObserver = <T extends HTMLElement>(
  onResize: (size: DOMRectReadOnly) => void,
) => {
  const resizeObserver = React.useRef<ResizeObserver>();

  const elementRef = React.useCallback(
    (element: T | null | undefined) => {
      if (!getWindow()?.ResizeObserver) {
        return;
      }

      resizeObserver.current?.disconnect();
      if (element) {
        resizeObserver.current = new ResizeObserver(([{ contentRect }]) =>
          onResize(contentRect),
        );
        resizeObserver.current?.observe(element);
      }
    },
    [onResize],
  );

  return [elementRef, resizeObserver.current] as const;
};
