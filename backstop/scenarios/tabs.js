const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type borderless', {
    selectors: ['#demo-borderless'],
  }),
  scenario('Type pill', {
    selectors: ['#demo-pill'],
  }),
];
