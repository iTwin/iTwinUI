/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SearchBox', () => {
  const storyPath = 'Input/SearchBox';
  const tests = [
    'Basic',
    'Basic With Status',
    'Basic With Custom Items',
    'Expandable',
    'Expandable With Custom Items',
    'With Custom Action',
    'Small',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
      if (!testName.includes('Basic') && testName !== 'Small') {
        cy.get('.iui-searchbox-open-button').first().click();
        cy.compareSnapshot(`${testName} (Open)`);
      }
    });
  });
});
