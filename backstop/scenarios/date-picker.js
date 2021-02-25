const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    actions: [click('#date-picker-toggle')],
    selectors: ['.iui-date-picker-calendar']
  }),
];
