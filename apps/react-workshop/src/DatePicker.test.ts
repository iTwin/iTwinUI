/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('DatePicker', () => {
  const storyPath = 'DatePicker';
  const tests = [
    'Basic',
    'Localized',
    'With Time',
    'With Combined Time',
    'With Year',
    'Range',
    'Some Dates Disabled',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.get('#picker-button').siblings('span').hide();
      cy.get('#picker-button').click();

      cy.wait(30);

      cy.compareSnapshot(testName);
    });
  });
});
