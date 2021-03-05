const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('label', {
    selectors: ['#demo-label'],
  }),
  scenario('tiles', {
    selectors: ['#demo-tiles'],
  }),
];
