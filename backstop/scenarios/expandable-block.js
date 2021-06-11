const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type with caption', {
    selectors: ['#demo-with-captions'],
  }),

  // Hover states
  scenario('State hover', {
    actions: [hover('#demo-with-captions .iui-expanded .iui-header')],
    selectors: ['#demo-with-captions'],
  }),

  // Focus states
  scenario('State focus', {
    actions: [focus('#demo-with-captions .iui-expanded .iui-header')],
    selectors: ['#demo-with-captions'],
  }),
];
