/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type label left', {
    selectors: ['#demo-toggle-right'],
  }),
  scenario('Type label right', {
    selectors: ['#demo-toggle-left'],
  }),
  scenario('Type label none', {
    selectors: ['#demo-toggle-no-label'],
  }),

  // Hover & focus states
  scenario('State hover checked & focus unchecked', {
    actions: [hover('#test-toggle-1'), focus('#test-toggle-2')],
    selectors: ['#demo-default'],
  }),
  scenario('State focus checked & hover unchecked', {
    actions: [hover('#test-toggle-2'), focus('#test-toggle-1')],
    selectors: ['#demo-default'],
  }),
];
