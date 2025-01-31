/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Alert', () => {
  const storyPath = 'Alert';
  const tests = [
    'Positive',
    'Negative',
    'Warning',
    'Informational',
    'Empty',
    'Sticky',
    'Custom Icon',
  ];

  tests.forEach((testName) => {
    it(testName, () => {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500);

      cy.compareSnapshot(testName);
    });
  });
});
