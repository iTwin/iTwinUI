const { scenario } = require('../scenarioHelper');

module.exports = [
  // Progress indicator types
  scenario('linear', {
    selectors: ['#demo-linear'],
    hideSelectors: ['h3'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('radial', {
    selectors: ['#demo-radial'],
    hideSelectors: ['h3', 'p'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('overlay', {
    selectors: ['#demo-overlay'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
