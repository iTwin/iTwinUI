/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, click } = require('../scenarioHelper');

module.exports = [
  scenario('Type all', {
    selectors: ['#demo-typography'],
  }),

  scenario('Type skeleton text', {
    actions: [click('.iui-toggle-switch')],
    selectors: ['#demo-typography'],
  }),
];
