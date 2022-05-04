const { scenario, click, hover } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    // Hovering `body` to avoid random test failures
    // when "Open dialog" sometimes is and sometimes is not hovered.
    actions: [click('#open-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  }),

  scenario('full-page-dialog', {
    // Hovering `body` to avoid random test failures
    // when "Open dialog" sometimes is and sometimes is not hovered.
    actions: [click('#open-full-page-dialog'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  }),

  // scenario('resizable-dialog', {
  //   // Hovering `body` to avoid random test failures
  //   // when "Open dialog" sometimes is and sometimes is not hovered.
  //   actions: [click('#toggle-resizable-dialog'), hover('body')],
  //   selectors: ['document'],
  //   hideSelectors: ['body > *:not(.iui-dialog-backdrop)'],
  // }),
];
