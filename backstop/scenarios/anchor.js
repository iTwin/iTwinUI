/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('All', {
    selectors: ['#demo-default'],
  }),

  scenario('Hover 1st & focus 2nd', {
    selectors: ['#demo-default'],
    actions: [hover('#test-1'), focus('#test-2')],
  }),

  scenario('Hover 2nd & focus 1st', {
    selectors: ['#demo-default'],
    actions: [hover('#test-2'), focus('#test-1')],
  }),
];
