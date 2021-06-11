const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type time', {
    selectors: ['#demo-time'],
  }),
  scenario('Type time with minutes', {
    selectors: ['#demo-time-minutes'],
  }),
];
