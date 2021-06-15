const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type borderless', {
    selectors: ['#demo-borderless'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type pill', {
    selectors: ['#demo-pill'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
