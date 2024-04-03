/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require('configs/eslint-preset');

module.exports = {
  ...preset,
  extends: [...preset.extends, 'plugin:require-extensions/recommended'],
  plugins: [...preset.plugins, 'require-extensions'],
  rules: {
    ...preset.rules,
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
