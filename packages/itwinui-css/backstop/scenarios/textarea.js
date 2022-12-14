const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('State hover in default', {
    actions: [hover('#test-default-singular')],
    selectors: ['#demo-default-singular'],
  }),
  scenario('State focus in default', {
    actions: [focus('#test-default-singular')],
    selectors: ['#demo-default-singular'],
  }),
  scenario('State hover with status', {
    actions: [hover('#test-status-singular')],
    selectors: ['#demo-status-singular'],
  }),
  scenario('State focus with status', {
    actions: [focus('#test-status-singular')],
    selectors: ['#demo-status-singular'],
  }),
];
