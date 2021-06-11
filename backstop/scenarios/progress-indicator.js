const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['.iui-indeterminate', 'h3'],
  }),
  scenario('Type radial', {
    selectors: ['#demo-radial'],
  }),
  scenario('Type overlay', {
    selectors: ['#demo-overlay'],
    hideSelectors: ['.iui-indeterminate'],
  }),
];
