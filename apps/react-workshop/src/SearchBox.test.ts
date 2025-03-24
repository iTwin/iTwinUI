/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SearchBox', () => {
  const storyPath = 'SearchBox';
  const tests = [
    'Basic',
    'Basic With Status',
    'Basic With Custom Items',
    'Expandable',
    'Borderless Expand Button',
    'Expandable With Custom Items',
    'With Custom Action',
    'Small',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(500); // TODO: Investigate

      cy.compareSnapshot(testName);
      if (!testName.includes('Basic') && testName !== 'Small') {
        cy.get('#ladle-root').within(() => {
          cy.get('button').first().click();
        });
        cy.compareSnapshot(`${testName} (Open)`);
      }
    });
  });
});
