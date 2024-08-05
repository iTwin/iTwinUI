/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Panels', () => {
  const storyPath = 'Panels';
  const tests = [
    'Basic',
    'Controlled',
    'Multi Panel Information Panel',
    'Multi Level List',
    'Custom Animation',
    'Custom Back Button',
    'Nested Panels',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(testName);
    });
  });
});
