/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Checkbox', () => {
  const storyPath = 'Input/Checkbox';
  const tests = [
    'Basic',
    'Disabled',
    'Indeterminate',
    'Loading',
    'Negative',
    'Positive',
    'Warning',
    'Visibility',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
