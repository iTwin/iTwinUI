const { scenario } = require('../scenarioHelper');

module.exports = [
  // Column filter types
  scenario('Type Text filter', {
    selectors: ['#demo-text'],
  }),
  scenario('Type Date filter', {
    selectors: ['#demo-date'],
  }),
];
