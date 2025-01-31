/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Carousel', () => {
  const storyPath = 'Carousel';
  const tests = ['Basic', 'Controlled'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      cy.wait(1000); // wait for dots list to finish scrolling
      cy.compareSnapshot(testName);
    });
  });
});
