const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Menu types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Header', {
    selectors: ['#demo-header'],
  }),
  scenario('Type Select', {
    selectors: ['#demo-select'],
  }),
  scenario('Type Default Dropdown Button', {
    selectors: ['#demo-button'],
  }),
  scenario('Type Borderless Dropdown Button', {
    selectors: ['#demo-borderless-button'],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-menu-1'), focus('#test-menu-2')],
    selectors: ['#demo-default'],
  }),
];
