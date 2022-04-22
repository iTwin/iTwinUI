/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getWindow } from '../functions/dom';

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
  const observer = React.useRef<IntersectionObserver>();

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (!getWindow()?.IntersectionObserver) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      if (!node) {
        return;
      }

      observer.current = new IntersectionObserver(
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
      observer.current.observe(node);
    },
    [onIntersect, once, root, rootMargin, threshold],
  );

  React.useEffect(() => () => observer.current?.disconnect(), []);

  return setRef;
};
