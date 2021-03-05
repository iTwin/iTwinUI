const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['.iui-indeterminate'],
  }),
  scenario('radial', {
    selectors: ['#demo-radial'],
    hideSelectors: ['.iui-indeterminate'],
  }),
];
