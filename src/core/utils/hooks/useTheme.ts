// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import '@bentley/itwinui/css/global.css';

export type ThemeType = 'light' | 'dark' | 'os';

/**
 * Hook that applies styling and theme to all components.
 * Defaults to light theme if none provided or set elsewhere.
 * @param theme Light, dark, or based on OS setting.
 */
export const useTheme = (theme?: ThemeType): void => {
  React.useEffect(() => {
    switch (theme) {
      case 'light':
        addLightTheme();
        break;
      case 'dark':
        addDarkTheme();
        break;
      case 'os':
        if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
          addDarkTheme();
        } else {
          addLightTheme();
        }
        break;
      default:
        if (!document.documentElement.classList.value.includes('iui-theme')) {
          addLightTheme();
        }
    }
  }, [theme]);
};

const addLightTheme = () => {
  document.documentElement.classList.add('iui-theme-light');
  document.documentElement.classList.remove('iui-theme-dark');
};

const addDarkTheme = () => {
  document.documentElement.classList.add('iui-theme-dark');
  document.documentElement.classList.remove('iui-theme-light');
};
