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
  scenario('State hover & focus', {
    actions: [hover('#test-tag-1'), focus('#test-tag-2')],
    selectors: ['#demo-default'],
  }),
  scenario('State hover basic', {
    actions: [hover('#test-tag-3')],
    selectors: ['#demo-basic'],
  }),
];
