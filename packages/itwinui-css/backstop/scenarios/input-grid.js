/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Inline', {
    selectors: ['#demo-inline'],
  }),
];
