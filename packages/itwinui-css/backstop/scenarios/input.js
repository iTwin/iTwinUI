const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('Type Hybrid', {
    selectors: ['#demo-hybrid'],
  }),
  scenario('Type Without Label', {
    selectors: ['#demo-no-label'],
  }),
  scenario('State hover in default', {
    actions: [hover('#test-input')],
    selectors: ['#demo-input'],
  }),
  scenario('State hover with status', {
    actions: [hover('#test-input-with-status')],
    selectors: ['#demo-input-with-status'],
  }),
  scenario('State focus in default', {
    actions: [focus('#test-input')],
    selectors: ['#demo-input'],
  }),
  scenario('State focus with status', {
    actions: [focus('#test-input-with-status')],
    selectors: ['#demo-input-with-status'],
  }),
];
