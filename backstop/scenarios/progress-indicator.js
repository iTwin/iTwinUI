const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['.iui-indeterminate', 'h3'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type radial', {
    selectors: ['#demo-radial'],
  }),
  scenario('Type overlay', {
    selectors: ['#demo-overlay'],
    hideSelectors: ['.iui-fill', '.iui-track .iui-indeterminate'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
