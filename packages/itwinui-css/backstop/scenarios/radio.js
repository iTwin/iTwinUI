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
  scenario('label', {
    selectors: ['#demo-label'],
    hideSelectors: ['h3'],
  }),
];
