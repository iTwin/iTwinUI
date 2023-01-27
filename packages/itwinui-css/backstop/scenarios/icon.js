/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Basic', {
    selectors: ['#demo-icons'],
  }),
  scenario('Status colors', {
    selectors: ['#demo-status'],
  }),
  scenario('Autoscale with text', {
    selectors: ['#demo-typography'],
  }),
];
