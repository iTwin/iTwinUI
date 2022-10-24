/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { getWindow } from '../functions';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useMediaQuery = (queryString: string) => {
  const [matches, setMatches] = React.useState<boolean>();

  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = getWindow()?.matchMedia?.(queryString);
    const handleChange = ({ matches }: MediaQueryListEvent) =>
      setMatches(matches);

    if (mediaQueryList != undefined) {
      setMatches(mediaQueryList.matches);
      try {
        mediaQueryList.addEventListener('change', handleChange);
      } catch {
        // Safari 13 fallback
        mediaQueryList.addListener?.(handleChange);
      }
    }

    return () => {
      try {
        mediaQueryList?.removeEventListener('change', handleChange);
      } catch {
        // Safari 13 fallback
        mediaQueryList?.removeListener?.(handleChange);
      }
    };
  }, [queryString]);

  return !!matches;
};

export default useMediaQuery;
