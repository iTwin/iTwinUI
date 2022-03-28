/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { scenario, focus, hover } = require('../scenarioHelper');

module.exports = [
  scenario('Type focus', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    actions: [focus('#test-1')],
    hideSelectors: ['theme-button'],
  }),
  scenario('Type focus and hover', {
    selectors: ['viewport'],
    viewports: [{ width: 800, height: 600 }],
    actions: [focus('#test-1'), hover('#test-1')],
    hideSelectors: ['theme-button'],
  }),
];
