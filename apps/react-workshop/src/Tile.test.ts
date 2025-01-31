/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tile', () => {
  const storyPath = 'Tile';
  const tests = [
    'Basic',
    'All Props',
    'Actionable',
    'Anchor Link',
    'Condensed',
    'Folder',
    'With Avatar',
    'Status',
    'Loading',
    'Disabled',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      // Hide thumbnail if present
      if (
        testName === 'Basic' ||
        testName === 'All Props' ||
        testName === 'Actionable' ||
        testName === 'Anchor Link'
      ) {
        cy.get('[style*=background-image]').hide();
      }

      cy.compareSnapshot(testName);
    });
  });
});
