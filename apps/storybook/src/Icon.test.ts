/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('Icon', () => {
  const storyPath = 'Utilities/Icon';

  const tests = [
    'Default',
    'Statuses',
    'Sizes',
    // 'Autoscale', // exclude Autoscale because it is only an interactive demo for the user
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
