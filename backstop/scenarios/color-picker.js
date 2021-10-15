/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Color picker types
  scenario('Basic', {
    selectors: ['#demo-basic'],
  }),
  scenario('Advanced', {
    selectors: ['#demo-advanced'],
  }),

  // Hover states
  scenario('State hover color swatch', {
    actions: [hover('#test-color-swatch')],
    selectors: ['#demo-basic'],
  }),
  scenario('State hover color dot', {
    actions: [hover('#test-color-dot')],
    selectors: ['#demo-advanced-interactions'],
  }),

  // Focus states
  scenario('State focus color swatch', {
    actions: [focus('#test-color-swatch')],
    selectors: ['#demo-basic'],
  }),
  scenario('State focus color dot', {
    actions: [focus('#test-color-dot')],
    selectors: ['#demo-advanced-interactions'],
  }),
];
