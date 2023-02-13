/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { mergeConfig } from 'vite';

export const stories = [
  '../src/**/*.mdx',
  '../src/**/*.stories.@(js|jsx|ts|tsx)',
];
export const staticDirs = ['./public'];
export const addons = [
  {
    name: '@storybook/addon-essentials',
    options: {
      measure: false,
      outline: false,
    },
  },
  'storybook-dark-mode',
  {
    name: '@storybook/addon-storysource',
    options: {
      rule: {
        test: /\.stories\.tsx?$/,
      },
      loaderOptions: {
        parser: 'typescript',
        injectStoryParameters: false,
      },
    },
  },
  './hcThemeAddon/register.js',
  '@storybook/addon-a11y',
];
export const framework = {
  name: '@storybook/react-vite',
  options: {},
};
export async function viteFinal(config, { configType }) {
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
}
export const docs = {
  autodocs: true,
};
