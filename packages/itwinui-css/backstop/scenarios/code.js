const { scenario, scroll } = require('../scenarioHelper');

module.exports = [
  // Code types
  scenario('Type Codeblock', {
    selectors: ['#demo-codeblock'],
  }),
  scenario('Scroll Codeblock', {
    selectors: ['#demo-codeblock'],
    actions: [scroll('.iui-codeblock-content', 1000, 0)],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
];
