/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('alternative layouts', {
    selectors: ['#demo-alternative-layouts'],
  }),
  // Hover
  scenario('State hover', {
    actions: [hover('#test-radio-tile-content')],
    selectors: ['#demo-default'],
  }),
  // Focus
  scenario('State focus', {
    actions: [focus('#test-radio-tile-input-1')],
    selectors: ['#demo-default'],
  }),
  // Focus and checked
  scenario('State focus and checked', {
    actions: [focus('#test-radio-tile-input-0')],
    selectors: ['#demo-default'],
  }),
];
