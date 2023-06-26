/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Tag types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Container', {
    selectors: ['#demo-default-container'],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-tag-1'), focus('#test-tag-2')],
    selectors: ['#demo-default'],
  }),
];
