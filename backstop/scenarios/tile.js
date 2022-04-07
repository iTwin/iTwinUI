const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Tile types
  scenario('Type Everything turned on', {
    selectors: ['#demo-everything-turned-on'],
  }),
  scenario('Type Default', {
    selectors: ['#demo-default'],
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

  // Entire tile hover & focus states
  scenario('State hover & focus with thumbnail', {
    actions: [hover('#test-tile-4'), focus('#test-tile-5')],
    selectors: ['#demo-default'],
  }),
  scenario('State focus & hover with thumbnail', {
    actions: [hover('#test-tile-5'), focus('#test-tile-4')],
    selectors: ['#demo-default'],
  }),
  scenario('State focus selected tile', {
    actions: [focus('#test-tile-6')],
    selectors: ['#demo-default'],
  }),

  // Type Indicator & Quick Action hover & focus
  scenario('State Type Indicator & Quick Action hover & focus', {
    actions: [
      hover('#test-tile-1 .iui-tile-thumbnail-type-indicator'),
      focus('#test-tile-2 .iui-tile-thumbnail-quick-action'),
    ],
    selectors: ['#demo-everything-turned-on'],
  }),
  scenario('State Type Indicator & Quick Action focus & hover', {
    actions: [
      focus('#test-tile-1 .iui-tile-thumbnail-type-indicator'),
      hover('#test-tile-2 .iui-tile-thumbnail-quick-action'),
    ],
    selectors: ['#demo-everything-turned-on'],
  }),

  // More Options hover & focus
  scenario('State More Options hover', {
    actions: [hover('#test-tile-1 #test-button'), focus('#test-tile-2 #test-button-2')],
    selectors: ['#demo-everything-turned-on'],
    misMatchThreshold: 0.1,
  }),

  // Button hover & focus
  scenario('State Tile Button hover & focus', {
    actions: [hover('#test-tile-1 .iui-tile-buttons .iui-button'), focus('#test-tile-2 .iui-tile-buttons .iui-button')],
    selectors: ['#demo-everything-turned-on'],
  }),
  scenario('State Tile Button focus & hover', {
    actions: [hover('#test-tile-2 .iui-tile-buttons .iui-button'), focus('#test-tile-1 .iui-tile-buttons .iui-button')],
    selectors: ['#demo-everything-turned-on'],
  }),
];
