/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Hover & focus states
  scenario('State hover and focus breadcrumb anchors', {
    actions: [hover('#test-5'), focus('#test-6')],
    selectors: ['#demo-anchors-2'],
  }),
  scenario('State hover and focus breadcrumb buttons', {
    actions: [hover('#test-7'), focus('#test-8')],
    selectors: ['#demo-buttons-2'],
  }),
  scenario('State hover and focus overflow buttons', {
    actions: [hover('#overflow-hover'), focus('#overflow-focus')],
    selectors: ['#demo-buttons-3'],
  }),
];
