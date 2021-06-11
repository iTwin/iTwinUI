const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type hidden below viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    hideSelectors: ['h1', 'hr', 'theme-button'],
  }),
  scenario('Type visible in viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
    hideSelectors: ['h1', 'hr', 'theme-button'],
  }),

  // Hover & focus states
  scenario('State hover and focus', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
    actions: [hover('#test-link-1'), focus('#test-link-2')],
    hideSelectors: ['h1', 'hr', 'theme-button'],
  }),
];
