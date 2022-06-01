const { scenario } = require('../scenarioHelper');

module.exports = [
  // Code types
  scenario('Type Codeblock', {
    selectors: ['#demo-codeblock'],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
];
