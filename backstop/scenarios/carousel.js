/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),

  scenario('Type many slides', {
    selectors: ['#demo-many-slides'],
    viewports: [{ width: 800, height: 600 }],
  }),

  scenario('Type counter', {
    selectors: ['#demo-counter'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-1'), focus('#test-2')],
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
