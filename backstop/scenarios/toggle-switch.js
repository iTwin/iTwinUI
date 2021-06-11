const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type no-label', {
    selectors: ['#demo-no-label'],
    hideSelectors: ['h3'],
  }),
];
