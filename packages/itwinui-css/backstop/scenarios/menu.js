/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Menu types
  scenario('Type Default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Header', {
    selectors: ['#demo-header'],
    misMatchThreshold: 0.01,
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Skeleton', {
    selectors: ['#demo-skeleton'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Multilevel', {
    selectors: ['#demo-multilevel'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-menu-1'), focus('#test-menu-2')],
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  // Skeleton should not be have hover background
  scenario('Hover Skeleton', {
    selectors: ['#demo-skeleton'],
    actions: [hover('#test-menu-item-skeleton')],
    viewports: [{ width: 800, height: 600 }],
  }),
];
