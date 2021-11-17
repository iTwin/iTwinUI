const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type Without Label', {
    selectors: ['#demo-no-label'],
  }),
];
