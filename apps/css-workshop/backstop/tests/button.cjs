/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('./~scenarioHelper.cjs');

module.exports = [
  scenario('Type High Visibility', {
    selectors: ['#demo-high-visibility'],
  }),
  scenario('Type CTA', {
    selectors: ['#demo-cta'],
  }),
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Borderless', {
    selectors: ['#demo-borderless'],
  }),
  scenario('With notification', {
    selectors: ['#demo-notification'],
  }),
  scenario('Loading', {
    selectors: ['#demo-loading'],
  }),
  scenario('Grouped Default', {
    selectors: ['#demo-grouped-default'],
  }),
  scenario('Grouped Borderless', {
    selectors: ['#demo-grouped-borderless'],
  }),
  scenario('Type Split', {
    selectors: ['#demo-split'],
  }),
  scenario('Type Input Button Combo', {
    selectors: ['#demo-combo-group'],
  }),
  scenario('Type Ideas', {
    selectors: ['#demo-ideas'],
  }),
];
