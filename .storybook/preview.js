/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import addons from '@storybook/addons';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { lightTheme, darkTheme } from './itwinTheme';

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', (isDark) => updateTheme(isDark));

addParameters({
  darkMode: {
    dark: { ...themes.dark, ...darkTheme },
    light: { ...themes.light, ...lightTheme },
  },
  docs: {
    theme: { ...themes.light, ...lightTheme },
  },
  options: { showPanel: true },
});

// helper for updating theme according to dark mode flag
const updateTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.remove('iui-theme-light');
    document.documentElement.classList.add('iui-theme-dark');
  } else {
    document.documentElement.classList.remove('iui-theme-dark');
    document.documentElement.classList.add('iui-theme-light');
  }
};

// update iframe theme for non-inline stories
if (window.parent !== window) {
  updateTheme(
    window.parent.document.documentElement.classList.contains('iui-theme-dark'),
  );

  new MutationObserver(([mutation]) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      updateTheme(mutation.target.classList.contains('iui-theme-dark'));
    }
  }).observe(window.parent.document.documentElement, { attributes: true });
}

export const parameters = {
  controls: { sort: 'requiredFirst' },
};
