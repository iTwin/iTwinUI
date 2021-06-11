const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type no label', {
    selectors: ['#demo-no-label'],
    hideSelectors: ['.iui-indeterminate', 'h3'],
  }),
];
