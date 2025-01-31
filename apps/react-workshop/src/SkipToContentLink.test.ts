/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SkipToContentLink', () => {
  const storyPath = 'SkipToContentLink';
  const tests = ['Basic', 'Custom Text'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      cy.get('#ladle-root').within(() => {
        cy.get('a').first().focus();
      });
      cy.compareSnapshot(testName);
    });
  });
});
