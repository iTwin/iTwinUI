/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('DropdownMenu', () => {
  const storyPath = 'Core/DropdownMenu';
  const tests = [
    'Basic',
    'Submenu',
    'With End Icons',
    'With Start Icons',
    'With Content',
    'With Separator',
    'With Sublabels',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('#storybook-root').within(() => {
        cy.get('button').first().click();
      });

      if (testName === 'Submenu') {
        cy.get('li[aria-expanded=false]').trigger('mouseenter');
      }

      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});
