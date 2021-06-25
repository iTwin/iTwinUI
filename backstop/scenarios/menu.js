const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type all', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
