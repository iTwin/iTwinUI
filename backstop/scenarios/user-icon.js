const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type status', {
    selectors: ['#demo-status'],
  }),
];
