const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Sizes', {
    selectors: ['#demo-sizes'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#test-select-1')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#test-select-1')],
    selectors: ['#demo-default-singular'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
