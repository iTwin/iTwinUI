const { scenario } = require('../scenarioHelper');

module.exports = [
  // Table types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Extras', {
    selectors: ['#demo-extras'],
  }),
  scenario('Type Loading', {
    selectors: ['#demo-loading'],
  }),
  scenario('Type Empty', {
    selectors: ['#demo-empty-state'],
  }),
];
