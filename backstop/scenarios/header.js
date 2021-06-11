const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type slim', {
    selectors: ['#demo-slim'],
  }),

  // Hover & focus states
  //// Default
  scenario('Type default state hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
  }),

  //// Slim
  scenario('Type slim state hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
  }),
];
