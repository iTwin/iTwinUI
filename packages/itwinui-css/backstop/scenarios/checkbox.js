/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('inline', {
    selectors: ['#demo-inline'],
  }),
  scenario('no-label', {
    selectors: ['#demo-no-label'],
    hideSelectors: ['h3'],
  }),
  scenario('Type specialty', {
    selectors: ['#demo-special'],
  }),
];
