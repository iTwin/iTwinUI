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
    css: true,
  },
  resolve: {
    alias: {
      'styles.js$': '<rootDir>/src/__mocks__/stylesMock.cjs',
      'useGlobals.js$': '<rootDir>/src/__mocks__/useGlobalsMock.cjs',
      '^(\\.\\.?\\/.+)\\.jsx?$': '$1', // see https://github.com/kulshekhar/ts-jest/issues/1057
    },
  },
});
