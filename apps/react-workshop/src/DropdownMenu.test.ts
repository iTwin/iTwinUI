/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('DropdownMenu', () => {
  const storyPath = 'DropdownMenu';
  const tests = [
    'Basic',
    'Submenu',
    'With End Icons',
    'With Start Icons',
    'With Content',
    'With Separator',
    'With Sublabels',
    'Hide Middleware',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('#ladle-root').within(() => {
        cy.get('button').first().click();
      });

      if (testName === 'Submenu') {
        cy.get('[role=menuitem][aria-expanded=false]').click();
      }

      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});
