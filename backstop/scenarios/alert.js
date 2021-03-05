const { scenario, hover } = require('../scenarioHelper');

module.exports = [
  scenario('basic'),
  scenario('hover link in informational', {
    actions: [
      hover('.iui-alerts-informational:not(.iui-sticky) .iui-alerts-link'),
    ],
    selectors: ['.iui-alerts-informational:not(.iui-sticky)'],
  }),
  scenario('hover link in positive', {
    actions: [hover('.iui-alerts-positive .iui-alerts-link')],
    selectors: ['.iui-alerts-positive'],
  }),
  scenario('hover link in warning', {
    actions: [hover('.iui-alerts-warning .iui-alerts-link')],
    selectors: ['.iui-alerts-warning'],
  }),
  scenario('hover link in negative', {
    actions: [hover('.iui-alerts-negative .iui-alerts-link')],
    selectors: ['.iui-alerts-negative'],
  }),
];
