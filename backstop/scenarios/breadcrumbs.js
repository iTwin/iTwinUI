/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Breadcrumb types
  scenario('Type Breadcrumb', {
    selectors: ['#demo-all'],
  }),

  // Hover & focus states
  scenario('State hover and focus links', {
    actions: [hover('#test-1'), focus('#test-2')],
    selectors: ['#demo-anchors'],
  }),
  scenario('State hover and focus buttons', {
    actions: [hover('#test-3'), focus('#test-4')],
    selectors: ['#demo-buttons'],
  }),
];
