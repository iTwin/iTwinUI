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
    requireSameDimensions: false,
  }),
  scenario('Grouped Borderless', {
    selectors: ['#demo-grouped-borderless'],
    requireSameDimensions: false,
  }),
  scenario('Type Split Menu', {
    selectors: ['#demo-split-menu'],
  }),
  scenario('Type Ideas', {
    selectors: ['.iui-idea'],
  }),
];
