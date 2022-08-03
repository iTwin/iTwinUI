const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    viewports: [{ width: 400, height: 800 }],
    hideSelectors: ['theme-button'],
  }),
];
