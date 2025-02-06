/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ProgressRadial', () => {
  const storyPath = 'ProgressRadial';
  const tests = [
    'Determinate',
    'Determinate With Content',
    'Indeterminate',
    'Negative',
    'Positive',
    'Warning',
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
