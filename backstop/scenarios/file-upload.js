const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type text area', {
    selectors: ['#demo-text-area'],
  }),
  scenario('Type flextable', {
    selectors: ['#demo-table'],
  }),
  scenario('Type not wrapping anything', {
    selectors: ['#demo-no-wrap'],
  }),
];
