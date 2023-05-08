/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Breadcrumbs', () => {
  const storyPath = 'Core/Breadcrumbs';
  const tests = [
    'Basic',
    'Custom Separator',
    'Folder Navigation',
    'Links',
    'Overflow',
    'Custom Overflow Dropdown',
    'Custom Overflow Back Button',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });

      if (testName === 'Custom Overflow Dropdown') {
        cy.get('[aria-label="Dropdown with more breadcrumbs"').click();
        cy.wait(1000); // wait for dropdown to open?
      } else if (testName === 'Custom Overflow Back Button') {
        cy.get('.iui-button').eq(1).trigger('mouseenter');
      }

      cy.compareSnapshot(testName);
    });
  });
});
