/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('DatePicker', () => {
  const storyPath = 'Core/DatePicker';
  const tests = [
    'Basic',
    'Localized',
    'With Time',
    'With Combined Time',
    'With Year',
    'Range',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.get('#picker-button + span').hide();
      cy.get('#picker-button').click();
      cy.compareSnapshot(testName);
    });
  });
});
