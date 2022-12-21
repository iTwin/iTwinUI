/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('ColorPicker', () => {
  const storyPath = 'Core/ColorPicker';
  const tests = ['Basic', 'Advanced', 'With Alpha'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.get('.iui-button').first().click();
      cy.compareSnapshot(testName);
    });
  });
});
