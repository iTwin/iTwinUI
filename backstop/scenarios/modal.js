const { scenario, click } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type default', {
    actions: [click('#open-modal')],
    selectors: ['document'],
    hideSelectors: ['h1', 'hr', 'a', 'theme-button'],
  }),
];
