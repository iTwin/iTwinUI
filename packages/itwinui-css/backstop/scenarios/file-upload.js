/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type text area', {
    selectors: ['#demo-text-area'],
  }),
  scenario('Type table', {
    selectors: ['#demo-table'],
  }),
  scenario('Type not wrapping anything', {
    selectors: ['#demo-no-wrap'],
  }),
  scenario('File card', {
    selectors: ['#demo-file-card'],
  }),
  scenario('File card with iui-file-upload', {
    selectors: ['#demo-file-card-with-file-upload'],
  }),
];
