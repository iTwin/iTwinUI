/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Slider types
  scenario('Type Default', {
    selectors: ['#demo-horizontal'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Range', {
    selectors: ['#demo-horizontal-extras'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Default Vertical', {
    selectors: ['#demo-vertical'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Range Vertical', {
    selectors: ['#demo-vertical-extras'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-slider-2'), focus('#test-slider-1')],
    selectors: ['#demo-horizontal'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
