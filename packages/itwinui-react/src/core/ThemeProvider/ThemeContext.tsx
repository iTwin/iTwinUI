/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { ThemeOptions, ThemeType } from './ThemeProvider.js';

export const ThemeContext = React.createContext<
  | {
      theme?: ThemeType;
      themeOptions?: ThemeOptions;
      portalContainer?: HTMLElement | null;
    }
  | undefined
>(undefined);
