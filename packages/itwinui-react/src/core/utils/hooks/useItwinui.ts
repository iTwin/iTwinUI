/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import '@itwin/itwinui-css/css/global.css';
import '@itwin/itwinui-variables/index.css';

export const useItwinui = () => {
  useCorrectRootFontSize();
};

export default useItwinui;

let didLogWarning = false;
let isDev = false;

// wrapping in try-catch because process might be undefined
try {
  isDev = process.env.NODE_ENV !== 'production';
} catch {}

/** Shows console error if the page changes the root font size */
const useCorrectRootFontSize = () => {
  React.useEffect(() => {
    if (isDev && !didLogWarning) {
      const rootFontSize = parseInt(
        getComputedStyle(document.documentElement).fontSize,
      );
      if (rootFontSize < 16) {
        console.error(
          'Root font size must not be overridden. \nSee https://github.com/iTwin/iTwinUI/wiki/iTwinUI-react-v2-migration-guide#relative-font-size',
        );
        didLogWarning = true;
      }
    }
  }, []);
};
