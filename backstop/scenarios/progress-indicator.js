const { scenario } = require('../scenarioHelper');

module.exports = [
  // Progress indicator types
  scenario('linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['.iui-indeterminate'],
  }),
  scenario('radial', {
    selectors: ['#demo-radial'],
    hideSelectors: ['.iui-indeterminate'],
  }),
  scenario('overlay', {
    selectors: ['#demo-overlay'],
    hideSelectors: ['.iui-indeterminate'],
  }),
];
