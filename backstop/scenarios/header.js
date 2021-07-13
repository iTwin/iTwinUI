const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Header types
  scenario('Type Default', {
    selectors: ['#demo-default'],
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
  }),

  // Hover & focus states
  //// Default
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-1'), focus('#test-button-2')],
    selectors: ['#demo-default'],
    hideSelectors: [
      '.iui-notification-primary::before',
      '.iui-notification-positive::before',
    ],
  }),

  //// Slim
  scenario('Type Default State hover & focus', {
    actions: [hover('#test-button-3'), focus('#test-button-4')],
    selectors: ['#demo-slim'],
    hideSelectors: [
      '.iui-notification-warning::before',
      '.iui-notification-negative::before',
    ],
  }),
];
