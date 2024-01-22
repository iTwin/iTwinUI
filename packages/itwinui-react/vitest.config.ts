/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vitest/config';

console.log(__dirname);
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
    css: true,
  },
  resolve: {
    alias: [
      {
        find: /^(.*)\/styles.js$/,
        replacement: `${__dirname}/src/__mocks__/stylesMock.cjs`,
      },
    ],
  },
});
