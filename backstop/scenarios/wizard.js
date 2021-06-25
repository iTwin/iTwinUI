const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type long', {
    selectors: ['#demo-long'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type workflow', {
    selectors: ['#demo-workflow'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  scenario('State default hover on complete', {
    actions: [hover('#demo-default .iui-wizards-step-completed:first-child')],
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('State long focus on complete', {
    actions: [
      focus(
        '#demo-long .iui-wizards-step-completed:first-child > .iui-wizards-step-circle'
      ),
    ],
    selectors: ['#demo-long'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
