/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SplitButton', () => {
  const storyPath = 'Buttons/SplitButton';
  const tests = ['Basic'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(`${testName} (Closed)`);
      cy.get('.iui-button').last().click();
      cy.compareSnapshot(`${testName} (Open)`);
    });
  });
});
