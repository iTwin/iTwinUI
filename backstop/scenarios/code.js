const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type codeblock', {
    selectors: ['#demo-codeblock'],
  }),
  scenario('Type inline', {
    selectors: ['#demo-inline'],
  }),
];
