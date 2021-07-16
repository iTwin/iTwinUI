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
      name: '@storybook/addon-docs',
    },
    '@storybook/addon-controls',
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
    '@storybook/addon-actions',
    'creevey',
  ],
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
