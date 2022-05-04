const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    actions: [click('#open-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  }),

  scenario('full-page-dialog', {
    actions: [click('#open-full-page-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  }),

  scenario('draggable-dialog', {
    actions: [click('#toggle-draggable-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  }),
];
