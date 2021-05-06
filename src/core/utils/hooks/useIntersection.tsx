/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Hook that uses `IntersectionObserver` to trigger `onIntersect` callback when element is in viewport.
 * Callback is called only once.
 * Hook returns a function that you need to use to set a reference of the element you want to observe.
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
) => {
  const { root, rootMargin, threshold } = options;
  const observer = React.useRef<IntersectionObserver>();

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (!window.IntersectionObserver) {
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
            obs.disconnect();
            onIntersect();
          }
        },
        { root, rootMargin, threshold },
      );
      observer.current.observe(node);
    },
    [onIntersect, root, rootMargin, threshold],
  );

  return setRef;
};
