const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Tag types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Basic', {
    selectors: ['#demo-basic'],
  }),
  scenario('Type Container', {
    selectors: ['#demo-default-container'],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#test-tag-1')],
    selectors: ['#demo-default'],
  }),
  scenario('State focus', {
    actions: [focus('#test-tag-1')],
    selectors: ['#demo-default'],
  }),
  scenario('State hover basic', {
    actions: [hover('#test-tag-2')],
    selectors: ['#demo-basic'],
  }),
];
