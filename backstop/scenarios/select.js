const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type default opened', {
    selectors: ['#demo-default-opened'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Sizes', {
    selectors: ['#demo-sizes'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  //// Select
  scenario('State hover', {
    actions: [hover('#test-select-1')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),

  //// Select menu item
  scenario('State menu hover', {
    actions: [hover('#test-select-2')],
    selectors: ['#demo-default-singular-opened'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  //// Select
  scenario('State focus', {
    actions: [focus('#test-select-1')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),

  //// Select menu item
  scenario('State menu focus', {
    actions: [focus('#test-select-2')],
    selectors: ['#demo-default-singular-opened'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
