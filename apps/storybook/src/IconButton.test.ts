/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('IconButton', () => {
  const storyPath = 'Buttons/IconButton';
  const tests = [
    'Add',
    'Borderless',
    'High Visibility Add',
    'Small Active Add',
  ];

  tests.forEach((testName, index) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);

      if (index === 0) {
        cy.contains('Add').closest('button').focus();
        cy.compareSnapshot(`${testName} (tooltip)`);
      }
    });
  });
});
