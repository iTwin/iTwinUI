const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type with caption', {
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type small', {
    selectors: ['#demo-small'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#demo-captions .iui-expanded .iui-header')],
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#demo-captions .iui-expanded .iui-header')],
    selectors: ['#demo-captions'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
