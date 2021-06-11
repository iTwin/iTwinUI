const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type default opened', {
    selectors: ['#demo-default-opened'],
  }),
  scenario('Sizes', {
    selectors: ['#demo-sizes'],
  }),

  // Hover states
  //// Select
  scenario('State hover', {
    actions: [hover('#test-select-1')],
    selectors: ['#demo-default-singular'],
  }),

  //// Select menu item
  scenario('State menu hover', {
    actions: [hover('#test-select-2')],
    selectors: ['#demo-default-singular-opened'],
  }),

  // Focus states
  //// Select
  scenario('State focus', {
    actions: [focus('#test-select-1')],
    selectors: ['#demo-default-singular'],
  }),

  //// Select menu item
  scenario('State menu focus', {
    actions: [focus('#test-select-2')],
    selectors: ['#demo-default-singular-opened'],
  }),
];
