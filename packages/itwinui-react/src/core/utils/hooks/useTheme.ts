/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { getDocument, getWindow } from '../functions/index.js';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.js';
import { useIsThemeAlreadySet } from './useIsThemeAlreadySet.js';
import { useStyles } from './useStyles.js';

export type ThemeOptions = {
  /**
   * Document to which the theme will be applied.
   * Can be specified to handle popup windows.
   * @default document
   *
   * @deprecated This prop will continue to work in `useTheme` but
   * we recommend rendering `ThemeProvider` in the correct document instead.
   */
  ownerDocument?: Document;
  /**
   * Whether to apply high-contrast versions of light and dark themes.
   * Will default to user preference if browser supports it.
   */
  highContrast?: boolean;
};

export type ThemeType = 'light' | 'dark' | 'os';

export type UseThemeProps = {
  /**
   * Theme to be applied. If not set, light theme will be used.
   */
  theme?: ThemeType;
  /**
   * Options that can be specified to override default theming behavior.
   */
  themeOptions?: ThemeOptions;
};

/**
 * Hook that conditionally applies styling and theme to all components.
 * Defaults to light theme if none provided.
 *
 * If ThemeProvider is used as an ancestor, this hook will not do anything.
 *
 * @param theme Light, dark, or based on OS setting.
 * @param themeOptions Options that override default theming behavior.
 *
 * @deprecated This hook will be removed in v3. Please use `ThemeProvider` instead.
 */
export const useTheme = (
  theme?: UseThemeProps['theme'],
  themeOptions?: UseThemeProps['themeOptions'],
) => {
  const ownerDocument = themeOptions?.ownerDocument ?? getDocument();
  const isThemeAlreadySet = useIsThemeAlreadySet(ownerDocument);

  useStyles();

  useCorrectRootFontSize();

  useIsomorphicLayoutEffect(() => {
    if (!ownerDocument || isThemeAlreadySet.current) {
      return;
    }

    // do nothing if using v1 for the main page (incremental migration)
    if (
      ownerDocument.documentElement.className.includes('iui-theme-') ||
      ownerDocument.body.classList.contains('iui-body')
    ) {
      return;
    }

    ownerDocument.body.classList.toggle('iui-root', true);

    switch (theme) {
      case 'light':
      case 'dark':
      case 'os': {
        return handleTheme(theme, ownerDocument, themeOptions?.highContrast);
      }
      default: {
        // set light theme by default
        if (ownerDocument.documentElement.dataset.iuiTheme == null) {
          return handleTheme(
            'light',
            ownerDocument,
            themeOptions?.highContrast,
          );
        }
        return;
      }
    }
  }, [theme, themeOptions?.highContrast, ownerDocument]);
};

/**
 * Helper function to apply the specified theme, or detect the OS theme.
 * Returns a cleanup function to remove the change handlers.
 */
const handleTheme = (
  theme: ThemeType,
  ownerDocument: Document,
  highContrast?: boolean,
) => {
  const root = ownerDocument.documentElement;
  const _window = ownerDocument.defaultView ?? getWindow();

  const applyThemeAttributes = (isDark = false, isHC = false) => {
    root.dataset.iuiTheme = isDark ? 'dark' : 'light';
    root.dataset.iuiContrast = isHC ? 'high' : 'default';
  };

  const prefersDarkQuery = _window?.matchMedia?.(
    '(prefers-color-scheme: dark)',
  );
  const prefersHCQuery = _window?.matchMedia?.('(prefers-contrast: more)');

  const changeHandler = () => {
    const isDark =
      theme === 'dark' || (theme === 'os' && prefersDarkQuery?.matches);
    const isHC = highContrast ?? prefersHCQuery?.matches;

    applyThemeAttributes(isDark, isHC);
  };

  // call handler once to set initial theme
  changeHandler();

  // add listeners in supported browsers
  prefersDarkQuery?.addEventListener?.('change', changeHandler);
  prefersHCQuery?.addEventListener?.('change', changeHandler);

  // return cleanup function to remove event listeners (should be returned from useEffect)
  return () => {
    prefersDarkQuery?.removeEventListener?.('change', changeHandler);
    prefersHCQuery?.removeEventListener?.('change', changeHandler);
  };
};

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
