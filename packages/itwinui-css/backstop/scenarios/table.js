/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { hover, focus, scenario } = require('../scenarioHelper');

module.exports = [
  // Table types
  scenario('Type Default', {
    selectors: ['#demo-default'],
  }),
  scenario('Type Extras', {
    selectors: ['#demo-extras'],
  }),
  scenario('Type Expandable Rows', {
    selectors: ['#demo-expandable-rows'],
  }),
  scenario('Type Loading', {
    selectors: ['#demo-loading'],
  }),
  scenario('Type Empty', {
    selectors: ['#demo-empty-state'],
  }),

  scenario('Type Status', {
    selectors: ['#demo-status'],
  }),

  // Editable cell
  scenario('Editable cell', {
    actions: [
      focus('#demo-default .iui-table-row:nth-child(1) .iui-table-cell[contenteditable]'),
      hover('#demo-default .iui-table-row:nth-child(2) .iui-table-cell[contenteditable]'),
    ],
    selectors: ['#demo-default .iui-table:nth-child(1)'],
  }),
];
