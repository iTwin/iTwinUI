/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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

  ...['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((placement) =>
    scenario(`dialog-${placement}`, {
      actions: [click(`input[value=${placement}`), click('#open-dialog')],
      selectors: ['document'],
      hideSelectors: ['body > :not(:is(#default-dialog, #full-page-dialog, #draggable-dialog))'],
    }),
  ),
];
