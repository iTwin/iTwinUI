/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type Hybrid', {
    selectors: ['#demo-hybrid'],
  }),
  scenario('Type Without Label', {
    selectors: ['#demo-no-label'],
  }),
  scenario('Type SearchBox', {
    selectors: ['#demo-search-box'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('State hover in default', {
    actions: [hover('#test-default-singular')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('State focus in default', {
    actions: [focus('#test-default-singular')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('State hover with status', {
    actions: [hover('#test-status-singular')],
    selectors: ['#demo-status-singular'],
    viewports: [{ width: 800, height: 800 }],
  }),
  scenario('State focus with status', {
    actions: [focus('#test-status-singular')],
    selectors: ['#demo-status-singular'],
    viewports: [{ width: 800, height: 800 }],
  }),
];
