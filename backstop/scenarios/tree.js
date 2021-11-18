/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Default', {
    selectors: ['#demo-default'],
  }),
  scenario('With Captions', {
    selectors: ['#demo-captions'],
  }),
  scenario('With Checkbox', {
    selectors: ['#demo-checkbox'],
  }),
  scenario('Disabled', {
    selectors: ['#demo-disabled'],
  }),
  scenario('With Icons', {
    selectors: ['#demo-icons'],
  }),
];
