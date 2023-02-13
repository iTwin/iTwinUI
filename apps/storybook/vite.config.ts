/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  server: {
    watch: {
      ignored: ['cypress-visual-report', 'cypress-visual-report/**'],
    },
  },
  build: {
    sourcemap: command === 'serve',
  },
}));
