const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Header types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Slim', {
    selectors: ['#demo-slim'],
  }),

  // Hover & focus states
  //// Default
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
  }),

  //// Slim
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
  }),
];
