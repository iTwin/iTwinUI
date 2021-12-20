const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Sizes', {
    selectors: ['#demo-icons'],
  }),

  scenario('Colors', {
    selectors: ['#demo-status'],
  }),
];
