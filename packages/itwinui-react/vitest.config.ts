/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vitest/config';
import * as path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
    exclude: ['/node_modules/', '/esm/', '/cjs/'],
    reporters: ['junit', 'default'],
    outputFile: 'coverage/junit.xml',
    css: false,
    alias: [
      {
        find: /^(.*)\/styles.js$/,
        replacement: path.resolve('./__mocks__/styles.js'),
      },
    ],
    typecheck: {
      enabled: true,
    },
  },
  plugins: [
    {
      name: 'mock-css',
      resolveId(id) {
        if (id.endsWith('styles.css')) {
          return id;
        }
        return null;
      },
    },
  ],
});
