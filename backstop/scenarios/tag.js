const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type basic', {
    selectors: ['#demo-basic'],
  }),
  scenario('Type container', {
    selectors: ['#demo-default-container'],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#test-tag-1')],
    selectors: ['#demo-default'],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#test-tag-1')],
    selectors: ['#demo-default'],
  }),
];
