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
      cy.get('.iui-button').click();

      if (testName === 'Submenu') {
        cy.get('.iui-list-item').last().trigger('mouseenter');
      }

      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});
