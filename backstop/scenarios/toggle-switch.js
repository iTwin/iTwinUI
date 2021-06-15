const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('no-label', {
    selectors: ['#demo-no-label'],
    hideSelectors: ['h3'],
  }),
];
