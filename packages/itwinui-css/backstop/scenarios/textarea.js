const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('State hover in default', {
    actions: [hover('#test-textarea')],
    selectors: ['#demo-textarea'],
  }),
  scenario('State hover with status', {
    actions: [hover('#test-textarea-with-status')],
    selectors: ['#demo-textarea-with-status'],
  }),
  scenario('State focus in default', {
    actions: [focus('#test-textarea')],
    selectors: ['#demo-textarea'],
  }),
  scenario('State focus with status', {
    actions: [focus('#test-textarea-with-status')],
    selectors: ['#demo-textarea-with-status'],
  }),
];
