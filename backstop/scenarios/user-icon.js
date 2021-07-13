const { scenario, hover } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    misMatchThreshold: 0.1,
  }),
  scenario('Type online status', {
    selectors: ['#demo-status'],
  }),
  scenario('Type list', {
    selectors: ['#demo-list'],
  }),
  scenario('Type stacked', {
    selectors: ['#demo-stacked'],
  }),
  scenario('Type animated', {
    selectors: ['#demo-animated'],
  }),

  // Hover states
  //// Animated
  // scenario('State hover animated', {
  //   actions: [hover('#test-animated-1')],
  //   selectors: ['#demo-animated-1'],
  //   postInteractionWait: 1000,
  // }),
];
