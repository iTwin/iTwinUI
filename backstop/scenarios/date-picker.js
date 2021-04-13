const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Date picker types
  scenario('Type Date', {
    selectors: ['#demo-date'],
  }),

  // Hover states
  //// Date
  scenario('State hover date', {
    actions: [hover('#test-date')],
    selectors: ['#demo-date'],
  }),

  // Focus states
  //// Date
  scenario('State focus date', {
    actions: [focus('#test-date')],
    selectors: ['#demo-date'],
  }),
];
