/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Table', () => {
  const storyPath = 'Core/Table';
  const tests = [
    'Basic',
    'Column Manager',
    'Condensed',
    'Controlled State',
    'Customized Columns',
    'Disabled Rows',
    'Draggable Columns',
    'Editable',
    'Expandable',
    'Expandable Subrows',
    'Filters',
    'Full',
    'Full 2',
    'Horizontal Scroll',
    'Loading',
    'No Data',
    'Resizable Columns',
    'Selectable Multi',
    'Selectable Single',
    'Sortable',
    'Sticky Columns',
    'With Manual Paginator',
    'With Paginator',
    'Zebra Striped Rows',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });

      switch (testName) {
        case 'Column Manager': {
          cy.get('.iui-slot .iui-button').click();
          break;
        }
        case 'Customized Columns': {
          cy.get('.iui-row-expander').last().click();
          break;
        }
        case 'Expandable':
        case 'Expandable Subrows': {
          cy.get('.iui-row-expander').first().click();
          break;
        }
        case 'Editable': {
          cy.get('[contenteditable]').first().click().type('Test');
          break;
        }
        case 'Filters': {
          cy.get('.iui-filter-button').first().click({ force: true }); // force because the button is hidden
          break;
        }
      }

      cy.compareSnapshot(testName);
    });
  });
});
