/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Toasts', () => {
  const storyPath = 'Core/Toasts';
  const tests = [
    'Anchor To Button',
    'Informational',
    'Negative',
    'Positive',
    'Warning',
    'Position Changed',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.get('#ladle-root').within(() => {
        cy.get('button').first().click();
      });
      cy.compareSnapshot(testName);
    });
  });
});
