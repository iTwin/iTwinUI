/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const preset = require('configs/eslint-preset');

module.exports = {
  ...preset,
  extends: [...preset.extends, 'plugin:storybook/recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/cypress/**',
    '.eslintrc.js',
    'scripts/**',
  ],
};
