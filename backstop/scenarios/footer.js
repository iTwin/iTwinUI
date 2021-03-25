const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('footer hidden below viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('footer visible in viewport', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    scrollToSelector: ['.iui-legal-footer'],
  }),
];
