const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type with caption', {
    selectors: ['#demo-with-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#demo-with-captions .iui-expanded .iui-header')],
    selectors: ['#demo-with-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#demo-with-captions .iui-expanded .iui-header')],
    selectors: ['#demo-with-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
