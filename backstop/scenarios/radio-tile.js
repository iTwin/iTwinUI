/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  // Hover
  scenario('State hover', {
    actions: [hover('#test-radio-tile-content')],
    selectors: ['#test-radio-tile-content'],
  }),
  // Focus
  scenario('State focus', {
    actions: [focus('#test-radio-tile-input')],
    selectors: ['#test-radio-tile-content'],
  }),
];
