const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type workflow', {
    selectors: ['#demo-workflow'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
