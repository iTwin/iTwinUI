/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Button', () => {
  const storyPath = 'Button';

  // WithNotification is intentionally left out.
  // This is because it uses IconButton/Button that causes visual testing bugs/fails.
  const tests = [
    'Default',
    'High Visibility',
    'With Icon',
    'Call To Action',
    'As Link',
    'Stretch',
    'Loading',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      cy.compareSnapshot(testName);
    });
  });
});
