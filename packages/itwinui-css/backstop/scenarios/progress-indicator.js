/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario } = require('../scenarioHelper');

module.exports = [
  // Progress indicator types
  scenario('Type Linear Determinate', {
    selectors: ['#demo-linear-determinate'],
    viewports: [{ width: 800, height: 600 }],
  }),
  scenario('Type Radial Determinate', {
    selectors: ['#demo-radial-determinate'],
  }),
  scenario('Type Overlay', {
    selectors: ['#demo-overlay'],
    viewports: [{ width: 800, height: 600 }],
  }),
];
