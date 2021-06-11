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
  }),
  scenario('Type empty', {
    selectors: ['#demo-empty-state'],
  }),
];
