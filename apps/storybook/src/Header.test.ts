/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Header', () => {
  const storyPath = 'Core/Header';
  const tests = ['Basic', 'Slim', 'Center Content', 'Full'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });

      // Hide images if present to avoid uncertainties in testing
      if (
        testName === 'Basic' ||
        testName === 'Center Content' ||
        testName === 'Full'
      ) {
        cy.get('img').hide();
      }

      cy.compareSnapshot(testName);
    });
  });
});
