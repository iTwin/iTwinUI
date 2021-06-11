const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type everything turned on', {
    selectors: ['#demo-everything-turned-on'],
  }),
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type user', {
    selectors: ['#demo-user'],
  }),
  scenario('Type video', {
    selectors: ['#demo-video'],
  }),
  scenario('Type folder', {
    selectors: ['#demo-folder'],
  }),

  // Hover states
  //// Tile
  scenario('State hover', {
    actions: [hover('#test-tile-1')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State hover with thumbnail', {
    actions: [hover('#test-tile-2')],
    selectors: ['#test-tile-2'],
  }),

  //// Type Indicator hover
  scenario('State type indicator hover', {
    actions: [hover('#test-tile-1 .iui-type-indicator')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State type indicator hover with thumbnail', {
    actions: [hover('#test-tile-2 .iui-type-indicator')],
    selectors: ['#test-tile-2'],
  }),

  //// Quick Action hover
  scenario('State quick action hover', {
    actions: [hover('#test-tile-1 .iui-quick-action')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State quick action hover with thumbnail', {
    actions: [hover('#test-tile-2 .iui-quick-action')],
    selectors: ['#test-tile-2'],
  }),

  //// More Options hover
  scenario('State more options hover', {
    actions: [hover('#test-tile-1 .iui-more-options')],
    selectors: ['#test-tile-1'],
    misMatchThreshold: 0.1,
  }),

  //// Button hover
  scenario('State double button hover', {
    actions: [hover('#test-tile-1 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State single button hover', {
    actions: [hover('#test-tile-2 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-2'],
  }),

  // Focus states
  //// Tile
  scenario('State focus', {
    actions: [focus('#test-tile-1')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State focus with thumbnail', {
    actions: [focus('#test-tile-2')],
    selectors: ['#test-tile-2'],
  }),

  //// Type Indicator focus
  scenario('State type indicator focus', {
    actions: [focus('#test-tile-1 .iui-type-indicator')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State type indicator focus with thumbnail', {
    actions: [focus('#test-tile-2 .iui-type-indicator')],
    selectors: ['#test-tile-2'],
  }),

  //// Quick Action focus
  scenario('State quick action focus', {
    actions: [focus('#test-tile-1 .iui-quick-action')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State quick action focus with thumbnail', {
    actions: [focus('#test-tile-2 .iui-quick-action')],
    selectors: ['#test-tile-2'],
  }),

  //// Play Icon focus
  scenario('State play icon focus with thumbnail', {
    actions: [focus('#test-tile-3 .iui-play-icon')],
    selectors: ['#test-tile-3'],
  }),

  //// More Options focus
  scenario('State more options focus', {
    actions: [focus('#test-tile-1 .iui-more-options')],
    selectors: ['#test-tile-1'],
  }),

  //// Button focus
  scenario('State double button focus', {
    actions: [focus('#test-tile-1 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-1'],
  }),
  scenario('State single button focus', {
    actions: [focus('#test-tile-2 .iui-tile-buttons .iui-button')],
    selectors: ['#test-tile-2'],
  }),
];
