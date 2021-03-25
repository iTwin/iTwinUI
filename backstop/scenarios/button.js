const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type High Visibility', {
    selectors: ['#demo-high-visibility'],
  }),
  scenario('Type CTA', {
    selectors: ['#demo-cta'],
  }),
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Invisible', {
    selectors: ['#demo-invisible'],
  }),
  scenario('Grouped Default', {
    selectors: ['#demo-grouped-default'],
  }),
  scenario('Grouped Invisible', {
    selectors: ['#demo-grouped-invisible'],
  }),
  scenario('Type Split Menu', {
    selectors: ['#demo-split-menu'],
  }),
  scenario('Type Ideas', {
    selectors: ['.iui-idea'],
  }),
];
