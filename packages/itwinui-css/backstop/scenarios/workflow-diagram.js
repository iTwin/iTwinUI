/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type workflow', {
    selectors: ['#demo-workflow'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
