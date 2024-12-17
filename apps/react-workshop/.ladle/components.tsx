/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  useLadleContext,
  ActionType,
  ThemeState,
  type GlobalProvider,
} from '@ladle/react';
import './global.css';
import '@itwin/itwinui-variables';
import '@itwin/itwinui-react/styles.css';
import { ThemeProvider } from '@itwin/itwinui-react';

const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

export const Provider: GlobalProvider = ({ children }) => {
  const { globalState, dispatch } = useLadleContext();
  const theme = globalState.theme === 'dark' ? 'dark' : 'light';
  const highContrast = globalState.control?.['high-contrast']?.value;
  const bridgeToFutureVersions =
    globalState.control?.['bridgeToFutureVersions']?.value;

  // default to OS theme
  React.useLayoutEffect(() => {
    dispatch({
      type: ActionType.UpdateTheme,
      value: ThemeState[prefersDark ? 'Dark' : 'Light'],
    });
  }, []);

  // propagate theme to <html> element for page background
  React.useLayoutEffect(() => {
    document.documentElement.dataset.colorScheme = theme;
    document.documentElement.dataset.iuiTheme = theme;
    document.documentElement.dataset.iuiContrast = highContrast
      ? 'high'
      : 'default';

    document.body.dataset.iuiTheme = theme;
    document.body.dataset.iuiBridge = bridgeToFutureVersions;
  }, [theme, highContrast, bridgeToFutureVersions]);

  // redirect old storybook paths to new ones
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oldPath = params.get('path');
    if (oldPath && !params.get('story')) {
      const story = oldPath.substring((oldPath.indexOf('-') ?? 0) + 1);
      if (story) {
        window.location.href = `${window.location.href}&story=${story}`;
      }
    }
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider
        theme={theme}
        themeOptions={{
          applyBackground: false,
          highContrast,
          bridgeToFutureVersions,
        }}
      >
        {children}
      </ThemeProvider>
    </React.StrictMode>
  );
};

export const argTypes = {
  background: {
    control: { type: 'background' },
    options: [
      'var(--iui-color-background)',
      'var(--iui-color-background-backdrop)',
    ],
    defaultValue: 'var(--iui-color-background-backdrop)',
  },
  'high-contrast': {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  bridgeToFutureVersions: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
};
