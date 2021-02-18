// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import addons from '@storybook/addons';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { lightTheme, darkTheme } from './itwinTheme';

// get an instance to the communication channel for the manager and preview
const channel = addons.getChannel();

// switch body class for story along with interface theme
channel.on('DARK_MODE', (isDark) => {
  if (isDark) {
    document.documentElement.classList.remove('iui-theme-light');
    document.documentElement.classList.add('iui-theme-dark');
  } else {
    document.documentElement.classList.remove('iui-theme-dark');
    document.documentElement.classList.add('iui-theme-light');
  }
});

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
