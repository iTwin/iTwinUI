/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { getWindow } from '../functions/dom.js';

/**
 * Hook that uses `IntersectionObserver` to trigger `onIntersect` callback when element is in viewport.
 * Callback is called only once by default (can be changed using the `once` parameter).
 * @returns a callback ref that needs to be set on the element you want to observe.
 * @private
 * @example
 * const onIntersection = React.useCallback(() => {
 *   console.log('Element is in viewport!');
 * }, []);
 * const ref = useIntersection(onIntersection);
 * return (<div ref={ref}>One of many elements</div>);
 */
export const useIntersection = (
  onIntersect: () => void,
  options: IntersectionObserverInit = {},
  once = true,
) => {
  const { root, rootMargin, threshold } = options;
  const cleanupRef = React.useRef(() => {});

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      cleanupRef.current?.();
      cleanupRef.current = () => {}; // ensure it doesn't try to clean up again

      if (!node || !getWindow()?.IntersectionObserver) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry], obs) => {
          if (entry.isIntersecting) {
            if (once) {
              obs.disconnect();
            }
            onIntersect();
          }
        },
        { root, rootMargin, threshold },
      );
      observer.observe(node);

      cleanupRef.current = () => observer.disconnect();
    },
    [onIntersect, once, root, rootMargin, threshold],
  );

  return setRef;
};
