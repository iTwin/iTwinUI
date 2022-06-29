const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    actions: [click('#open-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > :not(:is(#default-dialog, #full-page-dialog, #draggable-dialog))'],
  }),

  scenario('full-page-dialog', {
    actions: [click('#open-full-page-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > :not(:is(#default-dialog, #full-page-dialog, #draggable-dialog))'],
  }),

  scenario('draggable-dialog', {
    actions: [click('#toggle-draggable-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > :not(:is(#default-dialog, #full-page-dialog, #draggable-dialog))'],
  }),
];
