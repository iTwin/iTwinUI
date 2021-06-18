const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type online status', {
    selectors: ['#demo-status'],
  }),
  scenario('Type list', {
    selectors: ['#demo-list'],
  }),
  scenario('Type animated', {
    selectors: ['#demo-animated'],
  }),
];
