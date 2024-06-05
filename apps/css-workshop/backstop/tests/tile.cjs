/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario: _scenario, hover, focus } = require('./~scenarioHelper.cjs');

/**
 * @type import('./~scenarioHelper.cjs').Scenario
 */
const scenario = (name, options) =>
  _scenario(name, {
    ...options,
    hideSelectors: ['.demo-photo', '.demo-map', ...(options.hideSelectors ?? [])],
  });

module.exports = [
  // Tile types
  scenario('Type Everything turned on', {
    selectors: ['#demo-everything-turned-on'],
  }),
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Action States', {
    selectors: ['#demo-action-states'],
  }),
  scenario('Type Folder Action States', {
    selectors: ['#demo-action-states-folders'],
  }),
  scenario('Type User', {
    selectors: ['#demo-user'],
  }),
  scenario('Type Video', {
    selectors: ['#demo-video'],
  }),
  scenario('Type Folder', {
    selectors: ['#demo-folder'],
  }),

  // Hover states
  //// Tile
  scenario('State hover', {
    actions: [hover('#test-tile-4')],
    selectors: ['#demo-default'],
  }),
  scenario('State hover with thumbnail', {
    actions: [hover('#test-tile-5')],
    selectors: ['#demo-default'],
  }),

  //// Type Indicator hover
  scenario('State Type Indicator hover', {
    actions: [hover('#test-tile-1 .iui-tile-thumbnail-type-indicator .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Type Indicator hover with thumbnail', {
    actions: [hover('#test-tile-2 .iui-tile-thumbnail-type-indicator .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  //// Quick Action hover
  scenario('State Quick Action hover', {
    actions: [hover('#test-tile-1 .iui-tile-thumbnail-quick-action .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Quick Action hover with thumbnail', {
    actions: [hover('#test-tile-2 .iui-tile-thumbnail-quick-action .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  //// More Options hover
  scenario('State More Options hover', {
    actions: [hover('#test-tile-1'), hover('#test-button')],
    selectors: ['#test-tile-1'],
    misMatchThreshold: 0.1,
  }),

  //// Button hover
  scenario('State Double Button hover', {
    actions: [hover('#test-tile-1 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Single Button hover', {
    actions: [hover('#test-tile-2 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  // Focus states
  //// Tile
  scenario('State focus', {
    actions: [focus('#test-tile-4-name')],
    selectors: ['#test-tile-4'],
  }),
  scenario('State focus with thumbnail', {
    actions: [focus('#test-tile-5-name')],
    selectors: ['#test-tile-5'],
  }),

  //// Type Indicator focus
  scenario('State Type Indicator focus', {
    actions: [focus('#test-tile-1 .iui-tile-thumbnail-type-indicator .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Type Indicator focus with thumbnail', {
    actions: [focus('#test-tile-2 .iui-tile-thumbnail-type-indicator .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  //// Quick Action focus
  scenario('State Quick Action focus', {
    actions: [focus('#test-tile-1 .iui-tile-thumbnail-quick-action .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Quick Action focus with thumbnail', {
    actions: [focus('#test-tile-2 .iui-tile-thumbnail-quick-action .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  //// Play Icon focus
  scenario('State Play Icon focus with thumbnail', {
    actions: [focus('#test-tile-3 .iui-thumbnail-icon')],
    selectors: ['#test-tile-3'],
  }),

  //// More Options focus
  scenario('State More Options focus', {
    actions: [focus('#test-button')],
    selectors: ['#test-tile-1'],
  }),

  //// Button focus
  scenario('State Double Button focus', {
    actions: [focus('#test-tile-1 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State Single Button focus', {
    actions: [focus('#test-tile-2 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-2'],
  }),
];
