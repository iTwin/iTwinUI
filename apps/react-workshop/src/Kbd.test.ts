/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Kbd', () => {
  const storyPath = 'Keyboard Key';
  const tests = ['Basic', 'Predefined Key'];

  tests.forEach((testName) => {
    const id = Cypress.storyId(storyPath, testName);

    it(testName, () => {
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(testName);
    });
  });
});
