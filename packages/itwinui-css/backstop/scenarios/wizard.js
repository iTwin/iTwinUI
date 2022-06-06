const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type workflow', {
    selectors: ['#demo-workflow'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
