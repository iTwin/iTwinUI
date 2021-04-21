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

  // Hover & focus states
  scenario('State hover and focus', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
    actions: [hover('#test-link-1'), focus('#test-link-2')],
  }),
];
