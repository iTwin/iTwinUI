const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-group-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type borderless', {
    selectors: ['#demo-group-borderless'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover & focus states
  scenario('Type default State hover & focus', {
    actions: [hover('#test-01 .iui-expandable-block-header'), focus('#test-02 .iui-expandable-block-header')],
    selectors: ['#demo-group-default'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('Type borderless State hover & focus', {
    actions: [hover('#test-03 .iui-expandable-block-header'), focus('#test-04 .iui-expandable-block-header')],
    selectors: ['#demo-group-borderless'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
