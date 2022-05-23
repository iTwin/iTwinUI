/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('TagContainer', () => {
  const storyPath = 'Core/TagContainer';
  const tests = [
    'Basic Tags Container',
    'Default Tags Container',
    'Scrollable Default Tags Container',
    'Truncated Basic Tags Container',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.compareSnapshot(testName);
    });
  });
});
