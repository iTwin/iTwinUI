const { scenario, click, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Side Navigation types
  scenario('Type collapsed', {
    selectors: ['#demo-side-navigation'],
  }),
  scenario('Type expanded', {
    actions: [click('#test-expand')],
    selectors: ['#demo-side-navigation'],
  }),
  scenario('Type submenu', {
    selectors: ['#demo-side-navigation-submenu'],
  }),
  scenario('Type submenu & active', {
    selectors: ['#demo-side-navigation-submenu-active'],
  }),

  // Hover & focus states
  scenario('State collapsed hover and focus', {
    actions: [hover('#test-tab-2'), focus('#test-tab-1')],
    selectors: ['#demo-side-navigation'],
  }),
  scenario('State expanded hover and focus', {
    actions: [click('#test-expand'), hover('#test-tab-2'), focus('#test-tab-1')],
    selectors: ['#demo-side-navigation'],
  }),
];
