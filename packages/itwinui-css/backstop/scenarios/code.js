const { scenario, focus, scroll } = require('../scenarioHelper');

module.exports = [
  // Code types
  scenario('Type Codeblock', {
    selectors: ['#demo-codeblock'],
  }),
  scenario('Scroll Codeblock', {
    selectors: ['#demo-codeblock'],
    actions: [focus('.iui-codeblock-content'), scroll('.iui-codeblock-content', 500, 0)],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
];
