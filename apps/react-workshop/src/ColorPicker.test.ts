/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ColorPicker', () => {
  const storyPath = 'ColorPicker';
  const tests = ['Basic', 'Advanced', 'With Alpha'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });

      cy.get('#ladle-root').within(() => {
        cy.get('button').first().click();
      });

      // Wait for focus to move to the correct element after the click
      cy.wait(100);

      cy.compareSnapshot(testName);
    });
  });
});
