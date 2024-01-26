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
    exclude: ['/node_modules/', '/esm/', '/cjs/'],
    reporters: ['junit', 'default'],
    outputFile: 'coverage/junit.xml',
    css: false,
  },
});
