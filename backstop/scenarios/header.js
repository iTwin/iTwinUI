const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 1200, height: 600 }],
  }),
  scenario('Type slim', {
    selectors: ['#demo-slim'],
    viewports: [{ width: 1200, height: 600 }],
  }),

  // Hover & focus states
  //// Default
  scenario('Type default state hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
    viewports: [{ width: 1200, height: 600 }],
  }),

  //// Slim
  scenario('Type slim state hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
    viewports: [{ width: 1200, height: 600 }],
  }),
];
