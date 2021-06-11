const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type high visibility', {
    selectors: ['#demo-high-visibility'],
  }),
  scenario('Type CTA', {
    selectors: ['#demo-cta'],
  }),
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type borderless', {
    selectors: ['#demo-borderless'],
  }),
  scenario('Type grouped default', {
    selectors: ['#demo-grouped-default'],
  }),
  scenario('Type grouped borderless', {
    selectors: ['#demo-grouped-borderless'],
  }),
  scenario('Type split menu', {
    selectors: ['#demo-split-menu'],
  }),
  scenario('Type ideas', {
    selectors: ['.iui-idea'],
  }),
];
