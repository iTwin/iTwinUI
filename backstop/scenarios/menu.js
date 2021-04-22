const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Menu types
  scenario('Type list', {
    selectors: ['#demo-list'],
  }),
  scenario('Type complex', {
    selectors: ['#demo-complex'],
  }),

  // Hover & focus states
  //// List menu
  scenario('State hover and focus', {
    selectors: ['#demo-list'],
    actions: [hover('#test-link-1'), focus('#test-link-2')],
  }),
];
