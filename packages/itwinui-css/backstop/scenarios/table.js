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

  // Editable cell
  scenario('Editable cell', {
    actions: [
      focus('#demo-default .iui-row:nth-child(1) .iui-cell[contenteditable]'),
      hover('#demo-default .iui-row:nth-child(2) .iui-cell[contenteditable]'),
    ],
    selectors: ['#demo-default .iui-table:nth-child(1)'],
  }),
];
