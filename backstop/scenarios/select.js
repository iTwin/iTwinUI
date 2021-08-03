const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Select types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Sizes', {
    selectors: ['#demo-sizes'],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#test-select-1')],
    selectors: ['#demo-default-singular'],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#test-select-1')],
    selectors: ['#demo-default-singular'],
  }),
];
