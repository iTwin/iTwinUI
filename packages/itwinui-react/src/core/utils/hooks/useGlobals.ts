/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import '@itwin/itwinui-css/css/global.css';
import '@itwin/itwinui-variables/index.css';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider.js';

let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev = process.env.NODE_ENV !== 'production';
} catch {}

const didLogWarning = {
  fontSize: false,
  themeProvider: false,
};

/**
 * Hook used in every component for any shared setup and side effects.
 *
 * @private
 */
export const useGlobals = () => {
  useThemeProviderWarning();
  useRootFontSizeWarning();
};

// ----------------------------------------------------------------------------

/** Shows console error if ThemeProvider is not used */
export const useThemeProviderWarning = () => {
  const themeContext = React.useContext(ThemeContext);
  React.useEffect(() => {
    if (isDev && !didLogWarning.themeProvider && !themeContext) {
      console.error('Component must be wrapped in ThemeProvider.');
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
