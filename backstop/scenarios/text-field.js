const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type without label', {
    selectors: ['#demo-no-label'],
  }),
];
