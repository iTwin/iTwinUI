/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SplitButton', () => {
  const storyPath = 'SplitButton';
  const tests = ['Basic'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('#ladle-root').within(() => {
        cy.get('button').last().click();
      });
      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});
