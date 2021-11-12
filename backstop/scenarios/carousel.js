/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type Actionable', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('Type Actionable', {
    actions: [hover('#test-1'), focus('#test-2')],
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
