/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SearchBox', () => {
  const storyPath = 'Input/SearchBox';
  const tests = [
    'Basic',
    'Static',
    'With Custom Action',
    'With Custom Icon',
    'Small',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
      if (testName !== 'Static' && testName !== 'Small') {
        cy.get('.iui-button').first().click();
        cy.compareSnapshot(`${testName} (Open)`);
      }
    });
  });
});
