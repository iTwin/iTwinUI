/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Alert types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type sticky', {
    selectors: ['#demo-sticky'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover link & focus close button', {
    selectors: ['#test-single-alert'],
    actions: [hover('#test-single-alert a'), focus('#test-single-alert button')],
    viewports: [{ width: 400, height: 600 }],
  }),
  scenario('State hover close button & focus link', {
    selectors: ['#test-single-alert'],
    actions: [hover('#test-single-alert button'), focus('#test-single-alert a')],
    viewports: [{ width: 400, height: 600 }],
  }),
];
