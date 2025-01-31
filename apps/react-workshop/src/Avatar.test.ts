/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Avatar', () => {
  const storyPath = 'Avatar';
  const tests = [
    'Basic',
    'Sizes',
    'Statuses',
    'With Image',
    'With Icon',
    'Custom Status Translation',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.wait(300);

      // Hide images if present to avoid uncertainties in testing
      if (testName === 'With Image') {
        cy.get('img').hide();
      }

      cy.compareSnapshot(testName);
    });
  });
});
