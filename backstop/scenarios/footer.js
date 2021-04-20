const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Footer types
  scenario('Type hidden below viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type visible in viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
  }),

  // Hover states
  //// Footer link
  scenario('State hover', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
    actions: [hover('#test-link')],
  }),

  // Focus states
  //// Footer link
  scenario('State focus', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
    actions: [focus('#test-link')],
  }),
];
