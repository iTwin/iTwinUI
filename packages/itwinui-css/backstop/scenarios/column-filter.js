/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  // Column filter types
  scenario('Type Text filter', {
    selectors: ['#demo-text'],
  }),
  scenario('Type Date filter', {
    selectors: ['#demo-date'],
  }),
];
