/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Slider types
  scenario('Type Horizontal', {
    selectors: ['#demo-horizontal'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Horizontal extras', {
    selectors: ['#demo-horizontal-extras'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Vertical', {
    selectors: ['#demo-vertical'],
  }),
  scenario('Type Vertical extras', {
    selectors: ['#demo-vertical-extras'],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-slider-2'), focus('#test-slider-1')],
    selectors: ['#demo-horizontal'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
