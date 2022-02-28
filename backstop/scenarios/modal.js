const { scenario, click, hover } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-modal'), hover('body')],
    selectors: ['document'],
  }),
  scenario('full-page-modal-slide', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-full-page-modal-slide'), hover('body')],
    selectors: ['document'],
  }),
  scenario('full-page-modal-scale', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-full-page-modal-scale'), hover('body')],
    selectors: ['document'],
  }),
];
