const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    actions: [click('#open-modal')],
    selectors: ['document'],
  }),
];
