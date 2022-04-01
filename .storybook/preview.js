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
  backgrounds: {
    grid: { disable: true },
    default: 'background-2',
    values: [
      { name: 'background-1', value: 'var(--iui-color-background-1)' },
      { name: 'background-2', value: 'var(--iui-color-background-2)' },
    ],
  },
  options: { showPanel: true },
});

// helper for updating theme according to dark mode flag
const updateTheme = (isDark) => {
  const classes = document.documentElement.classList;
  const currentTheme = Array.from(classes).find((cls) =>
    cls.startsWith('iui-theme'),
  );
  const isHc = currentTheme?.includes('-hc');
  const isHcString = isHc ? '-hc' : '';
  if (isDark) {
    classes.remove(`iui-theme-light${isHcString}`);
    classes.add(`iui-theme-dark${isHcString}`);
  } else {
    classes.remove(`iui-theme-dark${isHcString}`);
    classes.add(`iui-theme-light${isHcString}`);
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

export const decorators = [
  (Story, context) => {
    const {
      globals: { hc: highContrast },
    } = context;

    React.useEffect(() => {
      const classes = document.documentElement.classList;
      const currentTheme = Array.from(classes).find((cls) =>
        cls.startsWith('iui-theme'),
      );
      if (!currentTheme) {
        return;
      }

      if (highContrast && !currentTheme.includes('-hc')) {
        classes.remove(currentTheme);
        classes.add(`${currentTheme}-hc`);
        return;
      }

      if (!highContrast && currentTheme.includes('-hc')) {
        classes.remove(currentTheme);
        classes.add(`${currentTheme.split('-hc')[0]}`);
      }
    }, [highContrast]);

    return <Story />;
  },
];
