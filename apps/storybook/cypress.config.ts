/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'cypress';
import plugins from './cypress/plugins/index.js';

export default defineConfig({
  fixturesFolder: false,
  video: false,
  retries: {
    runMode: 3,
  },
  viewportHeight: 768,
  viewportWidth: 1024,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return plugins(on, config);
    },
    specPattern: 'src/**/*.test.{js,ts,jsx,tsx}',
    baseUrl: 'http://localhost:6006',
  },
});
