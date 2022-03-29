/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('All', {
    selectors: ['#demo-default'],
  }),

  scenario('Hover primary & focus positive', {
    selectors: ['#demo-default'],
    actions: [hover('#test-1'), focus('#test-2')],
  }),

  scenario('Hover positive & focus warning', {
    selectors: ['#demo-default'],
    actions: [hover('#test-2'), focus('#test-3')],
  }),

  scenario('Hover warning & focus negative', {
    selectors: ['#demo-default'],
    actions: [hover('#test-3'), focus('#test-4')],
  }),

  scenario('Hover negative & focus primary', {
    selectors: ['#demo-default'],
    actions: [hover('#test-4'), focus('#test-1')],
  }),
];
