import React from 'react';

export const useRefs = <T>(
  ...refs: ReadonlyArray<React.Ref<T>>
): ((instance: T | null) => void) => {
  return React.useCallback(
    (instance: T | null) => {
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }
        if (typeof ref === 'function') {
          ref(instance);
        } else {
          (ref as React.MutableRefObject<T | null>).current = instance;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs],
  );
};
