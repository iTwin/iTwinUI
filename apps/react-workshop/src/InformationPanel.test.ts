/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('InformationPanel', () => {
  const storyPath = 'InformationPanel';
  const tests = ['Basic', 'Custom Actions', 'Custom Width', 'Horizontal'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      cy.get('#ladle-root').within(() => {
        cy.get('button').first().click();
      });
      cy.compareSnapshot(testName);
    });
  });
});
