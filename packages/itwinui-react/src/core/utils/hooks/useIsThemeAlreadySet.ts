/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { getDocument } from '../functions';

/**
 * Hook that returns a boolean ref which is true if either:
 * - There is a parent `ThemeProvider` in the tree, or
 * - The <body> element has data-iui-theme attribute
 */
export const useIsThemeAlreadySet = (ownerDocument = getDocument()) => {
  const parentContext = React.useContext(ThemeContext);
  const isThemeAlreadySet = React.useRef(
    !!parentContext || !!ownerDocument?.body.dataset.iuiTheme,
  );

  useIsomorphicLayoutEffect(() => {
    if (
      parentContext ||
      (ownerDocument && !!ownerDocument.body.dataset.iuiTheme)
    ) {
      isThemeAlreadySet.current = true;
    }

    return () => {
      isThemeAlreadySet.current = false;
    };
  }, [parentContext, ownerDocument]);

  return isThemeAlreadySet;
};
