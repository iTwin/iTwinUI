/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Modal', () => {
  const storyPath = 'Modal';
  const tests = ['Basic', 'Full Page Modal', 'Non Dismissible Modal'];

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
