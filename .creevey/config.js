/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const path = require('path');

module.exports = {
  // Pixelmatch options
  diffOptions: { threshold: 0.1 },
  // How many times test should be retried before to consider it as failed
  maxRetries: 3,
  // Where original images are stored
  screenDir: path.join(__dirname, '../tests/images'),
  // Report directory that contains data from previous runs
  reportDir: path.join(__dirname, '../tests/report'),
  // Describe browsers and their options
  browsers: {
    chrome: {
      browserName: 'chrome',
      version: '97.0',
      // Increase parallel sessions
      limit: 5,
    },
  },
};
