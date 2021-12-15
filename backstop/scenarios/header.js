const { scenario, hover, focus, click } = require('../scenarioHelper');

module.exports = [
  // Header types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Slim', {
    selectors: ['#demo-slim'],
    misMatchThreshold: 0.02,
  }),
  scenario('Type Slim', {
    selectors: ['#demo-slim'],
    misMatchThreshold: 0.02,
  }),

  // Hover & focus states
  //// Default
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
    misMatchThreshold: 0.02,
  }),

  //// Disabled
  scenario('Type Default State hover & focus', {
    actions: [click('#disabled-toggle')],
    selectors: ['#demo-split'],
    misMatchThreshold: 0.02,
    viewports: [{ width: 800, height: 600 }],
  }),

  //// Slim
  scenario('Type Slim State hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
    misMatchThreshold: 0.05,
  }),

  //// Split
  scenario('Type Split State hover & focus', {
    actions: [hover('#test-button-6'), focus('#test-button-6')],
    selectors: ['#demo-split'],
    misMatchThreshold: 0.05,
  }),

  // Narrow screens
  scenario('Type All - narrow screen', {
    selectors: ['#demo-all'],
    viewports: [
      { width: 800, height: 600 },
      { width: 600, height: 400 },
      { width: 500, height: 400 },
    ],
    hideSelectors: ['h2', 'hr'],
    misMatchThreshold: 0.02,
  }),
];
