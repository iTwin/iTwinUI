/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ThemeContext } from '../../core/ThemeProvider/ThemeContext.js';
import { isDev } from '../functions/dev.js';

const didLogWarning = {
  fontSize: false,
  themeProvider: false,
};

/**
 * Hook used in every component for any shared setup and side effects.
 * Returns the nearest ThemeContext.
 *
 * @private
 */
export const useGlobals = () => {
  const themeContext = React.useContext(ThemeContext);
  useThemeProviderWarning(themeContext);
  useRootFontSizeWarning();
  return themeContext;
};

// ----------------------------------------------------------------------------

/** Shows console error if ThemeProvider is not used */
export const useThemeProviderWarning = (
  themeContext: React.ContextType<typeof ThemeContext>,
) => {
  React.useEffect(() => {
    if (isDev && !didLogWarning.themeProvider && !themeContext) {
      console.error(
        'iTwinUI components must be used within a tree wrapped in a ThemeProvider.',
      );
      didLogWarning.themeProvider = true;
    }
  }, [themeContext]);
};

// ----------------------------------------------------------------------------

/** Shows console error if the page changes the root font size */
const useRootFontSizeWarning = () => {
  React.useEffect(() => {
    if (isDev && !didLogWarning.fontSize) {
      const rootFontSize = parseInt(
        getComputedStyle(document.documentElement).fontSize,
      );
      if (rootFontSize < 16) {
        console.error(
          'Root font size must not be overridden. \nSee https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v2-migration-guide#relative-font-size',
        );
      }
      didLogWarning.fontSize = true;
    }
  }, []);
};
