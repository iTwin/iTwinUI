const { scenario } = require('../scenarioHelper');

module.exports = [
  // Progress indicator types
  scenario('linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['h3'],
  }),
  scenario('radial', {
    selectors: ['#demo-radial'],
    hideSelectors: ['h3', 'p'],
  }),
  scenario('overlay', {
    selectors: ['#demo-overlay'],
  }),
];
