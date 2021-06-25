const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type extras', {
    selectors: ['#demo-extras'],
  }),
  scenario('Type expandable rows', {
    selectors: ['#demo-expandable-rows'],
  }),
  scenario('Type loading', {
    selectors: ['#demo-loading'],
    viewports: [{ width: 900, height: 600 }],
  }),
  scenario('Type empty', {
    selectors: ['#demo-empty-state'],
    viewports: [{ width: 900, height: 600 }],
  }),
];
