/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
    hideSelectors: ['h1', 'hr', '#demo-elevations'],
  }),

  scenario('Type elevations', {
    selectors: ['#demo-elevations'],
    viewports: [{ width: 800, height: 600 }],
    hideSelectors: ['#demo-default'],
  }),
];
