/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, click, hover } = require('../scenarioHelper');

module.exports = [
  scenario('basic', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#open-dialog')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog)'],
  }),

  scenario('draggable-dialog', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#toggle-draggable-dialog'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog)'],
  }),

  scenario('resizable-dialog', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#toggle-resizable-dialog'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog)'],
  }),

  scenario('draggable-resizable-dialog', {
    // Hovering `body` to avoid random test failures
    // when "Open modal" sometimes is and sometimes is not hovered.
    actions: [click('#toggle-draggable-resizable-dialog'), hover('body')],
    selectors: ['document'],
    hideSelectors: ['body > *:not(.iui-dialog)'],
  }),
];
