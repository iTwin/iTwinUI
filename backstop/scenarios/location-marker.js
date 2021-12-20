const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Default', {
    selectors: ['#demo-default'],
  }),

  scenario('Data-rich', {
    selectors: ['#demo-data-rich'],
  }),

  scenario('My location', {
    selectors: ['#demo-my-location'],
  }),
];
