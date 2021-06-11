const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type non-actionable', {
    selectors: ['#demo-icons'],
  }),
  scenario('Type with status', {
    selectors: ['#demo-status'],
  }),
];
