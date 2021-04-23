const { scenario } = require('../scenarioHelper');

module.exports = [scenario('basic')];

module.exports = [
  // User icon types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type online status', {
    selectors: ['#demo-status'],
  }),
];
