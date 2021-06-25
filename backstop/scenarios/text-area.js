const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type inline', {
    selectors: ['#demo-inline'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
