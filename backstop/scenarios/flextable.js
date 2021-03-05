const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('zebra-striping', {
    selectors: ['#demo-zebra-striping'],
  }),
  scenario('sticky', {
    selectors: ['#demo-sticky'],
  }),
  scenario('loading', {
    selectors: ['#demo-loading'],
  }),
  scenario('empty-state', {
    selectors: ['#demo-empty-state'],
  }),
];
