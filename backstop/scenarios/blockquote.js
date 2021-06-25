const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type all', {
    selectors: ['#demo-blockquote'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
