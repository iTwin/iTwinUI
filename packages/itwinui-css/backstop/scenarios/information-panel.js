/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, click } = require('../scenarioHelper');

module.exports = [
  // Information panel types
  scenario('Type default', {
    selectors: ['#demo-edit'],
  }),
  scenario('Type docked bottom', {
    actions: [click('#demo-docked-bottom .iui-button')],
    selectors: ['#demo-docked-bottom'],
  }),
];
