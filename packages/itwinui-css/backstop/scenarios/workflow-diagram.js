const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
