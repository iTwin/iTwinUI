/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

/**
 * Function that merges the provided refs into one.
 */
export const mergeRefs = <T>(
  ...refs: Array<React.Ref<T> | undefined | null>
) => {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
};

/**
 * Returns a ref callback that merges the provided refs using `mergeRefs`.
 */
export const useMergedRefs = <T>(
  ...refs: ReadonlyArray<React.Ref<T> | undefined | null>
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(mergeRefs(...refs), [...refs]);
};
