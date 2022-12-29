/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Button', () => {
  const storyPath = 'Buttons/Button';

  // WithNotification is intentionally left out.
  // This is because it uses IconButton/Button that causes visual testing bugs/fails.
  const tests = [
    'Default',
    'High Visibility',
    'With Icon',
    'Call To Action',
    'As Link',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
