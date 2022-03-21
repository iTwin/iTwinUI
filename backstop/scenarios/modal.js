const { scenario, click, hover } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-modal'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-modal)'],
  }),
  scenario('full-page-modal', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-full-page-modal'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-modal)'],
  }),
];
