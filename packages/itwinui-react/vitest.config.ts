/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
    coverage: {
      provider: 'v8',
    },
    reporters: ['junit', 'verbose'],
    outputFile: 'coverage/junit-report.xml',
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
