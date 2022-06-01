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
  scenario('Type Borderless', {
    selectors: ['#demo-borderless'],
  }),
  scenario('Grouped Default', {
    selectors: ['#demo-grouped-default'],
  }),
  scenario('Grouped Borderless', {
    selectors: ['#demo-grouped-borderless'],
  }),
  scenario('Type Split Menu', {
    selectors: ['#demo-split-menu'],
  }),
  scenario('Type Input Button Combo', {
    selectors: ['#demo-combo-group'],
  }),
  scenario('Type Ideas', {
    selectors: ['.iui-idea'],
  }),
];
