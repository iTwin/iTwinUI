/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import React from 'react';
import { lightTheme, darkTheme } from './itwinTheme';

const channel = addons.getChannel();

channel.on('DARK_MODE', (isDark) => updateTheme(isDark));

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const updateTheme = (isDark) => {
  document.body.dataset.iuiTheme = isDark ? 'dark' : 'light';
};

/** @type { import('@storybook/react').Preview } */
export default {
  parameters: {
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
  },

  globalTypes: {
    hc: {
      name: 'High contrast',
      defaultValue: false,
    },
  },

  decorators: [
    (Story, context) => {
      const {
        globals: { hc: highContrast },
      } = context;

      React.useEffect(() => {
        document.body.classList.toggle('iui-root', true);
        document.body.dataset.iuiContrast = highContrast ? 'high' : 'default';
      }, [highContrast]);

      return Story(); // builder-vite does not allow JSX here so we call Story as a function
    },
  ],
};
