/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('With Captions', {
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('With Checkbox', {
    selectors: ['#demo-checkbox'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Disabled', {
    selectors: ['#demo-disabled'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('With Icons', {
    selectors: ['#demo-icons'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  scenario('State hover tree node', {
    actions: [hover('#test-node')],
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('State focus tree node', {
    actions: [focus('#test-node')],
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
