const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type label', {
    selectors: ['#demo-label'],
    hideSelectors: ['h3'],
  }),
  scenario('Type tiles', {
    selectors: ['#demo-tiles'],
  }),
];
