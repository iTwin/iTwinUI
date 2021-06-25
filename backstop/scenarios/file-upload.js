const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type text area', {
    selectors: ['#demo-text-area'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type table', {
    selectors: ['#demo-table'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type not wrapping anything', {
    selectors: ['#demo-no-wrap'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
