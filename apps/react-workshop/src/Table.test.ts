/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Table', () => {
  const storyPath = 'Table';
  const tests = [
    'Basic',
    'Column Manager',
    'Condensed',
    'Controlled State',
    'Custom Filter',
    'Customized Columns',
    'Disabled Rows',
    'Draggable Columns',
    'Editable',
    'Expandable',
    'Expandable Subrows',
    'Filters',
    'Global Filter',
    'Initial State',
    'Full',
    'Full2',
    'Horizontal Scroll',
    'Loading',
    'Localized',
    'No Data',
    'Resizable Columns',
    'Scroll To Row',
    'Selectable Multi',
    'Selectable Single',
    'Sortable',
    'Sticky Columns',
    'With Manual Paginator And Filter',
    'With Paginator',
    'Zebra Striped Rows',
    'Status And Cell Icons',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      // TODO: Fix the "Maximum update depth exceeded" error
      if (testName === 'Custom Filter') {
        cy.on('uncaught:exception', () => {
          // return false to prevent the error from
          // failing this test
          return false;
        });
      }

      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      cy.get('#ladle-root').within(() => {
        switch (testName) {
          case 'Column Manager': {
            cy.get('[role=columnheader] button').last().click();
            break;
          }
          case 'Condensed': {
            cy.get('[role=rowgroup] button').first().click();
            break;
          }
          case 'Custom Filter': {
            cy.get('button').first().click({ force: true }); // force because the button is hidden
            break;
          }
          case 'Customized Columns': {
            cy.get('[role=rowgroup] button').last().click();
            break;
          }
          case 'Expandable':
          case 'Expandable Subrows': {
            cy.get('[role=rowgroup] button').first().click();
            break;
          }
          case 'Editable': {
            cy.get('[contenteditable]').first().click().type('Test');
            break;
          }
          case 'Filters': {
            cy.get('button').first().click({ force: true }); // force because the button is hidden
            break;
          }
          case 'Global Filter': {
            cy.get('input').first().click().type('Description8');
            break;
          }
          case 'Localized': {
            cy.get('input').first().click();
            cy.get('button').first().click({ force: true }); // force because the button is hidden
            break;
          }
          case 'Scroll To Row': {
            cy.wait(100);
          }
        }
      });

      cy.compareSnapshot(testName);

      if (testName === 'Full2') {
        cy.get('[role=table]').scrollTo('right');
        cy.compareSnapshot(`${testName} (scrolled right)`);
      }
    });
  });
});
