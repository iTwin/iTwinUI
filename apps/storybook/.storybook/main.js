/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { mergeConfig } = require('vite');

/**
 * @type {import('@storybook/builder-vite').StorybookViteConfig}
 */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['./public'],
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
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: configType === 'PRODUCTION' ? './' : '/',
      server: {
        watch: {
          ignored: ['cypress-visual-report', 'cypress-visual-report/**'],
        },
      },
      build: {
        sourcemap: configType === 'DEVELOPMENT',
      },
    });
  },
};
