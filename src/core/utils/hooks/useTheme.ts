/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import '@itwin/itwinui-css/css/global.css';
import { getDocument, getWindow } from '../functions/dom';

export type ThemeOptions = {
  /**
   * Document to which the theme will be applied.
   * Can be specified to handle popup windows.
   * @default document
   */
  ownerDocument?: Document;
};

export type ThemeType = 'light' | 'dark' | 'os';

/**
 * Hook that applies styling and theme to all components.
 * Defaults to light theme if none provided or set elsewhere.
 * @param theme Light, dark, or based on OS setting.
 * @param themeOptions Options that override default theming behavior.
 */
export const useTheme = (
  theme?: ThemeType,
  themeOptions?: ThemeOptions,
): void => {
  const ownerDocument = themeOptions?.ownerDocument ?? getDocument();

  React.useLayoutEffect(() => {
    if (!ownerDocument?.body.classList.contains('iui-body')) {
      ownerDocument?.body.classList.add('iui-body');
    }
  }, [ownerDocument]);

  React.useLayoutEffect(() => {
    if (!ownerDocument) {
      return;
    }

    const prefersDarkMediaQuery = getWindow()?.matchMedia?.(
      '(prefers-color-scheme: dark)',
    );

    const addOSTheme = ({
      matches: isDark,
    }: MediaQueryList | MediaQueryListEvent) => {
      if (isDark) {
        addDarkTheme(ownerDocument);
      } else {
        addLightTheme(ownerDocument);
      }
    };

    switch (theme) {
      case 'light':
        prefersDarkMediaQuery?.removeEventListener?.('change', addOSTheme);
        addLightTheme(ownerDocument);
        break;
      case 'dark':
        prefersDarkMediaQuery?.removeEventListener?.('change', addOSTheme);
        addDarkTheme(ownerDocument);
        break;
      case 'os':
        if (prefersDarkMediaQuery != undefined) {
          addOSTheme(prefersDarkMediaQuery);
          prefersDarkMediaQuery.addEventListener?.('change', addOSTheme);
        } else {
          addLightTheme(ownerDocument);
        }
        break;
      default:
        if (
          ownerDocument.documentElement.className.indexOf('iui-theme') === -1
        ) {
          addLightTheme(ownerDocument);
        }
    }

    return () => {
      prefersDarkMediaQuery?.removeEventListener?.('change', addOSTheme);
    };
  }, [ownerDocument, theme]);
};

const addLightTheme = (ownerDocument: Document) => {
  ownerDocument.documentElement.classList.add('iui-theme-light');
  ownerDocument.documentElement.classList.remove('iui-theme-dark');
};

const addDarkTheme = (ownerDocument: Document) => {
  ownerDocument.documentElement.classList.add('iui-theme-dark');
  ownerDocument.documentElement.classList.remove('iui-theme-light');
};
