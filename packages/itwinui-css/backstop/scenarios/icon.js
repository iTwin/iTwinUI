const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Basic', {
    selectors: ['#demo-icons'],
  }),
  scenario('Status colors', {
    selectors: ['#demo-status'],
  }),
  scenario('Autoscale with text', {
    selectors: ['#demo-typography'],
  }),
];
