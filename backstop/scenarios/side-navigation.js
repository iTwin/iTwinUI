const { scenario } = require('../scenarioHelper');

module.exports = [
  // Side Navigation types
  scenario('Type collapsed', {
    selectors: ['#demo-side-navigation'],
  }),
  scenario('Type expanded', {
    actions: [click('#test-expand')],
    selectors: ['#demo-side-navigation'],
  }),
];
