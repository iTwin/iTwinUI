/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Hook that uses `ResizeObserver` to return an element's size every time it updates.
 * @param elementRef ref of the element to observe resizes on.
 * @returns stateful object containing height and width of the element.
 */
export const useResizeObserver = <T extends HTMLElement>(
  elementRef: React.RefObject<T>,
) => {
  const [size, setSize] = React.useState(() => ({
    height: elementRef.current?.getBoundingClientRect().height,
    width: elementRef.current?.getBoundingClientRect().width,
  }));

  const resizeObserver = React.useRef<ResizeObserver | null>(null);

  React.useLayoutEffect(() => {
    resizeObserver.current?.disconnect();
    if (elementRef.current) {
      resizeObserver.current = new ResizeObserver(([{ contentRect }]) =>
        setSize({ height: contentRect.height, width: contentRect.width }),
      );
      resizeObserver.current?.observe(elementRef.current);
    }
    return () => resizeObserver.current?.disconnect();
  }, [elementRef]);

  return size;
};
