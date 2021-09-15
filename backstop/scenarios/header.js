const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Header types
  scenario('Type Default', {
    selectors: ['#demo-default'],
<<<<<<< HEAD
    hideSelectors: [
      '.iui-notification-primary::before',
      '.iui-notification-positive::before',
    ],
  }),
  scenario('Type Slim', {
    selectors: ['#demo-slim'],
    hideSelectors: [
      '.iui-notification-warning::before',
      '.iui-notification-negative::before',
    ],
=======
    misMatchThreshold: 0.02,
  }),
  scenario('Type Slim', {
    selectors: ['#demo-slim'],
    misMatchThreshold: 0.02,
>>>>>>> origin/main
  }),

  // Hover & focus states
  //// Default
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
<<<<<<< HEAD
    hideSelectors: [
      '.iui-notification-primary::before',
      '.iui-notification-positive::before',
    ],
=======
    misMatchThreshold: 0.02,
>>>>>>> origin/main
  }),

  //// Slim
  scenario('Type Slim State hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
<<<<<<< HEAD
    hideSelectors: [
      '.iui-notification-warning::before',
      '.iui-notification-negative::before',
    ],
=======
    misMatchThreshold: 0.02,
  }),

  //// Split
  scenario('Type Split State hover & focus', {
    actions: [hover('#test-button-6'), focus('#test-button-6')],
    selectors: ['#demo-split'],
    misMatchThreshold: 0.05,
>>>>>>> origin/main
  }),
];
