/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { themes } from '@storybook/theming';
import { lightTheme, darkTheme } from './itwinTheme';
import StoryWithDecorator from './StoryWithDecorator.jsx';

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

/** @type { import('@storybook/react').Preview } */
export default {
  parameters: {
    darkMode: {
      classTarget: '.iui-root',
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

  decorators: [StoryWithDecorator],
};
