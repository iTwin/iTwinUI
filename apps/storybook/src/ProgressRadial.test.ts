/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ProgressRadial', () => {
  const storyPath = 'ProgressIndicators/ProgressRadial';
  const tests = [
    'Determinate',
    'Determinate With Content',
    'Indeterminate',
    'Negative',
    'Positive',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(testName);
    });
  });
});
