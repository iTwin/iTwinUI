/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import addons from '@storybook/addons';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { lightTheme, darkTheme } from './itwinTheme';

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', (isDark) => updateTheme(isDark));

// get user's OS color scheme
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

addParameters({
  darkMode: {
    dark: { ...themes.dark, ...darkTheme },
    light: { ...themes.light, ...lightTheme },
  },
  docs: {
    theme: prefersDark
      ? { ...themes.dark, ...darkTheme }
      : { ...themes.light, ...lightTheme },
  },
  options: { showPanel: true },
});

const updateTheme = (isDark) => {
  document.documentElement.dataset.iuiTheme = isDark ? 'dark' : 'light';
};
export const parameters = {
  controls: { sort: 'requiredFirst' },
  backgrounds: {
    grid: { disable: true },
    default: 'background-backdrop',
    values: [
      { name: 'background', value: 'var(--iui-color-background, #fff)' },
      {
        name: 'background-backdrop',
        value: 'var(--iui-color-background-backdrop, #eef0f1)',
      },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const {
      globals: { hc: highContrast },
    } = context;

    React.useEffect(() => {
      document.documentElement.dataset.iuiContrast = highContrast
        ? 'high'
        : 'default';
    }, [highContrast]);

    return Story(); // builder-vite does not allow JSX here so we call Story as a function
  },
];
