/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('TimePicker', () => {
  const storyPath = 'Core/TimePicker';
  const tests = ['Basic', 'Custom Renderers', 'Combined'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.get('.iui-button').last().click();
      cy.get('.iui-input-container').hide();
      cy.compareSnapshot(testName);
    });
  });
});
