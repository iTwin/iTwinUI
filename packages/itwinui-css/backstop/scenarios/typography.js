const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('Type all', {
    selectors: ['#demo-typography'],
  }),

  scenario('Type skeleton text', {
    actions: [click('.iui-toggle-switch')],
    selectors: ['#demo-typography'],
  }),
];
