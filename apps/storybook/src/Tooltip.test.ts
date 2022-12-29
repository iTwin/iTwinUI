/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Tooltip', () => {
  const storyPath = 'Core/Tooltip';
  const tests = ['Bottom', 'Left', 'Right', 'Top'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.get('#tooltip-target').trigger('mouseenter');
      cy.compareSnapshot(testName);
    });
  });
});
