/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tooltip', () => {
  const storyPath = 'Tooltip';
  const tests = ['Bottom', 'Left', 'Right', 'Top'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });

      cy.get('#tooltip-target').trigger('mouseenter');
      cy.wait(100);
      cy.compareSnapshot(testName);
    });
  });
});
