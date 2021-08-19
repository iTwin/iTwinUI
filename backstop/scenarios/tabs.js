const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type default vertical', {
    selectors: ['#demo-default-vertical'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type borderless', {
    selectors: ['#demo-borderless'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type borderless vertical', {
    selectors: ['#demo-borderless-vertical'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type pill', {
    selectors: ['#demo-pill'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('State hover & focus in default', {
    actions: [focus('#test-tab-1'), hover('#test-tab-2')],
    selectors: ['#demo-default-2'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('State hover & focus in borderless', {
    actions: [focus('#test-tab-3'), hover('#test-tab-4')],
    selectors: ['#demo-borderless-2'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('State hover & focus in pill', {
    actions: [focus('#test-tab-5'), hover('#test-tab-6')],
    selectors: ['#demo-pill-2'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
