const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type data rich', {
    selectors: ['#demo-data-rich'],
  }),
  scenario('Type alarm', {
    selectors: ['#demo-alarm'],
  }),
  scenario('Type me', {
    selectors: ['#demo-me'],
  }),
];
