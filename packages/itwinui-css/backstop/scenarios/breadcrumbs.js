/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Hover & focus states
  scenario('State hover and focus breadcrumb anchors', {
    actions: [hover('#test-1'), focus('#test-2')],
    selectors: ['#demo-anchors'],
  }),
  scenario('State hover and focus breadcrumb buttons', {
    actions: [hover('#test-3'), focus('#test-4')],
    selectors: ['#demo-buttons-1'],
  }),
  scenario('State hover and focus overflow buttons', {
    actions: [hover('#overflow-hover'), focus('#overflow-focus')],
    selectors: ['#demo-buttons-2'],
  }),
];
