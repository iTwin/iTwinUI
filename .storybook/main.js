/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const WebpackFailOnWarningsPlugin = require('./webpack-fail-on-warnings-plugin');

module.exports = {
  stories: [
    '../stories/intro/*.stories.tsx',
    '../stories/core/**/*.stories.tsx',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { measure: false, outline: false },
    },
    'storybook-dark-mode/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.tsx?$/,
        },
        loaderOptions: {
          parser: 'typescript',
        },
      },
    },
    './hcThemeAddon/register.js',
    'creevey',
    '@storybook/addon-a11y',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.plugins.push(new WebpackFailOnWarningsPlugin());
    }
    return config;
  },
  babel: async (options) => ({
    ...options,
    plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  }),
};
