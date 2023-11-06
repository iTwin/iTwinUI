/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.{js,jsx,ts,tsx,mdx}',
  port: 6006,
  previewPort: 6006,
  base: './', // relative paths needed for deploying to gh-pages subpaths
  defaultStory: 'overview--readme',
  storyOrder: (stories) => [
    'overview--readme',
    ...stories.filter((s) => s !== 'overview--readme'),
  ],
  addons: {
    a11y: {
      enabled: process.env.NODE_ENV === 'development',
    },
  },
};
