const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
