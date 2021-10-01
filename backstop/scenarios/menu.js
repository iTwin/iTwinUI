const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Menu types
  scenario('Type Default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Header', {
    selectors: ['#demo-header'],
    misMatchThreshold: 0.01,
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover & focus', {
    actions: [hover('#test-menu-1'), focus('#test-menu-2')],
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
