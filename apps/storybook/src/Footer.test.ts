/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Footer', () => {
  const storyPath = 'Core/Footer';
  const tests = [
    'Basic',
    'Bottom Fixed',
    'Appended Custom Elements',
    'Customized Default And Custom Elements',
    'Only Custom Elements',
    'Custom Content',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
