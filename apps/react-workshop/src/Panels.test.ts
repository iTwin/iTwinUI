/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Panels', () => {
  const storyPath = 'Panels';
  const tests = [
    'Basic',
    'Multi Panel Information Panel',
    'Multi Level List',
    'Nested Panels',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      cy.compareSnapshot(testName);
    });
  });
});
