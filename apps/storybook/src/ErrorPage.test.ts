/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ErrorPage', () => {
  const storyPath = 'Core/ErrorPage';
  const tests = [
    'Bad Gateway',
    'Page Not Found',
    'Internal Server Error',
    'Service Unavailable',
    'Forbidden',
    'Unauthorized',
    'Custom Html Message',
    'Generic',
    'Translated Messages',
    'Without Message Or Buttons',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
