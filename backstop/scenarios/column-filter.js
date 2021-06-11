const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type text filter', {
    selectors: ['#demo-text'],
  }),
  scenario('Type date filter', {
    selectors: ['#demo-date'],
  }),
];
