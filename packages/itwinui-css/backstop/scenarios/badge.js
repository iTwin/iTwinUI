/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type soft backgrounds', {
    selectors: ['#demo-soft-backgrounds'],
  }),
  scenario('Type statuses', {
    selectors: ['#demo-statuses'],
  }),
];
