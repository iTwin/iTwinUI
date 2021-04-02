const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Select types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Default Opened', {
    selectors: ['#demo-default-opened'],
  }),

  // Hover states
  //// Select
  scenario('State hover', {
    actions: [hover('#test-select-1')],
    selectors: ['#demo-default-singular'],
  }),

  //// Select menu item
  scenario('State Menu hover', {
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
  scenario('State Menu focus', {
    actions: [focus('#test-select-2')],
    selectors: ['#demo-default-singular-opened'],
  }),
];
